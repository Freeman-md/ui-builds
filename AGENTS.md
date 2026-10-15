# Working agreements

- Implement only the design slice requested by the user.
- After each proposed update, verify it and create a local Conventional Commit (for example, `feat(triage): ...` or `style(triage): ...`). Do not push unless asked.
- In the final response, include a concise example of how the user could describe that specific update more precisely.
- Maintain `notes/design-communication.md` for each design iteration: quote the original request (mark excerpts honestly), record the precise version and what makes it clearer, and describe the result. Store visual before-and-after screenshots in `notes/images/`; the initial build needs only a result screenshot. Capture the before state before editing. Do not imply a rewritten prompt was separately tested unless it was.
- Keep components and styling simple; avoid speculative abstractions.
- Never inspect secret files or expose credentials.
