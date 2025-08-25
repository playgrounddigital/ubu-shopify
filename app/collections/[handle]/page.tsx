import { notFound } from 'next/navigation'
import CollectionTemplatePage from '~/app/collections/[handle]/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts, getCollectionByHandle, getProductsByCollectionHandle } from '~/lib/shopify'
import { DatoCMSCollectionModel } from '~/types/cms/models/collection'
import { GraphQlQueryEnum } from '~/types/graphql'

// Fetch dynamic routes not pre-rendered
export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const { handle } = await params

  const collectionQuery = getGraphQLQuery(GraphQlQueryEnum.AllCollections)
  const { allCollections }: { allCollections: DatoCMSCollectionModel[] } = await fetchFromDatoAPI(collectionQuery)

  const collection = allCollections?.find((collection) => collection.shopifyCollection.handle === handle)

  // Fetch the collection from Shopify. If it doesn't exist, return 404.
  const shopifyCollection = await getCollectionByHandle(handle)
  if (!shopifyCollection) {
    return notFound()
  }

  return await _generateMetadata(await params, {
    title: collection?.shopifyCollection.title || shopifyCollection?.title,
    description: collection?.description || shopifyCollection?.description,
    image: collection?.image.url || shopifyCollection?.image?.url,
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
  const { handle } = await params

  const collectionQuery = getGraphQLQuery(GraphQlQueryEnum.AllCollections)
  const { allCollections }: { allCollections: DatoCMSCollectionModel[] } = await fetchFromDatoAPI(collectionQuery)

  const collection = allCollections?.find((collection) => collection.shopifyCollection.handle === handle)

  const products = await getAllProducts()
  const productsForCollection = await getProductsByCollectionHandle(handle)

  // Fetch the collection from Shopify. If it doesn't exist, return 404.
  const shopifyCollection = await getCollectionByHandle(handle)
  if (!shopifyCollection) {
    return notFound()
  }

  return (
    <CollectionTemplatePage
      title={shopifyCollection?.title || ''}
      collection={collection}
      products={products}
      productsForCollection={productsForCollection}
    />
  )
}
