import cx from 'classnames'
import { FC } from 'react'

const lineStyles = 'min-h-0.5 h-0.5 w-full bg-black rounded-full transition-all duration-500 transform-gpu'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

const HamburgerButton: FC<HamburgerButtonProps> = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className={cx('sharpen-transform relative inline-flex w-[28px] flex-col items-center justify-center gap-y-[7px]')}
  >
    <span
      className={cx(lineStyles, {
        'translate-y-[9px]': isOpen,
      })}
    />
    <span
      className={cx(lineStyles, {
        'opacity-0': isOpen,
      })}
    />
    <span
      className={cx(lineStyles, {
        '-translate-y-[9px]': isOpen,
      })}
    />
  </button>
)

export default HamburgerButton
