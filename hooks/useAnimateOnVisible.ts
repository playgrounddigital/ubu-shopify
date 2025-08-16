import cx from 'classnames'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseAnimateOnVisibleOptions {
  threshold?: number
  triggerOnce?: boolean
}

const useAnimateOnVisible = ({ threshold, triggerOnce = true }: UseAnimateOnVisibleOptions = {}): {
  ref: (node?: Element | null) => void
  transitionClassName: string
  inView: boolean
} => {
  const [_inView, _setInView] = useState(false)
  const [hasCheckedForInitialVisibility, setHasCheckedForInitialVisibility] = useState(false)
  const { ref, inView, entry } = useInView({
    threshold: threshold || 0.3,
    triggerOnce: triggerOnce !== undefined ? triggerOnce : true,
  })

  // If the element is above the viewport, we want to set it to visible
  // so that the animation is not triggered when the user scrolls up
  useEffect(() => {
    if (!entry || (hasCheckedForInitialVisibility && triggerOnce)) return
    // entry is IntersectionObserverEntry
    if (entry?.boundingClientRect.y < 0) {
      _setInView(true)
      setHasCheckedForInitialVisibility(true)
    } else if (!triggerOnce) {
      _setInView(false)
      setHasCheckedForInitialVisibility(true)
    }
  }, [entry])

  useEffect(() => {
    if (inView) {
      _setInView(true)
    }
  }, [inView])

  return {
    ref,
    transitionClassName: cx('transition-all duration-1000', { 'opacity-0': !_inView }),
    inView: _inView,
  }
}

export default useAnimateOnVisible
