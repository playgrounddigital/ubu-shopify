import cx from 'classnames'
import { FC } from 'react'
import { CIRCLE_BUTTON_COLOURS, CircleButtonColours } from '~/components/Layout/Button/presets'
import ArrowRightIcon from '~/public/img/icons/arrow-right.svg'

interface CircleButtonProps {
  variant: CircleButtonColours
}

const CircleButton: FC<CircleButtonProps> = ({ variant }) => {
  return (
    <button
      className={cx(
        CIRCLE_BUTTON_COLOURS[variant].button,
        'group/button relative inline-flex size-[85px] items-center justify-center'
      )}
    >
      <span
        className={cx(
          CIRCLE_BUTTON_COLOURS[variant].background,
          'absolute inset-0 rounded-full transition-[filter] group-hover/button:blur-sm'
        )}
      />
      <ArrowRightIcon className="relative z-10 size-[50px] transition-transform group-hover/button:translate-x-0.5" />
    </button>
  )
}

export default CircleButton
