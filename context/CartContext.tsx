'use client'
import { FC, ReactNode, createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cart from '~/components/Layout/Nav/Cart'
import { Checkout, CheckoutLineItemAddInput, CheckoutLineItemUpdateInput } from '~/types/shopify'

type CartContextState = {
  cart: Checkout | null
  checkoutUrl: string | null
  isLoading: boolean
  isCartOpen: boolean
  clearCart: () => Promise<void>
  closeCart: () => void
  openCart: () => void
  addToCart: (
    items:
      | (CheckoutLineItemAddInput & {
          productTitle?: string
          variantTitle?: string
          imageUrl?: string
          priceAmount?: string
          currencyCode?: string
          quantityAvailable?: number | null
        })
      | Array<
          CheckoutLineItemAddInput & {
            productTitle?: string
            variantTitle?: string
            imageUrl?: string
            priceAmount?: string
            currencyCode?: string
            quantityAvailable?: number | null
          }
        >
  ) => Promise<void>
  updateCartItemQuantity: (updates: CheckoutLineItemUpdateInput[] | CheckoutLineItemUpdateInput) => Promise<void>
}

const CartContext = createContext<CartContextState>({
  cart: null,
  checkoutUrl: null,
  isLoading: false,
  isCartOpen: false,
  clearCart: async () => {},
  closeCart: () => {},
  openCart: () => {},
  addToCart: async () => {},
  updateCartItemQuantity: async () => {},
})

const CHECKOUT_ID_KEY = 'shopify_checkout_id'
const CHECKOUT_SNAPSHOT_KEY = 'shopify_checkout_snapshot'

// API helper functions
async function createCheckoutAPI(lineItems: CheckoutLineItemAddInput[]): Promise<Checkout> {
  const response = await fetch('/api/checkout/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItems }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create checkout')
  }

  const data = await response.json()
  return data.checkout
}

async function updateCheckoutAPI(args: {
  checkoutId: string
  add?: CheckoutLineItemAddInput[]
  update?: CheckoutLineItemUpdateInput[]
}): Promise<Checkout> {
  const response = await fetch('/api/checkout/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update checkout')
  }

  const data = await response.json()
  return data.checkout
}

interface CartProviderProps {
  children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Checkout | null>(null)
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const mountedRef = useRef(false)

