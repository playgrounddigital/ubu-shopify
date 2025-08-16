import cx from 'classnames'
import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import ChevronDownIcon from '~/public/img/icons/chevron-down.svg'

interface AccordionProps {
  isDisabled?: boolean
  label?: string | ReactNode
  buttonOpenClassName?: string
  containerClassName?: string
  buttonClassName?: string
  contentClassName?: string
  children: string | ReactNode
}

const Accordion: FC<AccordionProps> = ({
  isDisabled,
  label,
  buttonOpenClassName,
  containerClassName,
  contentClassName,
  buttonClassName,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  const handleClose = () => {
    panelRef.current.style.maxHeight = null
    setIsOpen(false)
  }

  const handleOpen = () => {
    panelRef.current.style.maxHeight = `${panelRef.current.scrollHeight}px`
    setIsOpen(true)
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

  return (
    <div className={cx('h-fit w-full flex-shrink rounded-lg border', containerClassName, {})}>
      <ActivationButton
        isOpen={isOpen}
        isDisabled={isDisabled}
        label={label}
        buttonOpenClassName={buttonOpenClassName}
        buttonClassName={buttonClassName}
        onClick={() => {
          if (isDisabled) return
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
      'flex h-20 w-full items-center justify-between gap-x-10 px-6 text-left transition-all',
      buttonClassName,
      {
        'cursor-not-allowed': isDisabled,
        [buttonOpenClassName]: isOpen,
      }
    )}
    onClick={onClick}
  >
    {label}
    {!isDisabled && (
      <ChevronDownIcon className={cx('size-[25px] min-w-[25px] transition-transform', { 'rotate-180': isOpen })} />
    )}
  </button>
)

export default Accordion
