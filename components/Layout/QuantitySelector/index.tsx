'use client'
import cx from 'classnames'
import { FC } from 'react'

interface QuantitySelectorProps {
  size: 'sm' | 'lg'
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  disabled?: boolean
  className?: string
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  size = 'lg',
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
  className = '',
}) => {
  return (
    <div
      className={cx('flex items-center rounded-full border border-green', className, {
        'h-[58px]': size === 'lg',
        'h-[29px]': size === 'sm',
      })}
    >
      <button
        disabled={disabled}
        aria-label="Decrease quantity"
        onClick={onDecrease}
        className={cx('flex items-center justify-center disabled:opacity-50', {
          'h-[29px] pr-[7px] pl-[11px]': size === 'sm',
          'h-[58px] pr-[13px] pl-[21px] text-xl': size === 'lg',
        })}
      >
        −
      </button>
      <div
        className={cx('text-center font-medium', {
          'min-w-4': size === 'sm',
          'min-w-9 text-[21px] leading-[45px] font-medium': size === 'lg',
        })}
      >
        {quantity}
      </div>
      <button
        disabled={disabled}
        aria-label="Increase quantity"
        onClick={onIncrease}
        className={cx('flex items-center justify-center disabled:opacity-50', {
          'h-[29px] pr-[11px] pl-[7px]': size === 'sm',
          'h-[58px] pr-[21px] pl-[13px] text-xl': size === 'lg',
        })}
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
