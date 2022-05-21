import { useEffect } from 'react'

export const useObserver = ({ target, onIntersect, root = null, rootMargin = '0px', threshold = 1.0 }: any) => {
  useEffect(() => {
    let observer: any

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
      observer.observe(target.current)
    }

    return () => observer && observer.disconnect()
  }, [target, onIntersect, root, rootMargin, threshold])
}
