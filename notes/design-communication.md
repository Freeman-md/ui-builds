# Design communication notebook

This records how Freeman describes a design change, a more precise way to express the same intent, and the resulting UI. The goal is to learn useful language through real iterations.

Original wording below is quoted verbatim in selected excerpts, not reproduced as a full transcript. Precise prompts describe the intended result; the screenshots show the implementation made from the conversation. They do not demonstrate that a rewritten prompt was independently tested.

## 1. Start with the container

15 October 2026 · Initial implementation · `1624f4a`

### Original wording

> The most important thing we're working on is we just want the container and then the highlighted team and, what do you call it, the plus icon to add a new team, if you follow me. This container is just going to be a small container.

> This, of course, is not a full application. This is just, what do you call it? This is just me seeing how I can prompt you, or not prompt you, but seeing how I can direct you to get something done to the way I want it to be done.

> So you first of all tell me, okay, which ChatCN component you think is best suited for this, and then once I check them out and I approve of it, you go ahead and implement this.

### Precise version proposed in the chat

> Set up a React, TypeScript, Tailwind, and shadcn/ui project at `ui-builds/triage-inbox`. First propose the shadcn components and wait for my approval. Then build only a compact, centered container with a selected “Engineering” team tab and an adjacent plus button labelled “Add team.” Leave the body blank. Match the Linear reference and include keyboard focus and accessible labels. We’ll add triage content, expansion, and Peek later.

### What made it precise

- **Elements:** container, selected team tab, plus button.
- **Placement:** centered container; button adjacent to the tab.
- **Scope:** blank body; list, expansion, and Peek deferred.
- **Sequence:** propose components, obtain approval, implement.

### Result

React + Vite + TypeScript, Tailwind CSS, and shadcn/ui. A centered dark container with the selected Engineering tab and an inactive add-team button. No previous UI existed, so there is only a result image.

![Initial centered container with an inset Engineering tab and blank body](images/01-centered-container.jpg)

## 2. Approve the first slice

15 October 2026 · Implementation instruction for the same initial result

### Original wording

> Okay, those components work. Go ahead and initialize the project and build just the centered container with the Engineering tab and plus button. Keep the body blank for now.

### Feedback given in the chat

This was already precise: it named the elements, placement, and scope. No rewrite was necessary.

### Lesson

Once the setup and components are agreed, a short instruction can refer to those decisions. There is no need to repeat the whole brief.

## 3. Join the active tab to the content surface

15 October 2026 · Header refinement · `22e7a69`

### Original wording

> I think it's got a darker background. It's meant to have a darker background than the content, such that the highlighted team, its, how do I put it, its active background is hitting.

> Like, I know, like, you get? Like, it's more like it doesn't have the up and bottom this thing, because what's going on, man? I hope you understand, man. I hope you understand.

> It is more as if it is just, it's, how do I call it? This is very funny, man. Just take a closer look at this, man. Take a very closer look at this, man. You will see what I'm talking about. It's as if the active this thing starts from the, you know, like it's as if it is sitting on top of the content area, such that you don't see. It's as if it is a continuation. Something like that.

> It is activated not by elevating it, but by, you get, as if it continues from the content area straight to the top of the heading. You get? And the heading of the this thing is a bit more shorter.

### Precise version proposed in the chat

> Make the active tab flush with the header’s top and bottom. Match its background to the content panel, with only left and right borders, so both surfaces appear continuous. Darken and shorten the header.

The same update also added a left sidebar icon and the visual “Engineering › Triage” breadcrumb, based on the reference and the rest of the request.

### A complete version for repeating this particular update

> Reduce the header height from 56px to 40px and give it a darker background than the body. Make the active tab fill the header height, with no top or bottom gap. Use the body’s background for the tab and show only its left and right borders, so it merges into the body. Add the left sidebar icon and an “Engineering › Triage” label inside the tab. Keep the body blank and preserve visible keyboard focus.

The pixel sizes in this complete version record the implementation choice; they were not specified in the original request.

### What made it precise

- **“Flush”** means the edges meet without a gap.
- **“Full-height tab”** specifies its relationship to the header.
- **“Same background as the content panel”** explains the continuous surface.
- **“Left and right borders only”** specifies which edges remain visible.
- **“Shorten the header”** targets the header rather than the whole container.

### Before

The active tab was an inset rounded shape with space above and below it.

![Before: inset rounded Engineering tab](images/01-centered-container.jpg)

### After

The header is shorter and darker. The active tab fills its height and joins the content surface. The body remains blank.

![After: Engineering and Triage tab joins the blank content panel](images/02-joined-tab.jpg)

## 4. Keep this learning record

15 October 2026 · Documentation update

### Original wording

> I want you to showcase what I first said, do you get? And then how precise you, what a precise version of it, and then I can look into it, and then the same one as well.

> It could show that before this is how it was, and then this particular, I was trying to communicate this, but then I could have communicated it this way, and this is the result of that communication.

### Precise version

> Maintain a design communication notebook in the project. For each design update, record my original wording, a precise version with the same intent, the language that made it clearer, and the implementation result. Include before-and-after screenshots when the change is visual; for the initial build, include only the result. Link the notebook from the README and commit each update.

### Result

This notebook, stored screenshots, a README link, and a standing instruction to maintain the record during future iterations. No application UI changed.

## Pattern to reuse

> Change **[element]** from **[current appearance or behaviour]** to **[desired appearance or behaviour]**. Specify **[position, dimensions, edges, or interaction]**. Keep **[scope boundary]**. Verify **[observable result]**.

Use the parts that matter for the change. Precision comes from describing relationships and boundaries, not from making every request longer or supplying every pixel value.
