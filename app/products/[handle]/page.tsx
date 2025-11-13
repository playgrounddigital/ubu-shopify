import { notFound } from 'next/navigation'
import ProductPageContent from '~/app/products/[handle]/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts, getProductByHandle } from '~/lib/shopify'
import { FreeShippingBanner } from '~/types/cms/models/free-shipping-banner'
import { DatoCMSProductModel } from '~/types/cms/models/product-content'
import { ProductPageTemplate } from '~/types/cms/models/product-page-template'
import { GraphQlQueryEnum } from '~/types/graphql'
import { Product } from '~/types/shopify'

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
  const freeShippingBannerQuery = getGraphQLQuery(GraphQlQueryEnum.FreeShippingBanner)
  const allProductsQuery = getGraphQLQuery(GraphQlQueryEnum.AllProducts)

  const [{ productPageTemplate }, { freeShippingBanner }, products, { allProducts }]: [
    { productPageTemplate: ProductPageTemplate },
    { freeShippingBanner: FreeShippingBanner },
    products: Product[],
    { allProducts: DatoCMSProductModel[] },
  ] = await Promise.all([
    fetchFromDatoAPI(productPageTemplateQuery),
    fetchFromDatoAPI(freeShippingBannerQuery),
    getAllProducts(),
    fetchFromDatoAPI(allProductsQuery),
  ])

  const productContent = allProducts.find((datoProduct) => datoProduct.shopifyProduct.id === product.id)

  return (
    <ProductPageContent
      productContent={productContent}
      product={product}
      products={products}
      freeShippingBanner={freeShippingBanner}
      content={productPageTemplate.content}
    />
  )
}
