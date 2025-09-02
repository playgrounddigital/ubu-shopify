import cx from 'classnames'
import { FC } from 'react'

const lineStyles = 'min-h-0.5 h-0.5 w-full bg-black rounded-full transition-all transform-gpu'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

const HamburgerButton: FC<HamburgerButtonProps> = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={cx(
      'sharpen-transform relative inline-flex w-[28px] flex-col items-center justify-center gap-y-[7px] lg:hidden'
    )}
  >
    <span
      className={cx(lineStyles, {
        'translate-y-[9px] rotate-45': isOpen,
      })}
    />
    <span
      className={cx(lineStyles, {
        'opacity-0': isOpen,
      })}
    />
    <span
      className={cx(lineStyles, {
        '-translate-y-[9px] -rotate-45': isOpen,
      })}
    />
  </button>
)

export default HamburgerButton