  // Restore from localStorage on mount
  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true
    try {
      const savedId = typeof window !== 'undefined' ? window.localStorage.getItem(CHECKOUT_ID_KEY) : null
      const savedSnapshot = typeof window !== 'undefined' ? window.localStorage.getItem(CHECKOUT_SNAPSHOT_KEY) : null
      if (savedId) setCheckoutId(savedId)
      if (savedSnapshot) {
        try {
          const parsed: Checkout = JSON.parse(savedSnapshot)
          setCart(parsed)
        } catch {}
      }
    } catch {}
  }, [])

  const persist = useCallback((next: Checkout | null, nextId?: string | null) => {
    try {
      if (typeof window === 'undefined') return
      if (next) {
        window.localStorage.setItem(CHECKOUT_SNAPSHOT_KEY, JSON.stringify(next))
      } else {
        window.localStorage.removeItem(CHECKOUT_SNAPSHOT_KEY)
      }
      if (typeof nextId === 'string') {
        setCheckoutId(nextId)
        window.localStorage.setItem(CHECKOUT_ID_KEY, nextId)
      } else if (nextId === null) {
        setCheckoutId(null)
        window.localStorage.removeItem(CHECKOUT_ID_KEY)
      }
    } catch {}
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])
  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const addToCart = useCallback(
    async (
      items:
        | (CheckoutLineItemAddInput & {
            productTitle?: string
            variantTitle?: string
            imageUrl?: string
            priceAmount?: string
            currencyCode?: string
            quantityAvailable?: number | null
          })
        | Array<
            CheckoutLineItemAddInput & {
              productTitle?: string
              variantTitle?: string
              imageUrl?: string
              priceAmount?: string
              currencyCode?: string
              quantityAvailable?: number | null
            }
          >
    ) => {
      const itemsArray = (Array.isArray(items) ? items : [items]).filter((it) => it.quantity > 0)
      if (!itemsArray.length) return

      // Validate inventory limits
      for (const item of itemsArray) {
        const currentCartQuantity = cart?.lineItems.find((li) => li.variant?.id === item.variantId)?.quantity ?? 0
        const totalQuantity = currentCartQuantity + item.quantity

        if (item.quantityAvailable !== null && totalQuantity > item.quantityAvailable) {
          throw new Error(`Not enough inventory. Only ${item.quantityAvailable} available.`)
        }
      }

      // Optimistic update
      const previousCart = cart
      const optimistic: Checkout = previousCart
        ? {
            ...previousCart,
            lineItems: (() => {
              const next = [...(previousCart.lineItems ?? [])]
              for (const it of itemsArray) {
                const variantId = it.variantId
                const existingIndex = next.findIndex((li) => li.variant?.id === variantId)
                if (existingIndex >= 0) {
                  next[existingIndex] = {
                    ...next[existingIndex],
                    quantity: next[existingIndex].quantity + it.quantity,
                  }
                } else {
                  next.push({
                    id: `temp:${variantId}`,
                    quantity: it.quantity,
                    title: it.productTitle ?? '',
                    variant: {
                      id: variantId,
                      title: it.variantTitle ?? '',
                      quantityAvailable: it.quantityAvailable ?? null,
                      priceV2: {
                        amount: it.priceAmount ?? '0',
                        currencyCode: it.currencyCode ?? 'USD',
                      },
                      image: it.imageUrl ? { url: it.imageUrl, altText: it.productTitle ?? null } : null,
                    },
                  })
                }
              }
              return next
            })(),
          }
        : {
            id: 'optimistic',
            webUrl: '',
            lineItems: itemsArray.map((it) => ({
              id: `temp:${it.variantId}`,
              quantity: it.quantity,
              title: it.productTitle ?? '',
              variant: {
                id: it.variantId,
                title: it.variantTitle ?? '',
                quantityAvailable: it.quantityAvailable ?? null,
                priceV2: { amount: it.priceAmount ?? '0', currencyCode: it.currencyCode ?? 'USD' },
                image: it.imageUrl ? { url: it.imageUrl, altText: it.productTitle ?? null } : null,
              },
            })),
          }

      setCart(optimistic)
      setIsCartOpen(true)
      setIsLoading(true)

      try {
        if (!checkoutId) {
          const checkout = await createCheckoutAPI(
            itemsArray.map(({ variantId, quantity }) => ({ variantId, quantity }))
          )
          // Update the checkout object with the image url
          checkout.lineItems.forEach((item) => {
            const originalItem = itemsArray.find((it) => it.variantId === item.variant?.id)
            if (originalItem) {
              item.variant.image = { url: originalItem.imageUrl ?? '', altText: originalItem.productTitle ?? null }
            }
          })
          setCart(checkout)
          persist(checkout, checkout.id)
        } else {
          const checkout = await updateCheckoutAPI({
            checkoutId,
            add: itemsArray.map(({ variantId, quantity }) => ({ variantId, quantity })),
          })
          // Update the checkout object with the image url
          checkout.lineItems.forEach((item) => {
            const originalItem = itemsArray.find((it) => it.variantId === item.variant?.id)
            if (originalItem) {
              item.variant.image = { url: originalItem.imageUrl ?? '', altText: originalItem.productTitle ?? null }
            }
          })
          setCart(checkout)
          persist(checkout)
        }
      } catch (err) {
        // Revert on error
        setCart(previousCart)
      } finally {
        setIsLoading(false)
      }
    },
    [cart, checkoutId, persist]
  )

  const updateCartItemQuantity = useCallback(
    async (updates: CheckoutLineItemUpdateInput[] | CheckoutLineItemUpdateInput) => {
      if (!checkoutId) return
      setIsLoading(true)

      const updatesArray = Array.isArray(updates) ? updates : [updates]

      // Optimistically update the cart
      const previousCart = cart
      const optimistic: Checkout = previousCart
        ? {
            ...previousCart,
            lineItems: (() => {
              const next = [...(previousCart.lineItems ?? [])]
              for (const it of updatesArray) {
                const id = it.id
                const existingIndex = next.findIndex((li) => li.id === id)
                // If quantity is 0, remove the item
                if (it.quantity === 0) {
                  next.splice(existingIndex, 1)
                  continue
                }
                // If quantity is positive, update the item
                if (existingIndex >= 0) {
                  next[existingIndex] = {
                    ...next[existingIndex],
                    quantity: it.quantity,
                  }
                } else {
                  next.push({
                    id,
                    quantity: it.quantity,
                    title: '',
                    variant: {
                      id: '',
                      title: '',
                      quantityAvailable: null,
                      priceV2: { amount: '0', currencyCode: 'AUD' },
                      image: null,
                    },
                  })
                }
              }
              return next
            })(),
          }
        : {
            id: 'optimistic',
            webUrl: '',
            lineItems: [],
          }

      setCart(optimistic)
      setIsLoading(true)

      try {
        const checkout = await updateCheckoutAPI({ checkoutId, update: updatesArray })
        // Update the checkout object with the image url
        checkout.lineItems.forEach((item) => {
          const originalItem = previousCart?.lineItems.find((li) => li.variant?.id === item.variant?.id)
          if (originalItem) {
            item.variant.image = {
              url: originalItem.variant?.image?.url ?? '',
              altText: originalItem.variant?.image?.altText ?? null,
            }
          }
        })
        setCart(checkout)
        persist(checkout)
      } catch (err) {
        // Revert on error
        setCart(previousCart)
      } finally {
        setIsLoading(false)
      }
    },
    [cart, checkoutId, persist]
  )

  const clearCart = useCallback(async () => {
    if (!checkoutId || !cart || !cart.lineItems?.length) {
      setCart(null)
      persist(null, null)
      return
    }
    setIsLoading(true)
    try {
      const zeroUpdates: CheckoutLineItemUpdateInput[] = cart.lineItems.map((li) => ({ id: li.id, quantity: 0 }))
      const checkout = await updateCheckoutAPI({ checkoutId, update: zeroUpdates })
      setCart(checkout)
      // Keep the checkout id for continuity; snapshot may now be empty
      persist(checkout)
    } finally {
      setIsLoading(false)
    }
  }, [checkoutId, cart, persist])

  const checkoutUrl = useMemo(() => cart?.webUrl ?? null, [cart])

  const value = useMemo<CartContextState>(
    () => ({
      cart,
      checkoutUrl,
      isLoading,
      isCartOpen,
      clearCart,
      closeCart,
      openCart,
      addToCart,
      updateCartItemQuantity,
    }),
    [cart, checkoutUrl, isLoading, isCartOpen, clearCart, closeCart, openCart, addToCart, updateCartItemQuantity]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
      <Cart />
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => {
  const context = use(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
