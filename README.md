# Triage inbox — a UI study

I rebuilt Linear’s [Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek) interactions to practise making design decisions and communicating them precisely. I started with a blank container, then refined the layout, previews, motion, and keyboard behavior one step at a time.

This is a local prototype with fictional items: ten in Engineering and five in Design. I can create more teams, but everything resets on refresh.

![The current inbox](notes/images/12-sequential.jpg)

## Four design decisions

### 1. Make the active tab part of the content surface

I replaced the inset highlight with a full-height, flush tab. Its background matches the body, with borders on the left and right, so the selected team feels connected to its inbox.

| Before | After |
| --- | --- |
| ![Inset active tab](notes/images/01-centered-container.jpg) | ![Flush active tab](notes/images/02-joined-tab.jpg) |

### 2. Expand in height as well as width

Opening an item expands the container into a roughly 25/75 list-and-detail layout. I also gave it more height so the details have room to read. Closing it restores the list’s scroll position and row focus; on phones, details replace the list.

| Before: width only | After: width and height |
| --- | --- |
| ![Width-only expansion](notes/images/07-before-height.jpg) | ![Wider and taller details](notes/images/07-taller-details.jpg) |

### 3. Let people Peek before opening

I added a compact preview for a quick read without expanding the workspace. Hovering or focusing a row reveals its identifier, title, short brief, and age. Enter opens the full details; moving the pointer into the preview keeps it open.

| Before | After |
| --- | --- |
| ![List without Peek](notes/images/08-before-peek.jpg) | ![Compact Peek with identifier](notes/images/13-peek-flow.jpg) |

### 4. Make keyboard controls discoverable

I put contextual key hints in a persistent footer, with a clickable shortcut guide. Navigation works through the list and details, while letter shortcuts stay scoped to the inbox and pause in forms and dialogs. Visible focus and selection announcements support the same flow.

| Before | After |
| --- | --- |
| ![Details before the keyboard footer](notes/images/11-before-directional.jpg) | ![Details with contextual key hints](notes/images/11-directional.jpg) |

Use **↑/↓** in the list, **J/K** for next/previous, **Enter** to open, and **Esc** to return. **←/→** switches focused team tabs. **N** creates a team, **F** favourites it, **C** copies an open item’s ID, and **?** opens the [complete guide](notes/images/11-shortcuts.jpg).

## Animation decisions

- **Keep Peek connected to selection.** I wanted the preview to travel up or down with the row highlight, including during arrow-key navigation. It now glides between anchors over 300ms using the same easing as the highlight. First opening and closing keep their own short transitions.
- **Let the old details leave first.** Showing two descriptions at once felt visually busy. I chose a complete 100ms fade-out before the next item slides in over 200ms. The slide direction follows list order, while the container and action buttons stay anchored.
- **Stay responsive during motion.** Repeated navigation retargets Peek from its current position; detail changes resolve to the latest selection. Reduced-motion preferences disable the effects.

## What I learned

Describing edges, proportions, direction, and timing made my feedback easier to implement. A preview’s position and its movement are separate decisions: following the correct row still felt abrupt until the surface travelled between rows. I also learned to judge exits and entrances together, rather than making each animation smooth in isolation.

## Components and structure

I used React, TypeScript, Vite, Tailwind CSS, shadcn/ui with Base UI, Motion, and Lucide icons.

| shadcn/ui components | Where I used them |
| --- | --- |
| Card, Tabs | Workspace shell and team selection |
| Dialog, Input, Label | Team creation and the shortcut guide |
| Popover | Peek |
| Item, ItemGroup | Two-line triage rows |
| Toggle, Tooltip | Team favourites and control hints |
| Button, Badge | Detail actions and properties |

The footer’s keycaps use native `<kbd>` elements. Team state, selection/focus restoration, and Peek behavior live in focused hooks. Both sample teams reuse the same inbox and detail components with different fixture data.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm test        # Shortcut behavior and scoping (Node with TypeScript support)
npm run build   # Type checking and production build
npm run lint
```

The [design notebook](notes/design-communication.md) records the original requests, concise versions, and results from each iteration. The screenshots above show successive stages of the build.
