import { GraphQLClient, gql } from 'graphql-request'
import {
  Checkout,
  CheckoutLineItem,
  CheckoutLineItemAddInput,
  CheckoutLineItemUpdateInput,
  Collection,
  Customer,
  CustomerAccessToken,
  CustomerWithOrders,
  Image,
  Order,
  Product,
  ProductVariant,
} from '~/types/shopify'

// Environment
const SHOPIFY_DOMAIN = process.env.NEXT_PRIVATE_SHOPIFY_DOMAIN
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PRIVATE_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN

// Use the latest stable Storefront API version available
const API_VERSION = '2025-07'

if (!SHOPIFY_DOMAIN) throw new Error('Missing env: NEXT_PRIVATE_SHOPIFY_DOMAIN')
if (!SHOPIFY_STOREFRONT_TOKEN) throw new Error('Missing env: NEXT_PRIVATE_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN')

const client = new GraphQLClient(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    'Content-Type': 'application/json',
  },
})

// ===== Selections =====
const PRODUCT_SELECTION = `
	id
	title
	handle
	description
	priceRange {
		minVariantPrice { amount currencyCode }
		maxVariantPrice { amount currencyCode }
	}
	images(first: 10) {
		edges { node { id url altText } }
	}
	variants(first: 250) {
		edges {
			node {
				id
				title
				sku
				availableForSale
				quantityAvailable
				priceV2: price { amount currencyCode }
				compareAtPriceV2: compareAtPrice { amount currencyCode }
				image { id url altText }
			}
		}
	}
`

const CART_SELECTION = `
	id
	checkoutUrl
	lines(first: 250) {
		edges {
			node {
				id
				quantity
				merchandise {
					__typename
					... on ProductVariant {
						id
						title
						quantityAvailable
						priceV2: price { amount currencyCode }
						image { id url altText }
						product { title }
					}
				}
			}
		}
	}
`

// ===== Customer selections =====
const CUSTOMER_CORE_SELECTION = `
	id
	email
	firstName
	lastName
`

const ORDER_SELECTION = `
	id
	orderNumber
	processedAt
	statusUrl
	totalPriceV2 { amount currencyCode }
`

// ===== Queries & Mutations =====
const COLLECTIONS_QUERY = gql`
  query Collections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          handle
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const PRODUCTS_QUERY = gql`
	query Products($first: Int!, $after: String) {
		products(first: $first, after: $after) {
			edges { cursor node { ${PRODUCT_SELECTION} } }
			pageInfo { hasNextPage endCursor }
		}
	}
`

const COLLECTION_PRODUCTS_QUERY = gql`
	query CollectionProducts($handle: String!, $first: Int!, $after: String) {
		collection(handle: $handle) {
			id
			title
			handle
			products(first: $first, after: $after) {
				edges { cursor node { ${PRODUCT_SELECTION} } }
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`

const PRODUCT_BY_HANDLE_QUERY = gql`
	query ProductByHandle($handle: String!) {
		productByHandle(handle: $handle) { ${PRODUCT_SELECTION} }
	}
`

const COLLECTION_SELECTION = `
	id
	title
	handle
	description
	image { id url altText }
`

const COLLECTION_BY_HANDLE_QUERY = gql`
	query CollectionByHandle($handle: String!) {
		collectionByHandle(handle: $handle) { ${COLLECTION_SELECTION} }
	}
`

const CART_CREATE_MUTATION = gql`
	mutation CartCreate($input: CartInput) {
		cartCreate(input: $input) {
			cart { ${CART_SELECTION} }
			userErrors { field message }
		}
	}
`

const CART_LINES_ADD_MUTATION = gql`
	mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart { ${CART_SELECTION} }
			userErrors { field message }
		}
	}
`

const CART_LINES_UPDATE_MUTATION = gql`
	mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
			cart { ${CART_SELECTION} }
			userErrors { field message }
		}
	}
`

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = gql`
  mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`

const CUSTOMER_CREATE_MUTATION = gql`
  mutation CustomerCreate($email: String!, $password: String!, $firstName: String, $lastName: String) {
    customerCreate(input: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }) {
      customer {
        id
      }
      userErrors: customerUserErrors {
        field
        message
      }
    }
  }
`

const CUSTOMER_WITH_ORDERS_QUERY = gql`
  query CustomerWithOrders($accessToken: String!, $first: Int!) {
    customer(customerAccessToken: $accessToken) {
      ${CUSTOMER_CORE_SELECTION}
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges { node { ${ORDER_SELECTION} } }
      }
    }
  }
`

const CUSTOMER_RECOVER_MUTATION = gql`
  mutation CustomerRecover($email: String!) {
    customerRecover(email: $email) {
      userErrors: customerUserErrors {
        field
        message
      }
    }
  }
`

const CUSTOMER_RESET_BY_URL_MUTATION = gql`
  mutation CustomerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors: customerUserErrors {
        field
        message
      }
    }
  }
