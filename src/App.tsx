import { Plus } from 'lucide-react'
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
            <div className="flex h-14 items-center gap-1 border-b border-white/7 px-3">
              <TabsList aria-label="Teams" className="h-9 bg-transparent p-0">
                <TabsTrigger
                  value="engineering"
                  className="h-9 rounded-md px-3 text-sm transition-colors data-active:bg-white/7 data-active:shadow-none dark:data-active:border-transparent dark:data-active:bg-white/7 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Engineering
                </TabsTrigger>
              </TabsList>
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
