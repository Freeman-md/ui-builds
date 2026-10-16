import { lazy, Suspense } from 'react'
import { TooltipProvider } from '@/components/ui/Tooltip'
import './showcase.css'

const TriagePage = lazy(() => import('@/features/triage/TriagePage'))

const BookingPage = lazy(() => import('@/features/booking/BookingPage'))

const studies = [
  { href: '/triage', number: '01', title: 'Triage inbox', status: 'Interactive', description: 'An inbox that opens up. Peek, directional motion, and keyboard navigation.', inspiration: 'Inspired by Linear' },
  { href: '/booking', number: '02', title: 'Project discussion', status: 'In progress', description: 'A considered booking flow. Choose a time, share the context, confirm the conversation.', inspiration: 'Inspired by Cal.com' },
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
      {isTriage || isBooking ? (
        <main id="main" tabIndex={-1} className="showcase-triage" aria-label={isTriage ? 'Triage inbox' : 'Booking study'}>
          <Suspense fallback={<p role="status">Loading study…</p>}>
            {isTriage ? <TriagePage /> : <BookingPage />}
          </Suspense>
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
