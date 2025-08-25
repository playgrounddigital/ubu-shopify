import { notFound } from 'next/navigation'
import CollectionTemplatePage from '~/app/collections/[handle]/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts } from '~/lib/shopify'
import { ShopContent } from '~/types/cms/pages/shop'
import { GraphQlQueryEnum } from '~/types/graphql'

// Fetch dynamic routes not pre-rendered
export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const shopPageQuery = getGraphQLQuery(GraphQlQueryEnum.ShopPage)
  const { shopPage }: { shopPage: ShopContent } = await fetchFromDatoAPI(shopPageQuery)

  if (!shopPage) {
    return notFound()
  }

  return await _generateMetadata(await params, {
    title: shopPage.title,
    description: shopPage.description,
    image: shopPage.image.url,
  })
}

// export const generateStaticParams = async () => {
//   const featureQuery = getGraphQLQuery(GraphQlQueryEnum.AllFeatureSlugs)
//   const { allFeatures }: { allFeatures: Feature[] } = await fetchFromDatoAPI(featureQuery)

//   const handles = allFeatures.map((feature) => ({
//     handle: feature.handle,
//   }))

//   return handles
// }

export default async ({ params }: PageProps) => {
  const shopPageQuery = getGraphQLQuery(GraphQlQueryEnum.ShopPage)
  const { shopPage }: { shopPage: ShopContent } = await fetchFromDatoAPI(shopPageQuery)

  if (!shopPage) {
    return notFound()
  }

  const products = await getAllProducts()

  return (
    <CollectionTemplatePage
      title="Shop"
      collection={shopPage}
      productsForCollection={products}
      products={products}
    />
  )
}
