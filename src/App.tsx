import { lazy, Suspense } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import './showcase.css'

const TriagePage = lazy(() => import('@/features/triage/triage-page'))

const studies = [
  { href: '/triage', number: '01', title: 'Triage inbox', status: 'Interactive', description: 'An inbox that opens up. Peek, directional motion, and keyboard navigation.', inspiration: 'Inspired by Linear' },
  { href: '/booking', number: '02', title: 'Project discussion', status: 'In study', description: 'A considered booking flow. Choose a time, share the context, confirm the conversation.', inspiration: 'Inspired by Cal.com' },
]

function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const isTriage = pathname === '/triage'
  const isBooking = pathname === '/booking'
  const isHome = pathname === '/'

  return (
    <TooltipProvider delay={300}>
      <a className="showcase-skip" href="#main">Skip to content</a>
      <header className="showcase-header">
        <a href="/" className="showcase-brand">Freeman <span>/ UI studies</span></a>
        <nav aria-label="Studies">
          <a href="/" aria-current={isHome ? 'page' : undefined}>Overview</a>
          <a href="/triage" aria-current={isTriage ? 'page' : undefined}>Triage</a>
          <a href="/booking" aria-current={isBooking ? 'page' : undefined}>Booking</a>
        </nav>
      </header>
      {isTriage ? (
        <main id="main" tabIndex={-1} className="showcase-triage" aria-label="Triage inbox">
          <Suspense fallback={<p role="status">Loading Triage…</p>}><TriagePage /></Suspense>
        </main>
      ) : (
        <main id="main" tabIndex={-1} className="showcase-overview">
          {isHome ? <>
            <p className="showcase-eyebrow">An ongoing collection · 2026</p>
            <h1>Small interactions.<br /><span>Considered in detail.</span></h1>
            <p className="showcase-intro">Studies in interface behavior, motion, and accessibility. Built one interaction at a time.</p>
            <div className="showcase-grid">
              {studies.map((study) => (
                <a className="showcase-card" href={study.href} key={study.href}>
                  <div className="showcase-card-top"><span>{study.number}</span><span className="showcase-status">{study.status}</span></div>
                  <h2>{study.title} <span aria-hidden="true">↗</span></h2>
                  <p>{study.description}</p>
                  <span className="showcase-credit">{study.inspiration}</span>
                </a>
              ))}
            </div>
            <p className="showcase-footnote">Interactive studies with fictional data. No real bookings or inbox integrations.</p>
          </> : isBooking ? <>
            <p className="showcase-eyebrow">Study 02 · In study</p>
            <h1>Project discussion.</h1>
            <p className="showcase-intro">A 30-minute booking interaction inspired by Cal.com. Reference review comes first; the booking demo is not built yet.</p>
            <ol className="showcase-steps" aria-label="Proposed booking flow">
              <li>Choose a slot</li><li>Enter details</li><li>Confirmation</li>
            </ol>
            <a className="showcase-text-link" href="https://demo.cal.com/embed-inline">Explore the Cal.com inspiration ↗</a>
          </> : <>
            <p className="showcase-eyebrow">Page not found</p>
            <h1>No study here yet.</h1>
            <a className="showcase-text-link" href="/">Return to the studies</a>
          </>}
        </main>
      )}
    </TooltipProvider>
  )
}

export default App
