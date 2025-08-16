import { useEffect } from 'react'

export const useHandleEscapeKey = (isOpen: boolean, onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent, onClose: () => void) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', (e) => handleKeyDown(e, onClose))
    } else {
      document.removeEventListener('keydown', (e) => handleKeyDown(e, onClose))
    }
    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e, onClose))
    }
  }, [isOpen, onClose])
}
