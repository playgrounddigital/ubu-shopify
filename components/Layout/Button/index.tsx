import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { BUTTON_SIZE, ButtonColours, ButtonSize, defaultButtonClasses } from '~/components/Layout/Button/presets'
import { iconStyles } from '~/constants/iconStyles'
import DownArrowIcon from '~/public/img/icons/down-arrow.svg'
import PlayIcon from '~/public/img/icons/play.svg'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: ButtonSize
  backgroundColour?: 'grey-700' | 'grey-800'
  isLargeOnMobile?: boolean
  withRightArrow?: boolean
  withDownArrow?: boolean
  variant?: ButtonColours
  tabIndex?: number
  containerClassName?: string
  className?: string
  children: string | ReactNode
}

const Button: FC<ButtonProps> = ({
  size = 36,
  backgroundColour = 'grey-800',
  variant = 'primary',
  type = 'button',
  isLargeOnMobile,
  withRightArrow = true,
  withDownArrow,
  tabIndex,
  containerClassName,
  className,
  children,
  ...props
}) => (
  <>
    <div
      className={cx('group relative', containerClassName, {
        'w-fit': !containerClassName?.includes('w-'),
        // 'gradient-border-button': variant === 'gradient-border',
        'bg-[rgba(15,14,14,0.80)] p-0.5': variant === 'primary',
      })}
    >
      <button
        tabIndex={tabIndex}
        type={type}
        className={cx('relative rounded', defaultButtonClasses, className, BUTTON_SIZE[size], {
          'bg-grey-800 shadow-button': variant === 'primary',
          'group-hover:text-grey-500': variant === 'primary' && backgroundColour === 'grey-700',
          'border border-grey-700 bg-grey-900/80 hover:bg-grey-800 group-hover:border-grey-700': variant === 'border',
          'w-[220px]': !className?.includes('w-'),
          'w-full': containerClassName?.includes('w-full'),
          'h-9': !isLargeOnMobile,
          'h-[45.6px] md:h-9': isLargeOnMobile,
          'pointer-events-none opacity-50': props.disabled,
        })}
        {...props}
      >
        {variant === 'primary' && (
          <>
            {/* Main gradient */}
            <span
              className={cx('absolute inset-0 z-0 transition-opacity group-hover:opacity-0', {
                '[background:linear-gradient(90deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.10)_100%),#323232]':
                  backgroundColour === 'grey-700',
                '[background:linear-gradient(90deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.10)_100%),#1F1F1F]':
                  backgroundColour === 'grey-800',
              })}
            />
            <span
              className={cx('absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100', {
                '[background:linear-gradient(90deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.10)_100%),#1F1F1F]':
                  backgroundColour === 'grey-700',
              })}
            />
          </>
        )}
        <span className="relative z-10">{children}</span>
        {withRightArrow && !withDownArrow && (
          <PlayIcon
            className={cx(
              'relative z-10 text-grey-500 transition-transform group-hover:translate-x-0.5',
              iconStyles[16]
            )}
          />
        )}
        {withDownArrow && (
          <DownArrowIcon
            className={cx(
              'relative z-10 text-grey-500 transition-transform group-hover:translate-y-0.5',
              iconStyles[16]
            )}
          />
        )}
      </button>
    </div>
    {/* ) : (
      <button
        tabIndex={tabIndex}
        type={type}
        className={cx(defaultButtonClasses, className, BUTTON_COLOURS[variant], BUTTON_SIZE[size], {
          'w-[220px]': !className?.includes('w-'),
          'pointer-events-none opacity-50': props.disabled,
          'gradient-border-button': variant === 'gradient-border',
        })}
        {...props}
      >
        {children}
        {withRightArrow && <PlayIcon className={cx(iconStyles[16])} />}
      </button>
    )} */}
  </>
)

export default Button
