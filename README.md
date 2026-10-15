# Triage inbox

A small UI study inspired by [Linear Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek).

React, TypeScript, Vite, Tailwind CSS, and shadcn/ui (Base UI).

```sh
npm install
npm run dev
```

`npm run build` checks types and builds the app. `npm run lint` runs the linter.

Current slice: a centered inbox with team creation, per-team favourites, and ten sample gigs in Engineering. Selecting a gig smoothly expands the container in width and height into a list/detail view with copy and close actions. Escape or Back restores focus and list position. On narrow screens, details replace the list. Detail changes use a brief Motion fade and 4px entrance; team tabs enter and settle over 180ms, and team panels fade over 150ms. Row and tab colors transition over 120ms. Keyboard selections stay immediate, and reduced-motion preferences disable the added effects. Hover or focus a row for a compact Peek with its title, brief, and age. Up/Down (or Home/End) moves between previews, Enter opens details, and Escape dismisses Peek. New teams have empty lists. All state resets on refresh.

## Notes

[Design communication notebook](notes/design-communication.md): original requests, precise versions, lessons, and screenshots from each design iteration.
