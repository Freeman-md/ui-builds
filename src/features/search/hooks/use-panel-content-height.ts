import { useCallback, useState } from 'react'

export function usePanelContentHeight() {
  const [height, setHeight] = useState<number>()
  // The portal may mount after its parent effect, so observe the content when its ref attaches.
  const contentRef = useCallback((content: HTMLDivElement | null) => {
    if (!content) return
    const measure = () => setHeight(content.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  return { contentRef, height }
}
