import { GraphQLClient, gql } from 'graphql-request'

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
  // Expose a few variant ids to allow add-to-cart/checkouts
  variantIds?: string[]
}

export type CheckoutLineItem = {
  id: string
  quantity: number
  title: string
  variant?: {
    id: string
    title: string
    priceV2: Money
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

export type CheckoutLineItemUpdateInput = {
  id: string
  quantity: number
}

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
	variants(first: 10) {
		edges { node { id } }
	}
`

const CHECKOUT_SELECTION = `
	id
	webUrl
	lineItems(first: 250) {
		edges {
			node {
				id
				quantity
				title
				variant { id title priceV2 { amount currencyCode } }
			}
		}
	}
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

const CHECKOUT_CREATE_MUTATION = gql`
	mutation CreateCheckout($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			checkout { ${CHECKOUT_SELECTION} }
			userErrors { field message }
		}
	}
`

const CHECKOUT_LINES_ADD_MUTATION = gql`
	mutation AddLines($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
		checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
			checkout { ${CHECKOUT_SELECTION} }
			userErrors { field message }
		}
	}
`

const CHECKOUT_LINES_UPDATE_MUTATION = gql`
	mutation UpdateLines($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
		checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
			checkout { ${CHECKOUT_SELECTION} }
			userErrors { field message }
		}
	}
`

// ===== Helpers =====
function mapProduct(node: any): Product {
  const images: Image[] = (node.images?.edges ?? []).map((e: any) => e.node)
  const variantIds: string[] = (node.variants?.edges ?? []).map((e: any) => e.node.id)
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    priceRange: node.priceRange,
    images,
    variantIds,
  }
}

function mapCheckout(payload: any): Checkout {
  const items: CheckoutLineItem[] = (payload.lineItems?.edges ?? []).map((e: any) => e.node)
  return {
    id: payload.id,
    webUrl: payload.webUrl,
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

export async function createCheckout(lineItems: CheckoutLineItemAddInput[] = []): Promise<Checkout> {
  const variables = { input: { lineItems } }
  const data = await client.request<{
    checkoutCreate: { checkout: any; userErrors: { field: string[] | null; message: string }[] }
  }>(CHECKOUT_CREATE_MUTATION, variables)
  const { checkout, userErrors } = data.checkoutCreate
  if (userErrors && userErrors.length) throw new Error(userErrors.map((e) => e.message).join(', '))
  return mapCheckout(checkout)
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
    const addRes = await client.request<{
      checkoutLineItemsAdd: { checkout: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CHECKOUT_LINES_ADD_MUTATION, { checkoutId, lineItems: add })
    if (addRes.checkoutLineItemsAdd.userErrors?.length) {
      throw new Error(addRes.checkoutLineItemsAdd.userErrors.map((e) => e.message).join(', '))
    }
    const updRes = await client.request<{
      checkoutLineItemsUpdate: { checkout: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CHECKOUT_LINES_UPDATE_MUTATION, { checkoutId, lineItems: update })
    if (updRes.checkoutLineItemsUpdate.userErrors?.length) {
      throw new Error(updRes.checkoutLineItemsUpdate.userErrors.map((e) => e.message).join(', '))
    }
    return mapCheckout(updRes.checkoutLineItemsUpdate.checkout)
  }

  if (add && add.length) {
    const res = await client.request<{
      checkoutLineItemsAdd: { checkout: any; userErrors: { field: string[] | null; message: string }[] }
    }>(CHECKOUT_LINES_ADD_MUTATION, { checkoutId, lineItems: add })
    if (res.checkoutLineItemsAdd.userErrors?.length) {
      throw new Error(res.checkoutLineItemsAdd.userErrors.map((e) => e.message).join(', '))
    }
    return mapCheckout(res.checkoutLineItemsAdd.checkout)
  }

  // update only
  const res = await client.request<{
    checkoutLineItemsUpdate: { checkout: any; userErrors: { field: string[] | null; message: string }[] }
  }>(CHECKOUT_LINES_UPDATE_MUTATION, { checkoutId, lineItems: update })
  if (res.checkoutLineItemsUpdate.userErrors?.length) {
    throw new Error(res.checkoutLineItemsUpdate.userErrors.map((e) => e.message).join(', '))
  }
  return mapCheckout(res.checkoutLineItemsUpdate.checkout)
}
