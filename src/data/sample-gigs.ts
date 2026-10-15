export type Gig = {
  id: string
  title: string
  source: string
  age: string
}

export const sampleGigs: Gig[] = [
  { id: 'GIG-001', title: 'Build a customer dashboard', source: 'Upwork', age: '6m ago' },
  { id: 'GIG-002', title: 'Improve a mobile booking flow', source: 'Contra', age: '18m ago' },
  { id: 'GIG-003', title: 'Turn Figma designs into a React website', source: 'LinkedIn', age: '42m ago' },
  { id: 'GIG-004', title: 'Fix checkout accessibility issues', source: 'Referral', age: '1h ago' },
  { id: 'GIG-005', title: 'Create an internal reporting tool', source: 'Upwork', age: '2h ago' },
  { id: 'GIG-006', title: 'Add search to a documentation site', source: 'Contra', age: '4h ago' },
  { id: 'GIG-007', title: 'Speed up a portfolio website', source: 'Email', age: '7h ago' },
  { id: 'GIG-008', title: 'Build a responsive pricing calculator', source: 'LinkedIn', age: '12h ago' },
  { id: 'GIG-009', title: 'Polish a SaaS onboarding experience', source: 'Referral', age: '1d ago' },
  { id: 'GIG-010', title: 'Update a React component library', source: 'Upwork', age: '2d ago' },
]
