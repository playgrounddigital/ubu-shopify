import cx from 'classnames'
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { iconStyles } from '~/constants/iconStyles'
import PlusIcon from '~/public/img/icons/plus.svg'

interface AccordionProps {
  isDisabled?: boolean
  label?: string | ReactNode
  buttonOpenClassName?: string
  containerClassName?: string
  buttonClassName?: string
  contentClassName?: string
  children: string | ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

const Accordion: FC<AccordionProps> = ({
  isDisabled,
  label,
  buttonOpenClassName,
  containerClassName,
  contentClassName,
  buttonClassName,
  children,
  isOpen: externalIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const panelRef = useRef(null)

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen

  const handleClose = () => {
    panelRef.current.style.maxHeight = null
    if (externalIsOpen === undefined) {
      setInternalIsOpen(false)
    }
  }

  const handleOpen = () => {
    panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight}px`
    if (externalIsOpen === undefined) {
      setInternalIsOpen(true)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (!panelRef.current) return
      if (panelRef.current.style.maxHeight) {
        panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight}px`
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle external state changes
  useEffect(() => {
    if (externalIsOpen !== undefined && panelRef.current) {
      if (externalIsOpen) {
        panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight}px`
      } else {
        panelRef.current.style.maxHeight = null
      }
    }
  }, [externalIsOpen])

  return (
    <div className={cx('h-fit w-full flex-shrink border-b border-green', containerClassName)}>
      <ActivationButton
        isOpen={isOpen}
        isDisabled={isDisabled}
        label={label}
        buttonOpenClassName={buttonOpenClassName}
        buttonClassName={buttonClassName}
        onClick={() => {
          if (isDisabled) return

          // If external control is provided, use the onToggle callback
          if (onToggle) {
            onToggle()
            return
          }

          // Otherwise use internal state management
          if (isOpen) {
            handleClose()
          } else {
            handleOpen()
          }
        }}
      />
      {!isDisabled && (
        <Content
          isOpen={isOpen}
          panelRef={panelRef}
          contentClassName={contentClassName}
          children={children}
        />
      )}
    </div>
  )
}

interface ContentProps {
  isOpen: boolean
  panelRef: RefObject<HTMLDivElement>
  contentClassName?: string
  children: string | ReactNode
}

const Content: FC<ContentProps> = ({ isOpen, panelRef, contentClassName, children }) => (
  <div
    ref={panelRef}
    className={cx('max-h-0 overflow-hidden transition-all', contentClassName, {
      'opacity-0': !isOpen,
    })}
  >
    {children}
  </div>
)

interface ActivationButtonProps {
  isOpen: boolean
  isDisabled: boolean
  label: string | ReactNode
  buttonOpenClassName?: string
  buttonClassName?: string
  onClick: () => void
}

const ActivationButton: FC<ActivationButtonProps> = ({
  isOpen,
  isDisabled,
  label,
  buttonOpenClassName,
  buttonClassName,
  onClick,
}) => (
  <button
    type="button"
    className={cx(
      'flex h-20 w-full items-center justify-between gap-x-10 text-left uppercase transition-all',
      buttonClassName,
      {
        'cursor-not-allowed': isDisabled,
        [buttonOpenClassName]: isOpen,
      }
    )}
    onClick={onClick}
  >
    {label}
    {!isDisabled && <PlusIcon className={cx('transition-transform', iconStyles[12], { 'rotate-90': isOpen })} />}
  </button>
)

export default Accordion
