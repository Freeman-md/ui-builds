import { ChevronRight, CircleDashed, PanelLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function App() {
  return (
    <TooltipProvider delay={300}>
      <main className="grid min-h-svh place-items-center p-6 sm:p-10" aria-label="Triage inbox">
        <Card className="w-full max-w-[480px] gap-0 rounded-xl py-0 shadow-none ring-white/10">
          <Tabs defaultValue="engineering" className="gap-0">
            <div className="flex h-10 items-center bg-[var(--inbox-header)]">
              <div className="flex h-full w-12 shrink-0 items-center justify-center border-b border-white/7">
                <PanelLeft className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <TabsList aria-label="Teams" className="inbox-team-tabs">
                <TabsTrigger
                  value="engineering"
                  className="inbox-team-tab"
                >
                  <CircleDashed className="size-4 text-muted-foreground" aria-hidden="true" />
                  <span>Engineering</span>
                  <ChevronRight className="size-3 text-muted-foreground" aria-hidden="true" />
                  <span>Triage</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex h-full flex-1 items-center border-b border-white/7 pr-2 pl-1">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Add team"
                        aria-disabled="true"
                        className="relative text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    }
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    <span className="absolute top-1/2 left-1/2 size-12 -translate-1/2 pointer-fine:hidden" aria-hidden="true" />
                  </TooltipTrigger>
                  <TooltipContent side="top">Add team — not available yet</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <TabsContent
              value="engineering"
              className="m-0 h-[280px] flex-none rounded-b-xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring sm:h-[320px]"
            />
          </Tabs>
        </Card>
      </main>
    </TooltipProvider>
  )
}

export default App
