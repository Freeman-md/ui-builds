# Triage inbox

A small UI study inspired by [Linear Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek).

React, TypeScript, Vite, Tailwind CSS, and shadcn/ui (Base UI).

```sh
npm install
npm run dev
```

`npm run build` checks types and builds the app. `npm run lint` runs the linter.

Current slice: a centered inbox with team creation, per-team favourites, ten sample gigs in Engineering, and five in Design. New teams have empty lists; all state resets on refresh.

Selecting an item keeps the existing width/height expansion. Switching items slides the detail body up or down by 48px over 300ms, following list order, while one highlight moves between rows. Team tabs and panels retain their entry/fade transitions. Reduced-motion preferences disable the effects.

Hover or focus a row for Peek. In the list, Up/Down and Home/End navigate; Enter opens details. J/K navigates from either list or details; Escape dismisses overlays or returns to the list. Left/Right switches focused team tabs. N creates a team, F toggles its favourite, C copies an open item’s ID, and ? opens the shortcut guide. Letter shortcuts run only inside the inbox and pause in forms and dialogs. The footer shows contextual hints and a clickable guide.

`npm test` runs focused shortcut tests using Node’s built-in test runner and TypeScript support.

## Notes

[Design communication notebook](notes/design-communication.md): original requests, precise versions, lessons, and screenshots from each design iteration.
