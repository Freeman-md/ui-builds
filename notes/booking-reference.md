# Booking interaction review

Inspected 16 October 2026. Inspiration: [Cal.com inline demo](https://demo.cal.com/embed-inline) and [custom slots demo](https://demo.cal.com/api-slots). No booking was submitted.

## Verified in the reference

- **Custom slots demo:** seven day columns, previous/next week buttons, timezone label, and outlined time buttons. Selecting a time reveals a selected-date/time summary, Clear, and Book it. Initial response shows loading before available times arrive.
- **Inline desktop:** the embedded booker initially appeared blank in the demo wrapper. Opening its actual iframe URL directly worked. It shows host/title/description/duration/location/timezone on the left, month calendar in the center, and a time list on the right. Muted past dates and the previous-month control are disabled; an available date gets a contrasting selected surface.
- **Date selection:** choosing another day updates the selected date and its time list. Slots have full date/time accessible labels. A 12h/24h control sits above the desktop list. Precise transition timing was not measured.
- **Timezone:** a searchable selector displays Europe/London. Changing it to America/New York changed the first 20 October slot from 09:30 to 04:30. Preserving an already selected appointment through a timezone change was not tested.
- **Details:** selecting a time replaces the calendar/time list with name, email, optional additional notes, Add guests, Back, and Confirm. The meeting summary stays visible and adds date, time range, and timezone. Required fields have visible markers.
- **Back:** returns to the previously chosen day. A test name survived Back and reselecting the same time. The time itself needed selecting again in the tested flow.
- **Mobile (390px):** summary and calendar stack. Choosing a date opens a slot overlay with back control, date, duration, and timezone. The details view stacks the summary above the form. Dark surfaces, thin borders, compact spacing, and brighter selected days distinguish states.
- **Keyboard observations:** timezone search supports typed filtering, arrow choices, Enter selection, and Escape. The mobile slot overlay focused its back control. This was not a complete keyboard or accessibility audit.

## Inspection gaps

Validation error presentation, booking success, a slot becoming unavailable, complete focus restoration, reduced-motion behavior, and exact motion curves/timings were not verified. Confirm/Book it were not submitted. These must not be described as observed Cal.com behavior.

## Proposed build — not implemented

1. **Choose a time:** 30-minute project discussion with Freeman; persistent summary; month calendar and time slots; explicit searchable timezone selector. Store slots as UTC instants and derive both displayed dates and times from the chosen zone. Disable past and fixture-unavailable dates. Selecting a slot enables Continue.
2. **Your details:** name, email, optional project note. Summary includes the chosen time. Back preserves both input and slot. Inline errors link to their fields, and invalid submission focuses the first invalid field.
3. **Confirmed:** show this only after the simulated booking resolves successfully. Show the date, time, timezone, duration, host, and submitted details. Label all screens as a demo with no real appointment created.

Use a restrained three-stage progress list with the current stage announced. Confirmation is a result, not another input step. The separate Continue action and visible progress are our choices, not claims about the reference.

A labelled conflict-demo toggle makes the next booking attempt reject its chosen slot. Return to available times with a clear error, mark that slot unavailable, retain entered details, and allow another attempt. Do not show success on rejection.

Smallest implementation: one Booking feature with a state hook, calendar/slot UI, details form, confirmation, fixture data, and a simulated asynchronous booking function. Reuse existing UI primitives, CSS tokens, and Motion. Mobile can stack the calendar and slots rather than duplicating Cal.com's overlay. Focus moves to the next step heading, Back restores the relevant control, loading announces progress, and reduced motion removes positional effects.

Before completion, verify timezone date rollover/DST, disabled dates, preserved input/slot, keyboard operation, validation, success-after-resolution, conflict recovery, and mobile overflow. Compare against the observations above, with proposed differences explicitly identified.
