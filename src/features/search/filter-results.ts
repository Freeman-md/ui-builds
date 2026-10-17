import type { SearchResultGroup } from './data/sample-results'

export function filterResults(groups: SearchResultGroup[], query: string, selectedId: string | null) {
  const normalizedQuery = query.trim().toLowerCase()
  const matchingGroups = groups.map((group) => ({
    ...group,
    items: group.items.filter((item) => [item.title, item.subtitle ?? ''].some((text) => text.toLowerCase().includes(normalizedQuery))),
  })).filter((group) => group.items.length > 0)
  const items = matchingGroups.flatMap((group) => group.items)
  const selectedResult = items.find((item) => item.id === selectedId) ?? items[0] ?? null
  return { groups: matchingGroups, items, selectedResult }
}
