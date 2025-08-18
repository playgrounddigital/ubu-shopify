import { notFound } from 'next/navigation'
import ProductPageContent from '~/app/products/[handle]/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts, getProductByHandle } from '~/lib/shopify'
import { ProductPageTemplate } from '~/types/cms/models/product-page-template'
import { GraphQlQueryEnum } from '~/types/graphql'

export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return notFound()

  return await _generateMetadata(await params, {
    title: product.title,
    description: product.description ?? undefined,
    image: product.images?.[0]?.url,
  })
}

export default async ({ params }: PageProps) => {
  const { handle } = await params
  const product = await getProductByHandle(handle)
  if (!product) return notFound()

  const productPageTemplateQuery = getGraphQLQuery(GraphQlQueryEnum.ProductPageTemplate)
  const { productPageTemplate }: { productPageTemplate: ProductPageTemplate } =
    await fetchFromDatoAPI(productPageTemplateQuery)

  const products = await getAllProducts()

  return (
    <ProductPageContent
      product={product}
      products={products}
      content={productPageTemplate.content}
    />
  )
}
