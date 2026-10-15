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

## 3. Create a team

**Original wording (excerpts)**

> I think a simple modal would make more sense. You get a simple modal and then just name, enter the name, enter. It creates a new team.

> Triage remains the default breadcrumb item. Keep the body blank, update the notes with this design step, and commit it when you're done.

**Precise version**

> Open a compact “Create team” dialog from the plus button, with a focused, labelled name field. Submit with Enter or Create team, reject blank and duplicate names, then add and select the new team tab. Keep “Triage” in every tab’s breadcrumb and the body blank. Support Cancel, Escape, and focus restoration to the plus button.

**Result**

Accessible creation dialog and selectable team tabs, with validation and overflow handling. Verified Enter/button submission, cancellation, focus trapping/restoration, and narrow-screen layouts. Teams last for the current page session. Commit: `feat(triage): add accessible create-team dialog`.

Before:

![Before: inactive add-team button](images/03-before-create-team.jpg)

Dialog:

![Create team dialog](images/03-create-team-dialog.jpg)

After:

![New Design team selected with the Triage breadcrumb and blank body](images/03-team-created.jpg)

## 4. Add the Triage heading and sample list

**Original wording (excerpts)**

> For a list item, I can see that it's got, let's say, two rows. I don't know how it was implemented though, but I know in the first row we have the title and justified to the right of it we have the identifier for that particular item. Below we have the source and then to the right of the source we have the age of the item, and I think we can use maybe like ten dummy items.

> And then also they are all filled to the left and right.

**Precise version**

> Add a full-width Triage heading with an inbox icon and star toggle. Below it, show ten edge-to-edge sample gigs: title left and identifier right, then source left and age right. Give the list a slightly lighter background and subtle row separators. Keep the heading fixed while the list scrolls; leave new teams empty and defer details and Peek.

**Result**

Ten two-line gigs in Engineering, keyboard-scrollable list, and independent star state per team. Verified scrolling to the final item, star toggling, team switching, and mobile layout. Commit: `feat(triage): add inbox heading and sample gig list`.

Before:

![Before: blank Engineering inbox](images/04-before-triage-list.jpg)

After:

![After: Triage heading, star toggle, and sample gigs](images/04-triage-heading-and-items.jpg)
