'use client'
import { FC } from 'react'
import TrashIcon from '~/public/img/icons/trash.svg'
import { CheckoutLineItem } from '~/types/shopify'

interface CartItemProps {
  item: CheckoutLineItem
  isLoading: boolean
  onIncrease: (id: string, quantity: number) => void
  onDecrease: (id: string, quantity: number) => void
  onDelete: (id: string) => void
  formatCurrency: (value: number) => string
}

const CartItem: FC<CartItemProps> = ({ item, isLoading, onIncrease, onDecrease, onDelete, formatCurrency }) => {
  return (
    <li className="flex items-center justify-between gap-x-4 text-[13px] leading-4 font-medium -tracking-[0.39px]">
      {/* Image */}
      <img
        src={item.variant?.image?.url}
        alt={item.title}
        className="h-[100px] w-[100px] rounded-md"
      />

      <div className="flex w-full flex-col">
        <div className="flex items-start justify-between gap-x-4">
          <p className="max-w-[100px] text-[19px] leading-[23px] font-bold -tracking-[0.57px]">{item.title}</p>

          {/* Delete button */}
          <button
            onClick={() => onDelete(item.id)}
            className="text-grey"
          >
            <TrashIcon className="size-[15px]" />
          </button>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center justify-between">
          {item.variant?.title ? <p className="text-grey">{item.variant.title}</p> : null}

          <div className="flex items-center gap-x-3">
            <div className="flex h-[29px] items-center rounded-full border border-green">
              <button
                disabled={isLoading}
                aria-label="Decrease quantity"
                onClick={() => onDecrease(item.id, item.quantity)}
                className="flex h-[29px] items-center justify-center pr-[7px] pl-[11px] disabled:opacity-50"
              >
                −
              </button>
              <div className="w-4 text-center">{item.quantity}</div>
              <button
                disabled={isLoading}
                aria-label="Increase quantity"
                onClick={() => onIncrease(item.id, item.quantity)}
                className="flex h-[29px] items-center justify-center pr-[11px] pl-[7px] disabled:opacity-50"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="text-right whitespace-nowrap">
              {formatCurrency(parseFloat(item.variant?.priceV2.amount ?? '0') * item.quantity)}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
