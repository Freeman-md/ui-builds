import { useEffect, useId, useRef, useState } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { ArrowLeft, Check, Copy, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Gig } from '@/data/sample-gigs'

type TriageDetailsProps = {
  item: Gig
  open: boolean
  animate: boolean
  onClose: () => void
}

export function TriageDetails({ item, open, animate, onClose }: TriageDetailsProps) {
  const titleId = useId()
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()
  const instant = reducedMotion || !animate
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [copyStatus, setCopyStatus] = useState('')

  useEffect(() => {
    if (open && isPresent) titleRef.current?.focus({ preventScroll: true })
  }, [open, item.id, isPresent])

  async function copyIdentifier() {
    try {
      await navigator.clipboard.writeText(item.id)
      setCopyStatus(`Copied ${item.id}`)
    } catch {
      setCopyStatus('Could not copy. You can select the identifier in the header and copy it manually.')
    }
  }

  return (
    <motion.section
      className="triage-details-content"
      aria-labelledby={titleId}
      aria-hidden={!isPresent || undefined}
      inert={!isPresent}
      initial={instant ? false : { opacity: 0, transform: 'translateY(4px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      exit={{ opacity: 0, transform: 'translateY(0px)', transition: { duration: instant ? 0 : 0.06 } }}
      transition={{ duration: instant ? 0 : 0.12, delay: instant ? 0 : 0.04, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/7 px-4">
        <span className="shrink-0 text-xs text-muted-foreground">{item.id}</span>
        <span className="min-w-0 flex-1 truncate text-sm" title={item.title}>{item.title}</span>
        <Tooltip>
          <TooltipTrigger
            render={<Button type="button" variant="ghost" size="icon" aria-label="Copy identifier" onClick={copyIdentifier} />}
          >
            {copyStatus.startsWith('Copied')
              ? <Check className="size-3.5" aria-hidden="true" />
              : <Copy className="size-3.5" aria-hidden="true" />}
          </TooltipTrigger>
          <TooltipContent>{copyStatus || 'Copy identifier'}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={<Button type="button" variant="ghost" size="icon" aria-label="Back to list" onClick={onClose} />}
          >
            <X className="hidden size-4 min-[900px]:block" aria-hidden="true" />
            <ArrowLeft className="size-4 min-[900px]:hidden" aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent>Back to list (Esc)</TooltipContent>
        </Tooltip>
      </div>
      <div
        role="region"
        aria-label="Gig detail content"
        tabIndex={0}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-8"
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
        <p role="status" className="mt-3 text-sm text-muted-foreground">{copyStatus}</p>
      </div>
    </motion.section>
  )
}
