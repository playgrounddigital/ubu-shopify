import { RefObject, useEffect } from 'react'

const useOutsideClick: (containerRef: RefObject<any>, onClose: () => void, isModal?: boolean) => void = (
  containerRef,
  onClose,
  isModal
) => {
  useEffect(() => {
    const detectClickOutside = (event: Event) => {
      if (isModal && !!containerRef && containerRef.current === event.target) {
        onClose()
      } else if (!isModal && !!containerRef && !containerRef?.current?.contains(event.target as HTMLElement)) {
        onClose()
      }
    }
    document.addEventListener('click', detectClickOutside)
    return () => document.removeEventListener('click', detectClickOutside)
  }, [containerRef, isModal, onClose])
}

export default useOutsideClick
