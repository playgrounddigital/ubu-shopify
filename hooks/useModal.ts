import { useCallback, useEffect, useRef, useState } from 'react'

interface UseModalOptions {
  defaultOpen?: boolean
  closeEscape?: boolean
}

const useModal = ({ defaultOpen = false, closeEscape = false }: UseModalOptions = {}) => {
  const [isOpen, setIsEnabled] = useState(defaultOpen)
  const ref = useRef<HTMLElement>(null)

  const open = useCallback(() => setIsEnabled(true), [])
  const close = useCallback(() => setIsEnabled(false), [])
  const toggle = useCallback(() => setIsEnabled((prev) => !prev), [isOpen])

  useEffect(() => {
    // Handle click outside of the modal to close it
    const handleGlobalMouseDown = ({ target }) => {
      if (!ref.current || ref.current.contains(target)) {
        return
      }

      close()
    }

    // Handle escape key press to close the modal
    const onEscapeKeyPress =
      (fn: () => any) =>
      ({ key }: { key: string }) => {
        if (closeEscape) return
        key === 'Escape' ? fn() : null
      }

    const handleGlobalKeydown = onEscapeKeyPress(close)

    document.addEventListener('mousedown', handleGlobalMouseDown)
    document.addEventListener('keydown', handleGlobalKeydown)

    return () => {
      document.removeEventListener('mousedown', handleGlobalMouseDown)
      document.removeEventListener('keydown', handleGlobalKeydown)
    }
  }, [close])

  return {
    ref,
    isOpen,
    open,
    close,
    toggle,
  }
}

export default useModal
