# Working agreements

- Implement only the design slice requested by the user.
- After each proposed update, verify it and create a local Conventional Commit (for example, `feat(triage): ...` or `style(triage): ...`). Do not push unless asked.
- In the final response, include a concise example of how the user could describe that specific update more precisely.
- Add one entry to `notes/design-communication.md` only for a requested design or development change. Each entry contains only original wording (clearly marked verbatim excerpts are fine), one precise version, and the result with relevant screenshots and commit. Do not add entries for approvals, documentation requests, or process discussions. Keep it concise. Capture visual before states before editing; the initial build needs only a result image. Store screenshots in `notes/images/`.
- Keep components and styling simple; avoid speculative abstractions.
- Never inspect secret files or expose credentials.
