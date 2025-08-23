'use client'
import cx from 'classnames'
import { FC, useMemo } from 'react'
import Button from '~/components/Layout/Button'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { useCart } from '~/context/CartContext'
import FooterJSON from '~/public/footer.json'
import ChevronLeftIcon from '~/public/img/icons/chevron-left.svg'
import TruckIcon from '~/public/img/icons/truck.svg'
import CartItem from './CartItem'

const FREE_SHIPPING_LIMIT = 99

const Cart: FC = () => {
  const { cart, isCartOpen, closeCart, updateCartItemQuantity, isLoading, checkoutUrl } = useCart()

  const { subtotal, remaining, percent } = useMemo(() => {
    const subtotalValue = (cart?.lineItems ?? []).reduce((sum, li) => {
      const price = parseFloat(li.variant?.priceV2.amount ?? '0')
      return sum + price * li.quantity
    }, 0)
    const remainingValue = Math.max(0, FREE_SHIPPING_LIMIT - subtotalValue)
    const percentValue = Math.min(100, (subtotalValue / FREE_SHIPPING_LIMIT) * 100)
    return { subtotal: subtotalValue, remaining: remainingValue, percent: percentValue }
  }, [cart])

  const handleDelete = (id: string) => {
    updateCartItemQuantity({ id, quantity: 0 })
  }

  const handleIncrease = (id: string, quantity: number) => {
    const item = cart?.lineItems.find((li) => li.id === id)
    const maxQty = item?.variant?.quantityAvailable ?? Infinity
    if (quantity < maxQty) {
      updateCartItemQuantity({ id, quantity: quantity + 1 })
    }
  }

  const handleDecrease = (id: string, quantity: number) => {
    updateCartItemQuantity({ id, quantity: quantity - 1 })
  }

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`

  const goToCheckout = () => {
    if (!checkoutUrl) return
    window.location.href = checkoutUrl
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cx('fixed inset-0 z-60 bg-black/60 transition-opacity', {
          'pointer-events-none opacity-0': !isCartOpen,
        })}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isCartOpen}
        className={cx(
          'fixed top-0 right-0 z-70 h-full w-full max-w-[471px] transform bg-white shadow-xl transition-transform',
          {
            'translate-x-full': !isCartOpen,
          }
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-x-5 px-10 py-7">
            <button
              onClick={closeCart}
              aria-label="Close cart"
            >
              <ChevronLeftIcon className="h-[17px] w-[9px]" />
            </button>
            <div className="inline-flex gap-x-2">
              <h2 className="text-[44px] leading-10 font-semibold -tracking-[2.64px]">Cart</h2>
              {/* Number of items */}
              {cart?.lineItems.length > 0 && (
                <div className="inline-flex size-[23px] items-center justify-center rounded-full bg-black text-center">
                  <span className="text-[13px] leading-[23px] font-medium text-white">{cart?.lineItems.length}</span>
                </div>
              )}
            </div>
          </div>

          {/* Free shipping notice */}
          <div className="mb-12 px-10">
            <div className="mb-3 flex items-center gap-x-3 text-sm">
              <TruckIcon className="h-[15px] w-[17px]" />
              <p>
                {remaining > 0 ? `${formatCurrency(remaining)} away from free shipping!` : 'You have free shipping!'}
              </p>
            </div>
            <div className="h-2 w-full rounded-full bg-black/10">
              <div
                className="h-2 rounded-full bg-lime-400"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Line items */}
          <div className="flex-1 overflow-y-auto px-10">
            {!cart || cart.lineItems.length === 0 ? (
              <div className="py-20 text-center text-lg">Your cart is empty.</div>
            ) : (
              <ul className="space-y-6">
                {cart.lineItems.map((li) => (
                  <CartItem
                    key={li.id}
                    item={li}
                    isLoading={isLoading}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onDelete={handleDelete}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Gift wrapping bar */}
          {/* <div className="mt-10 flex h-10 items-center justify-between bg-pink px-10 text-sm text-black">
            <div className="flex items-center gap-x-3">
              <PresentIcon className="size-[15px]" />
              <span>Add gift wrapping</span>
            </div>
            <button aria-label="Add gift wrapping">
              <PlusIcon className={iconStyles[12]} />
            </button>
          </div> */}

          {/* Footer / Total */}
          <div className="px-10 pt-4 pb-[38px]">
            <div className="mb-7 inline-flex items-center justify-between gap-x-6">
              <div className="body-large">
                <span>Total: {formatCurrency(subtotal)}</span>
              </div>

              <Button
                onClick={goToCheckout}
                disabled={!checkoutUrl || isLoading || !cart || cart.lineItems.length === 0}
              >
                CHECKOUT
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {FooterJSON.acceptedPaymentMethods.map((item) => (
                // eslint-disable-next-line @next/next/no-img-element
                <OptimisedImage
                  key={item.id}
                  src={item.image.url}
                  alt={item.name}
                  className="h-6 w-[34px]"
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Cart
