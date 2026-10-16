export type Gig = {
  id: string
  title: string
  source: string
  age: string
  category: string
  brief: string
  requirements: string[]
}

export const sampleGigs: Gig[] = [
  {
    id: "GIG-001",
    title: "Build a customer dashboard",
    source: "Upwork",
    age: "6m ago",
    category: "React",
    brief: "A small customer-success team needs a dashboard showing account health, usage trends, and outstanding support requests. The first version should work with supplied fixture data.",
    requirements: [
      "Build responsive account and usage views.",
      "Include loading, empty, and error states.",
      "Support keyboard navigation and readable charts.",
    ],
  },
  {
    id: "GIG-002",
    title: "Improve a mobile booking flow",
    source: "Contra",
    age: "18m ago",
    category: "UX engineering",
    brief: "A local studio wants its booking flow to work comfortably on phones. Simplify date and time selection while preserving entered details when users go back.",
    requirements: [
      "Improve date and time selection.",
      "Preserve form input between steps.",
      "Verify touch targets and keyboard access.",
    ],
  },
  {
    id: "GIG-003",
    title: "Turn Figma designs into a React website",
    source: "LinkedIn",
    age: "42m ago",
    category: "Frontend",
    brief: "An independent agency has finished its website designs and needs an accessible React implementation across desktop and mobile layouts.",
    requirements: [
      "Translate the supplied Figma layouts.",
      "Create responsive navigation and reusable sections.",
      "Check typography, image sizing, and focus states.",
    ],
  },
  {
    id: "GIG-004",
    title: "Fix checkout accessibility issues",
    source: "Referral",
    age: "1h ago",
    category: "Accessibility",
    brief: "A small online store needs focused accessibility fixes across its checkout. The existing checkout should keep its current payment integration.",
    requirements: [
      "Connect labels, instructions, and error messages.",
      "Fix keyboard focus and validation announcements.",
      "Verify contrast and zoom behaviour.",
    ],
  },
  {
    id: "GIG-005",
    title: "Create an internal reporting tool",
    source: "Upwork",
    age: "2h ago",
    category: "Internal tools",
    brief: "An operations team currently assembles weekly reports by hand. Build a small reporting interface using a supplied data export.",
    requirements: [
      "Show filterable summary and detail views.",
      "Handle missing and unusually long values.",
      "Provide a clear export action.",
    ],
  },
  {
    id: "GIG-006",
    title: "Add search to a documentation site",
    source: "Contra",
    age: "4h ago",
    category: "Search",
    brief: "A developer-tools company wants visitors to find answers within its documentation. Add a focused search interface over a supplied local index.",
    requirements: [
      "Support keyboard result navigation.",
      "Highlight matching text and show useful snippets.",
      "Include clear no-results feedback.",
    ],
  },
  {
    id: "GIG-007",
    title: "Speed up a portfolio website",
    source: "Email",
    age: "7h ago",
    category: "Performance",
    brief: "A photographer wants a faster portfolio without changing its visual identity. Review image loading and remove unnecessary client-side work.",
    requirements: [
      "Optimise image sizes and loading priorities.",
      "Reduce unnecessary script execution.",
      "Compare performance before and after the changes.",
    ],
  },
  {
    id: "GIG-008",
    title: "Build a responsive pricing calculator",
    source: "LinkedIn",
    age: "12h ago",
    category: "React",
    brief: "A service business needs a transparent pricing calculator that lets visitors explore package options before submitting an enquiry.",
    requirements: [
      "Calculate totals from the supplied pricing rules.",
      "Make every option accessible by keyboard.",
      "Adapt the layout for small screens.",
    ],
  },
  {
    id: "GIG-009",
    title: "Polish a SaaS onboarding experience",
    source: "Referral",
    age: "1d ago",
    category: "UX engineering",
    brief: "An early-stage SaaS team wants its onboarding flow to make setup progress and next steps clearer for new customers.",
    requirements: [
      "Clarify progress and completion feedback.",
      "Preserve work when navigating backwards.",
      "Handle validation and optional steps deliberately.",
    ],
  },
  {
    id: "GIG-010",
    title: "Update a React component library",
    source: "Upwork",
    age: "2d ago",
    category: "Design systems",
    brief: "A product team needs a focused update to its existing React component library, covering buttons, inputs, and compact navigation.",
    requirements: [
      "Extend the existing component conventions.",
      "Verify interactive and disabled states.",
      "Update examples for keyboard and screen-reader use.",
    ],
  },
]


export const designGigs: Gig[] = [
  {
    id: 'DES-001',
    title: 'Refresh the workspace navigation',
    source: 'Design review',
    age: '8m ago',
    category: 'Product design',
    brief: 'Explore a clearer navigation structure for teams managing several projects. Keep frequent destinations easy to reach.',
    requirements: ['Compare two navigation approaches.', 'Include compact and wide layouts.', 'Document focus and empty states.'],
  },
  {
    id: 'DES-002',
    title: 'Design a calmer notification inbox',
    source: 'Customer feedback',
    age: '24m ago',
    category: 'Interaction design',
    brief: 'Help people distinguish updates that need action from updates they can read later. Use a small set of consistent visual cues.',
    requirements: ['Define unread and resolved states.', 'Group related updates.', 'Check contrast and keyboard navigation.'],
  },
  {
    id: 'DES-003',
    title: 'Clarify the invitation flow',
    source: 'Research',
    age: '1h ago',
    category: 'UX writing',
    brief: 'Make inviting a teammate and choosing their access level easier to understand, with useful confirmation and error messages.',
    requirements: ['Clarify each access level.', 'Show pending invitations.', 'Write actionable error messages.'],
  },
  {
    id: 'DES-004',
    title: 'Create an accessible chart palette',
    source: 'Internal request',
    age: '3h ago',
    category: 'Design systems',
    brief: 'Develop a compact chart palette that works on dark surfaces and remains understandable without relying on color alone.',
    requirements: ['Pair colors with labels and patterns.', 'Check small chart examples.', 'Document contrast decisions.'],
  },
  {
    id: 'DES-005',
    title: 'Polish the project handoff screen',
    source: 'Design review',
    age: '6h ago',
    category: 'Product design',
    brief: 'Make the final project handoff clear, showing what is ready, who owns the next step, and where supporting files live.',
    requirements: ['Show ownership and next steps.', 'Include missing-file states.', 'Adapt the layout for phones.'],
  },
]

export function getTeamGigs(teamId: string): Gig[] {
  if (teamId === 'engineering') return sampleGigs
  if (teamId === 'design') return designGigs
  return []
}
