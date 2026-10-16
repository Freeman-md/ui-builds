import { uiMotion } from '@/lib/motion'
import { useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type Ref, type RefObject } from 'react'
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
import { ArrowLeft, Check, Copy, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip'
import type { Gig } from '@/features/triage/data/sample-gigs'

export type TriageDetailsHandle = { copyIdentifier: () => void }

type TriageDetailsProps = {
  ref?: Ref<TriageDetailsHandle>
  item: Gig
  open: boolean
  direction: number
  focusDetails: boolean
  onClose: () => void
}

export function TriageDetails({ ref, item, open, direction, focusDetails, onClose }: TriageDetailsProps) {
  const instanceId = useId()
  const titleId = `${instanceId}-${item.id}`
  const headerId = `${instanceId}-header`
  const scrollRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState({ id: '', message: '' })
  const copyStatus = copied.id === item.id ? copied.message : ''

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: 0 })
  }, [open])

  async function copyIdentifier() {
    try {
      await navigator.clipboard.writeText(item.id)
      setCopied({ id: item.id, message: `Copied ${item.id}` })
    } catch {
      setCopied({ id: item.id, message: 'Could not copy. Select the identifier and copy it manually.' })
    }
  }

  useImperativeHandle(ref, () => ({ copyIdentifier }))

  return (
    <section className="triage-details-content" aria-labelledby={headerId}>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/7 px-4">
        <span className="shrink-0 text-xs text-muted-foreground">{item.id}</span>
        <span id={headerId} className="min-w-0 flex-1 truncate text-sm" title={item.title}>{item.title}</span>
        <Tooltip>
          <TooltipTrigger
            render={<Button type="button" variant="ghost" size="icon" aria-label="Copy identifier" aria-keyshortcuts="c" onClick={copyIdentifier} />}
          >
            {copyStatus.startsWith('Copied')
              ? <Check className="size-3.5" aria-hidden="true" />
              : <Copy className="size-3.5" aria-hidden="true" />}
          </TooltipTrigger>
          <TooltipContent>{copyStatus || 'Copy identifier'}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={<Button type="button" variant="ghost" size="icon" aria-label="Back to list" aria-keyshortcuts="Escape" onClick={onClose} />}
          >
            <X className="hidden size-4 min-[900px]:block" aria-hidden="true" />
            <ArrowLeft className="size-4 min-[900px]:hidden" aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent>Back to list (Esc)</TooltipContent>
        </Tooltip>
      </div>
      <div
        ref={scrollRef}
        data-detail-scroll=""
        role="region"
        aria-label="Gig detail content"
        tabIndex={0}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-8"
      >
        <AnimatePresence initial={false} mode="wait">
          <TriageDetailBody key={item.id} item={item} titleId={titleId} direction={direction} focusTitle={open && focusDetails} scrollRef={scrollRef} />
        </AnimatePresence>
        <p role="status" className="mt-3 text-sm text-muted-foreground">{copyStatus}</p>
      </div>
    </section>
  )
}

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, transform: `translateY(${direction * 48}px)` }),
  visible: { opacity: 1, transform: 'translateY(0px)' },
}

function TriageDetailBody({ item, titleId, direction, focusTitle, scrollRef }: {
  item: Gig; titleId: string; direction: number; focusTitle: boolean; scrollRef: RefObject<HTMLDivElement | null>
}) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()

  // Reset only when the incoming body mounts, after the old item has faded out.
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [scrollRef])

  useEffect(() => {
    if (focusTitle && isPresent) titleRef.current?.focus({ preventScroll: true })
  }, [focusTitle, isPresent])

  return (
    <motion.div
      data-detail-body=""
      data-direction={direction}
      className="min-w-0"
      aria-hidden={!isPresent || undefined}
      inert={!isPresent}
      custom={direction}
      variants={slideVariants}
      initial={reducedMotion ? false : 'enter'}
      animate="visible"
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : uiMotion.exitDuration, ease: 'easeOut' } }}
      transition={{ duration: reducedMotion ? 0 : uiMotion.enterDuration, ease: uiMotion.easeOut }}
    >
      <h2
        ref={titleRef}
        id={titleId}
        tabIndex={-1}
        className="rounded-sm text-xl/7 font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {item.title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Gig properties">
        <Badge variant="secondary">Triage</Badge>
        <Badge variant="outline">{item.source}</Badge>
        <Badge variant="outline">{item.category}</Badge>
      </div>
      <div className="mt-6 space-y-5 text-base/7">
        <div>
          <h3 className="mb-2 text-sm font-medium">Brief</h3>
          <p className="text-muted-foreground">{item.brief}</p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Requirements</h3>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            {item.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Received {item.age} · Sample opportunity</p>
    </motion.div>
  )
}
