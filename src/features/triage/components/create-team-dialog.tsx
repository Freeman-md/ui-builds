import { useRef, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type CreateTeamDialogProps = {
  teamNames: string[]
  onCreate: (name: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTeamDialog({ teamNames, onCreate, open, onOpenChange }: CreateTeamDialogProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [previousOpen, setPreviousOpen] = useState(open)

  // Reset before the newly opened form paints; retain content during its exit.
  if (previousOpen !== open) {
    setPreviousOpen(open)
    if (open) {
      setName('')
      setError('')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const duplicate = teamNames.some(
      (teamName) => teamName.toLowerCase() === trimmedName.toLowerCase(),
    )

    if (!trimmedName || duplicate) {
      setError(!trimmedName ? 'Enter a team name.' : 'A team with this name already exists.')
      inputRef.current?.focus()
      return
    }

    onCreate(trimmedName)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Add team" aria-keyshortcuts="n"
                  className="text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            />
          }
        >
          <Plus className="size-4" aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent>Add team</TooltipContent>
      </Tooltip>
      <DialogContent
        initialFocus={inputRef}
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] bg-card p-5 sm:max-w-xs"
      >
        <DialogTitle>Create team</DialogTitle>
        <DialogDescription className="sr-only">
          Name your team to create a blank triage inbox.
        </DialogDescription>
        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="team-name">Team name</Label>
            <Input
              ref={inputRef}
              id="team-name"
              name="teamName"
              type="text"
              autoComplete="off"
              maxLength={80}
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setError('')
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'team-name-error' : undefined}
              className="h-9"
            />
            {error && (
              <p id="team-name-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose render={<Button type="button" variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Create team</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
