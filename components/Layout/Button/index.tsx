import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import {
  BUTTON_ARROW_SIZE,
  BUTTON_CIRCLE_SIZE,
  BUTTON_COLOURS,
  BUTTON_SIZE,
  ButtonColours,
  ButtonSize,
} from '~/components/Layout/Button/presets'
import ArrowRightIcon from '~/public/img/icons/arrow-right.svg'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: ButtonSize
  icon?: any
  iconClassName?: string
  variant?: ButtonColours
  tabIndex?: number
  buttonClassName?: string
  className?: string
  children: string | ReactNode
}

const Button: FC<ButtonProps> = ({
  size = 'md',
  variant = 'white-black',
  type = 'button',
  tabIndex,
  buttonClassName,
  className,
  children,
  icon,
  iconClassName,
  ...props
}) => {
  const Icon = icon || ArrowRightIcon
  return (
    <button
      tabIndex={tabIndex}
      type={type}
      className={cx('group/button relative inline-flex uppercase', className, {
        'pointer-events-none opacity-50': props.disabled,
      })}
      {...props}
    >
      <span
        className={cx(
          'relative z-10 inline-flex items-center justify-center rounded-full text-center',
          BUTTON_SIZE[size],
          BUTTON_COLOURS[variant].button,
          buttonClassName
        )}
      >
        <span
          className={cx(
            'absolute inset-0 rounded-full transition-[filter] group-hover/button:blur-sm',
            BUTTON_COLOURS[variant].background
          )}
        />
        <span className="relative z-10">{children}</span>
      </span>
      <span
        className={cx(
          'relative inline-flex items-center justify-center',
          BUTTON_CIRCLE_SIZE[size],
          BUTTON_COLOURS[variant].button
        )}
      >
        <span
          className={cx(
            'absolute inset-0 rounded-full transition-[filter] group-hover/button:blur-sm',
            BUTTON_COLOURS[variant].background
          )}
        />
        <Icon
          className={cx(
            'relative z-10 transition-transform group-hover/button:translate-x-0.5',
            BUTTON_ARROW_SIZE[size],
            iconClassName
          )}
        />
      </span>
    </button>
  )
}

export default Button
