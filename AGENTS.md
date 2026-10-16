# Working agreements

- Implement only the design slice requested by the user.
- After each proposed update, verify it and create a local Conventional Commit (for example, `feat(triage): ...` or `style(triage): ...`). Do not push unless asked.
- In the final response, include a concise example of how the user could describe that specific update more precisely.
- Document concise design decisions for each component in README.md, with relevant before/after screenshots in notes/images/. Do not recreate the removed design communication notebook.
- Use PascalCase for React component filenames; keep hooks and utility filenames in their existing convention.
- Keep components and styling simple; avoid speculative abstractions.
- Never inspect secret files or expose credentials.
