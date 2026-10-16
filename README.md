# UI studies — an interaction showcase

I rebuild focused interactions, then refine how they feel through layout, motion, and keyboard use. This app contains two studies: a Linear-inspired Triage inbox and a Cal.com-inspired Booking flow.

## Contents

- [Triage inbox](#triage-inbox)
- [Booking flow](#booking-flow)
- [Shared foundation](#shared-foundation)
- [Run locally](#run-locally)

## Triage inbox

Inspired by Linear’s [Triage](https://linear.app/docs/triage) and [Peek](https://linear.app/docs/peek). Open `/triage` to try ten fictional Engineering items, five Design items, and team creation. State resets on refresh.

![Triage inbox with details](notes/images/12-sequential.jpg)

### Design decisions

- **Flush active tabs.** Match the content surface, remove the inset highlight, and keep side borders so the selected team feels connected to its inbox.
- **Expand in both directions.** Give opened details more height as well as width, with a roughly 25/75 list/detail split. On phones, details replace the list.
- **Peek before opening.** Hover or focus a row for its muted identifier, title, brief, and age. Enter opens full details; moving into the preview keeps it open.
- **Discoverable keyboard controls.** Keep contextual hints and a shortcut guide in the footer. Restore row focus and scroll position when closing details.
- **Keep the shell steady.** Fix the heading and team strip while rows scroll. Create teams through a focused name dialog; new teams start empty.

| Before: inset tab | After: connected surface |
| --- | --- |
| ![Inset active tab](notes/images/01-centered-container.jpg) | ![Flush active tab](notes/images/02-joined-tab.jpg) |

### Motion and keyboard

- Move Peek and the selection highlight together over 300ms, including during arrow-key navigation. Retarget from the current position during repeated input.
- Fade old details out completely for 100ms before the next item slides in over 200ms. Direction follows list order; actions stay anchored.
- Respect reduced motion and resolve rapid navigation to the latest selection.

Use **↑/↓** or **J/K** to navigate items, **Enter** to open, **Esc** to return, and **←/→** on team tabs. **N** creates a team, **F** favourites it, **C** copies an open item’s ID, and **?** opens the [shortcut guide](notes/images/11-shortcuts.jpg). Letter shortcuts pause in forms and dialogs and stay scoped to the inbox.

I learned that following the correct row is only half the interaction: the preview also needs to travel there smoothly.

## Booking flow

Inspired by [Cal.com’s custom slots demo](https://demo.cal.com/api-slots). Open `/booking` for a **30-minute project discussion with Freeman**: choose a slot → enter details → confirmation.

### Design decisions

- **One continuous availability surface.** Seven day columns beneath a weekly header, compact time buttons, brighter hover borders, and a prefixed selection checkmark. Empty days show “No availability.”
- **Separate selection summary.** Place a bordered card 12px below availability, with a circled calendar icon, date, time, and actions. Keep it visible during details; remove it on confirmation to avoid duplication.
- **Preserve context on Back.** Retain name, email, optional project note, week, and chosen slot. Return keyboard focus to that slot.
- **Minimal progress, stable frame.** Three slim segments above one fixed-height body: 416px on desktop, 400px on mobile. Longer content scrolls inside; mobile availability scrolls horizontally with a visible hint.
- **Confirm only after success.** Validate required fields, focus the first error, and show pending feedback during a 700ms simulation. Prevent duplicate submissions. Confirmation includes meeting details and a fresh-booking action that resets the flow.

| Details and retained selection | Confirmation without duplication |
| --- | --- |
| ![Details step](notes/images/24-step-transitions.png) | ![Confirmation step](notes/images/25-confirmation.png) |

### Animation decisions

- **Draw progress.** Fill each newly reached segment left to right over 300ms; retract on Back.
- **Make direction clear.** Fade the old week or step out for 100ms, then slide the next in over 200ms. Forward enters from the right; Back enters from the left. Keep the frame and week controls steady.
- **Reveal the summary downward.** Expand, fade, and slide it in over 300ms; reverse on dismissal. Keep the card open when changing slots.
- **Animate only changed values.** Flip the summary time vertically; fade its date only when the day changes. Keep the icon, timezone, and card anchored.
- **Give confirmation reading time.** Draw the checkmark, then reveal the heading, personal confirmation message, meeting title, duration/host, date, time/timezone, and restart button in order. Pause **0.5 seconds after each reveal**. Only duration/host and date typewrite; the remaining text flips in, with a slight rise on the confirmation message.
- **Soften validation.** Expand and fade inline errors in; collapse and fade them out without resizing the outer frame.
- **Keep motion accessible.** Reserve the final text layout, expose complete text to screen readers, and make exiting content unfocusable. Reduced motion removes delays and effects; focusing the restart button reveals the remaining confirmation immediately.

The weekly layout and selection-summary pattern came from the inspected reference. The three-step flow, fixed frame, state preservation, and motion choreography are my choices. The [reference review](notes/booking-reference.md) records observations and inspection gaps; its original proposal is broader than this implementation.

**Demo limits:** fictional London wall-time availability, a fixed Europe/London label, and no real bookings or emails. Past dates and elapsed times are excluded. There is no timezone picker, external calendar, or interactive slot-conflict scenario.

I learned to separate motion speed from reading time: a smooth reveal still feels rushed without space before the next one.

## Shared foundation

React, TypeScript, Vite, Tailwind CSS, shadcn/ui with Base UI, Motion, and Lucide icons.

| Study | UI primitives |
| --- | --- |
| Triage | Card, Tabs, Dialog, Popover, Item/ItemGroup, Toggle, Tooltip, Button, Badge, Input, Label |
| Booking | Button, Input, Label, Textarea; custom availability, progress, and confirmation layouts |

Feature hooks own state and interactions; components handle presentation. Both studies reuse theme tokens and [motion easing/timings](src/lib/motion.ts), while their choreography stays local.

- `src/features/triage/` and `src/features/booking/`: separate components, hooks, and fixtures.
- `src/components/ui/`: shared primitives; `src/index.css`: shared theme and accessibility defaults.
- `src/App.tsx` and `src/showcase.css`: showcase navigation and layout.

`/` is the showcase. Navigation resets each study’s session state. Production hosting must serve `index.html` for app routes. The repository retains its original `triage-inbox` name; no npm package has been published. Local reuse can later be tested with `npm pack`.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm test        # Shortcuts, date boundaries, booking timing and cancellation
npm run build   # Type checking and production build
npm run lint
```

Detailed design communication notebooks stay local and Git-ignored; this README contains the condensed decisions and selected before/after images.
