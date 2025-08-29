import cx from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import { BUTTON_COLOURS, ButtonColours } from '~/components/Layout/Button/presets'
import ArrowRightIcon from '~/public/img/icons/arrow-right.svg'

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFlipped?: boolean
  variant: ButtonColours
  ariaLabel: string
  onClick?: () => void
}

const CircleButton: FC<CircleButtonProps> = ({ variant, ariaLabel, onClick, isFlipped, ...props }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cx(
        BUTTON_COLOURS[variant].button,
        'group/button relative inline-flex size-[60px] items-center justify-center md:size-[85px]',
        {
          'pointer-events-none': props.disabled,
        }
      )}
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
        className={cx('relative z-10 size-[35px] transition-transform md:size-[50px]', {
          'group-hover/button:translate-x-0.5': !isFlipped,
          'rotate-180 group-hover/button:-translate-x-0.5': isFlipped,
        })}
      />
    </button>
  )
}

export default CircleButton
