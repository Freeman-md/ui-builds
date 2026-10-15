# Design communication notes

## 1. Scaffold the container

**Original wording (excerpt)**

> The most important thing we're working on is we just want the container and then the highlighted team and, what do you call it, the plus icon to add a new team, if you follow me. This container is just going to be a small container.

**Precise version**

> Set up React, TypeScript, Tailwind CSS, and shadcn/ui at `ui-builds/triage-inbox`. Build a compact, centered container with a selected Engineering tab and an adjacent plus button labelled “Add team.” Leave the body blank and include accessible labels and keyboard focus.

**Result**

Centered dark container with the Engineering tab, inactive plus button, and blank body. Commit: `1624f4a`.

![Initial container](images/01-centered-container.jpg)

## 2. Join the active tab to the body

**Original wording (excerpts)**

> It's as if the active this thing starts from the, you know, like it's as if it is sitting on top of the content area, such that you don't see. It's as if it is a continuation. Something like that.

> It is activated not by elevating it, but by, you get, as if it continues from the content area straight to the top of the heading. You get? And the heading of the this thing is a bit more shorter.

**Precise version**

> Make the active tab flush with the header’s top and bottom. Match its background to the body, with only left and right borders, so both surfaces appear continuous. Darken and shorten the header. Add the left sidebar icon and “Engineering › Triage” label. Keep the body blank.

**Result**

Shorter, darker header with a full-height active tab joined to the body, plus the icon and label. Commit: `22e7a69`.

Before:

![Before: inset tab](images/01-centered-container.jpg)

After:

![After: tab joined to the body](images/02-joined-tab.jpg)
