import { TriageWorkspace } from '@/components/triage/triage-workspace'
import { TooltipProvider } from '@/components/ui/tooltip'

function App() {
  return (
    <TooltipProvider delay={300}>
      <main className="grid min-h-svh place-items-center p-6 sm:p-10" aria-label="Triage inbox">
        <TriageWorkspace />
      </main>
    </TooltipProvider>
  )
}

export default App