`

// ===== Helpers =====
function mapProduct(node: any): Product {
  const images: Image[] = (node.images?.edges ?? []).map((e: any) => e.node)
  const variants: ProductVariant[] = (node.variants?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    sku: e.node.sku ?? null,
    availableForSale: Boolean(e.node.availableForSale),
    quantityAvailable: e.node.quantityAvailable ?? null,
    priceV2: e.node.priceV2,
    compareAtPriceV2: e.node.compareAtPriceV2 ?? null,
    image: e.node.image ?? null,
  }))
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    priceRange: node.priceRange,
    images,
    variants,
  }
}

function mapCheckout(payload: any): Checkout {
  // Map Cart payload to our internal Checkout shape
  const items: CheckoutLineItem[] = (payload.lines?.edges ?? []).map((e: any) => {
    const node = e.node
    const merchandise = node.merchandise
    const productTitle = merchandise?.product?.title ?? ''
    const variant = merchandise
      ? {
          id: merchandise.id,
          title: merchandise.title,
          quantityAvailable: merchandise.quantityAvailable ?? null,
          priceV2: merchandise.priceV2,
          image: merchandise.image || null,
        }
      : null
    return {
      id: node.id,
      quantity: node.quantity,
      title: productTitle,
      variant,
    }
  })
  return {
    id: payload.id,
    webUrl: payload.checkoutUrl,
    lineItems: items,
  }
}

// ===== Public API =====
export async function getAllCollections(): Promise<Collection[]> {
  const results: Collection[] = []
  let after: string | null = null
  const pageSize = 250

  while (true) {
    const data = await client.request<{
      collections: {
        edges: { cursor: string; node: Collection }[]
        pageInfo: { hasNextPage: boolean; endCursor: string | null }
      }
    }>(COLLECTIONS_QUERY, { first: pageSize, after })

    for (const edge of data.collections.edges) results.push(edge.node)

    if (data.collections.pageInfo.hasNextPage && data.collections.pageInfo.endCursor) {
      after = data.collections.pageInfo.endCursor
      continue
    }
    break
  }

  return results
}

export async function getAllProducts(): Promise<Product[]> {
  const results: Product[] = []
  let after: string | null = null
  const pageSize = 250

  while (true) {
    const data = await client.request<{
      products: { edges: { cursor: string; node: any }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }
    }>(PRODUCTS_QUERY, { first: pageSize, after })

    for (const edge of data.products.edges) results.push(mapProduct(edge.node))

    if (data.products.pageInfo.hasNextPage && data.products.pageInfo.endCursor) {
      after = data.products.pageInfo.endCursor
      continue
    }
    break
  }

  return results
}

export async function getProductsByCollectionHandle(handle: string): Promise<Product[]> {
  const results: Product[] = []
  let after: string | null = null
  const pageSize = 250

  while (true) {
    const data = await client.request<{
      collection: {
        id: string
        title: string
        handle: string
        products: {
          edges: { cursor: string; node: any }[]
          pageInfo: { hasNextPage: boolean; endCursor: string | null }
        }
      } | null
    }>(COLLECTION_PRODUCTS_QUERY, { handle, first: pageSize, after })

    if (!data.collection) return results

    for (const edge of data.collection.products.edges) results.push(mapProduct(edge.node))

    if (data.collection.products.pageInfo.hasNextPage && data.collection.products.pageInfo.endCursor) {
      after = data.collection.products.pageInfo.endCursor
      continue
    }
    break
  }

  return results
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await client.request<{ productByHandle: any | null }>(PRODUCT_BY_HANDLE_QUERY, { handle })
  if (!data.productByHandle) return null
  return mapProduct(data.productByHandle)
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  const data = await client.request<{ collectionByHandle: any | null }>(COLLECTION_BY_HANDLE_QUERY, { handle })
  if (!data.collectionByHandle) return null
  return data.collectionByHandle
}

export async function createCheckout(lineItems: CheckoutLineItemAddInput[] = []): Promise<Checkout> {
  const lines = (lineItems ?? []).map((li) => ({ merchandiseId: li.variantId, quantity: li.quantity }))
  const variables = { input: lines.length ? { lines } : undefined }
  const data = await client.request<{
    cartCreate: { cart: any; userErrors: { field: string[] | null; message: string }[] }
  }>(CART_CREATE_MUTATION, variables)
  const { cart, userErrors } = data.cartCreate
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))
  return mapCheckout(cart)
}

type UpdateCheckoutArgs = {
  checkoutId: string
  add?: CheckoutLineItemAddInput[]
  update?: CheckoutLineItemUpdateInput[]
}

export async function updateCheckout(args: UpdateCheckoutArgs): Promise<Checkout> {
  const { checkoutId, add, update } = args
  if ((!add || add.length === 0) && (!update || update.length === 0)) {
    throw new Error('updateCheckout requires at least one of: add, update')
  }

  if (add && add.length && update && update.length) {
    // Run add then update sequentially to keep responses and errors simple
    const addLines = add.map((li) => ({ merchandiseId: li.variantId, quantity: li.quantity }))
    const addRes = await client.request<{
      cartLinesAdd: { cart: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CART_LINES_ADD_MUTATION, { cartId: checkoutId, lines: addLines })
    if (addRes.cartLinesAdd.userErrors?.length) {
      throw new Error(addRes.cartLinesAdd.userErrors.map((e) => e.message).join(', '))
    }
    const updateLines = (update ?? []).map((li) => ({ id: li.id, quantity: li.quantity }))
    const updRes = await client.request<{
      cartLinesUpdate: { cart: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CART_LINES_UPDATE_MUTATION, { cartId: checkoutId, lines: updateLines })
    if (updRes.cartLinesUpdate.userErrors?.length) {
      throw new Error(updRes.cartLinesUpdate.userErrors.map((e) => e.message).join(', '))
    }
    return mapCheckout(updRes.cartLinesUpdate.cart)
  }

  if (add && add.length) {
    const lines = add.map((li) => ({ merchandiseId: li.variantId, quantity: li.quantity }))
    const res = await client.request<{
      cartLinesAdd: { cart: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CART_LINES_ADD_MUTATION, { cartId: checkoutId, lines })
    if (res.cartLinesAdd.userErrors?.length) {
      throw new Error(res.cartLinesAdd.userErrors.map((e) => e.message).join(', '))
    }
    return mapCheckout(res.cartLinesAdd.cart)
  }

  // update only
  const updateLines = (update ?? []).map((li) => ({ id: li.id, quantity: li.quantity }))
  const res = await client.request<{
    cartLinesUpdate: { cart: any; userErrors: { field: string[] | null; message: string }[] }
  }>(CART_LINES_UPDATE_MUTATION, { cartId: checkoutId, lines: updateLines })
  if (res.cartLinesUpdate.userErrors?.length) {
    throw new Error(res.cartLinesUpdate.userErrors.map((e) => e.message).join(', '))
  }
  return mapCheckout(res.cartLinesUpdate.cart)
}

// ===== Customer Auth & Orders API =====

export async function signInCustomer(email: string, password: string): Promise<CustomerAccessToken> {
  const data = await client.request<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null
      userErrors: { field: string[] | null; message: string }[]
    }
  }>(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, { email, password })

  const { customerAccessToken, userErrors } = data.customerAccessTokenCreate
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))
  if (!customerAccessToken) throw new Error('Authentication failed')
  return { accessToken: customerAccessToken.accessToken, expiresAt: customerAccessToken.expiresAt }
}

export async function signUpCustomer(params: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}): Promise<CustomerAccessToken> {
  const { email, password, firstName, lastName } = params
  const createRes = await client.request<{
    customerCreate: { customer: { id: string } | null; userErrors: { field: string[] | null; message: string }[] }
  }>(CUSTOMER_CREATE_MUTATION, { email, password, firstName, lastName })

  const { userErrors } = createRes.customerCreate
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))

  // Immediately sign in after creation
  return signInCustomer(email, password)
}

export async function getCustomerWithOrders(accessToken: string, first: number = 20): Promise<CustomerWithOrders> {
  const data = await client.request<{
    customer: {
      id: string
      email: string
      firstName?: string | null
      lastName?: string | null
      orders: { edges: { node: any }[] }
    } | null
  }>(CUSTOMER_WITH_ORDERS_QUERY, { accessToken, first })

  if (!data.customer) throw new Error('Invalid or expired session')

  const customer: Customer = {
    id: data.customer.id,
    email: data.customer.email,
    firstName: data.customer.firstName ?? null,
    lastName: data.customer.lastName ?? null,
  }

  const orders: Order[] = (data.customer.orders?.edges ?? []).map((e) => ({
    id: e.node.id,
    orderNumber: e.node.orderNumber,
    processedAt: e.node.processedAt,
    totalPrice: e.node.totalPriceV2,
    statusUrl: e.node.statusUrl ?? null,
  }))

  return { ...customer, orders }
}

export async function recoverCustomerPassword(email: string): Promise<void> {
  const data = await client.request<{
    customerRecover: { userErrors: { field: string[] | null; message: string }[] }
  }>(CUSTOMER_RECOVER_MUTATION, { email })

  const { userErrors } = data.customerRecover
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))
}

export async function resetCustomerPasswordByUrl(resetUrl: string, password: string): Promise<CustomerAccessToken> {
  const data = await client.request<{
    customerResetByUrl: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null
      userErrors: { field: string[] | null; message: string }[]
    }
  }>(CUSTOMER_RESET_BY_URL_MUTATION, { resetUrl, password })

  const { customerAccessToken, userErrors } = data.customerResetByUrl
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))
  if (!customerAccessToken) throw new Error('Unable to reset password. The link may be invalid or expired.')
  return { accessToken: customerAccessToken.accessToken, expiresAt: customerAccessToken.expiresAt }
}
