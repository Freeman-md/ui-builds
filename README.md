# Triage inbox

A small UI study inspired by [Linear Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek).

React, TypeScript, Vite, Tailwind CSS, and shadcn/ui (Base UI).

```sh
npm install
npm run dev
```

`npm run build` checks types and builds the app. `npm run lint` runs the linter.

Current slice: a centered inbox with team creation, a Triage heading, a per-team favourite toggle, and ten sample gigs in Engineering. The list scrolls beneath the fixed heading. New teams have empty lists; details and Peek are deferred. Teams and favourites live in memory and reset on refresh.

## Notes

[Design communication notebook](notes/design-communication.md): original requests, precise versions, lessons, and screenshots from each design iteration.
