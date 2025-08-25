// ===== Types =====
export type Money = {
  amount: string
  currencyCode: string
}

export type Image = {
  id?: string | null
  url: string
  altText?: string | null
}

export type Collection = {
  id: string
  title: string
  handle: string
  description?: string | null
  image?: Image | null
}

export type Product = {
  id: string
  title: string
  handle: string
  description?: string | null
  priceRange?: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  images: Image[]
  variants: ProductVariant[]
}

export type CheckoutLineItem = {
  id: string
  quantity: number
  title: string
  variant?: {
    id: string
    title: string
    quantityAvailable?: number | null
    priceV2: Money
    image?: Image | null
  } | null
}

export type Checkout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

export type CheckoutLineItemAddInput = {
  variantId: string
  quantity: number
}

export type ProductVariant = {
  id: string
  title: string
  sku?: string | null
  availableForSale: boolean
  quantityAvailable?: number | null
  priceV2: Money
  compareAtPriceV2?: Money | null
  image?: Image | null
}

export type CheckoutLineItemUpdateInput = {
  id: string
  quantity: number
}

// ===== Customer Auth & Orders =====
export type Customer = {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
}

export type Order = {
  id: string
  orderNumber: number
  processedAt: string
  totalPrice: Money
  statusUrl?: string | null
}

export type CustomerWithOrders = Customer & {
  orders: Order[]
}

export type CustomerAccessToken = {
  accessToken: string
  expiresAt: string
}
