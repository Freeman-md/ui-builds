import emojiIcon from '../assets/emoji.svg'
import extensionsIcon from '../assets/extensions.svg'
import storeIcon from '../assets/store.svg'
import appearanceIcon from '../assets/appearance.svg'
import codeIcon from '../assets/code.svg'
import passwordIcon from '../assets/password.svg'
import notesIcon from '../assets/notes.svg'
import taskIcon from '../assets/task.svg'

export type SearchResult = {
  id: string
  title: string
  subtitle?: string
  kind: 'Command' | 'Application'
  icon: string
}

export type SearchResultGroup = { id: string; title: string; items: SearchResult[] }

export const sampleResultGroups: SearchResultGroup[] = [
  {
    id: 'suggestions',
    title: 'Suggestions',
    items: [
      { id: 'emoji', title: 'Search Emoji', subtitle: 'Emoji', kind: 'Command', icon: emojiIcon },
      { id: 'extensions', title: 'Manage Extensions', subtitle: 'Developer', kind: 'Command', icon: extensionsIcon },
      { id: 'store', title: 'Store', subtitle: 'Raycast', kind: 'Command', icon: storeIcon },
      { id: 'appearance', title: 'Toggle System Appearance', subtitle: 'System', kind: 'Command', icon: appearanceIcon },
      { id: 'code', title: 'Visual Studio Code', kind: 'Application', icon: codeIcon },
    ],
  },
  {
    id: 'commands',
    title: 'Commands',
    items: [
      { id: 'password', title: 'My Password', subtitle: '1Password', kind: 'Command', icon: passwordIcon },
      { id: 'notes', title: 'Search Notes', subtitle: 'Notes', kind: 'Command', icon: notesIcon },
      { id: 'task', title: 'Create Task', subtitle: 'Asana', kind: 'Command', icon: taskIcon },
    ],
  },
]
