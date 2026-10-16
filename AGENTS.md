# Working agreements

- Implement only the design slice requested by the user.
- After each proposed update, verify it and create a local Conventional Commit (for example, `feat(triage): ...` or `style(triage): ...`). Do not push unless asked.
- In the final response, include a concise example of how the user could describe that specific update more precisely.
- Keep design communication notebooks local and Git-ignored: notes/design-communication.md for Triage and notes/<component>-design-communication.md for each new study. For each requested design/development update, record original wording (verbatim excerpts are fine), a precise version, and the verified result with before/after screenshots and commit. Do not add entries for process-only changes.
- Use the local notebooks to guide condensed public design decisions in README.md. Never stage, commit, or push the notebooks; keep before/after images in notes/images/.
- Use PascalCase for React component filenames; keep hooks and utility filenames in their existing convention.
- Keep components and styling simple; avoid speculative abstractions.
- Never inspect secret files or expose credentials.
