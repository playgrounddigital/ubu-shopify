import cx from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import { BUTTON_COLOURS, ButtonColours } from '~/components/Layout/Button/presets'
import ArrowRightIcon from '~/public/img/icons/arrow-right.svg'

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFlipped?: boolean
  size?: 'sm' | 'md'
  variant: ButtonColours
  ariaLabel: string
  onClick?: () => void
}

const CircleButton: FC<CircleButtonProps> = ({
  size = 'md',
  variant = 'white-black',
  ariaLabel,
  onClick,
  isFlipped,
  ...props
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cx(BUTTON_COLOURS[variant].button, 'group/button relative inline-flex items-center justify-center', {
        'size-[60px] lg:size-[85px]': size === 'md',
        'size-[35px]': size === 'sm',
        'pointer-events-none': props.disabled,
      })}
      {...props}
    >
      <span
        className={cx(
          BUTTON_COLOURS[variant].background,
          'absolute inset-0 rounded-full transition-all group-hover/button:blur-sm',
          {
            '!bg-grey': props.disabled,
          }
        )}
      />
      <ArrowRightIcon
        className={cx('relative z-10 transition-transform', {
          'size-[35px] lg:size-[50px]': size === 'md',
          'size-[16px]': size === 'sm',
          'group-hover/button:translate-x-0.5': !isFlipped,
          'rotate-180 group-hover/button:-translate-x-0.5': isFlipped,
        })}
      />
    </button>
  )
}

export default CircleButton
