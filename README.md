# Triage inbox

A small UI study inspired by [Linear Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek).

React, TypeScript, Vite, Tailwind CSS, and shadcn/ui (Base UI).

```sh
npm install
npm run dev
```

`npm run build` checks types and builds the app. `npm run lint` runs the linter.

Current slice: a centered inbox with team creation, per-team favourites, and ten sample gigs in Engineering. Selecting a gig smoothly expands the container into a list/detail view with copy and close actions. Escape or Back restores focus and list position. On narrow screens, details replace the list. Reduced-motion preferences disable transitions. New teams have empty lists; Peek is deferred. All state resets on refresh.

## Notes

[Design communication notebook](notes/design-communication.md): original requests, precise versions, lessons, and screenshots from each design iteration.
