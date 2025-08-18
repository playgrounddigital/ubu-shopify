import { notFound } from 'next/navigation'
import CollectionTemplatePage from '~/app/collections/[slug]/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts, getProductsByCollectionHandle } from '~/lib/shopify'
import { DatoCMSCollection } from '~/types/cms/models/collection'
import { GraphQlQueryEnum } from '~/types/graphql'

// Fetch dynamic routes not pre-rendered
export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params

  const collectionQuery = getGraphQLQuery(GraphQlQueryEnum.AllCollections)
  const { allCollections }: { allCollections: DatoCMSCollection[] } = await fetchFromDatoAPI(collectionQuery)

  if (!allCollections) {
    return notFound()
  }

  const collection = allCollections.find((collection) => collection.shopifyCollection.handle === slug)
  if (!collection) {
    return notFound()
  }

  return await _generateMetadata(await params, {
    title: collection.shopifyCollection.title,
    description: collection.description,
    image: collection.image.url,
  })
}

// export const generateStaticParams = async () => {
//   const featureQuery = getGraphQLQuery(GraphQlQueryEnum.AllFeatureSlugs)
//   const { allFeatures }: { allFeatures: Feature[] } = await fetchFromDatoAPI(featureQuery)

//   const slugs = allFeatures.map((feature) => ({
//     slug: feature.slug,
//   }))

//   return slugs
// }

export default async ({ params }: PageProps) => {
  const { slug } = await params

  const collectionQuery = getGraphQLQuery(GraphQlQueryEnum.AllCollections)
  const { allCollections }: { allCollections: DatoCMSCollection[] } = await fetchFromDatoAPI(collectionQuery)

  if (!allCollections) {
    return notFound()
  }

  const collection = allCollections.find((collection) => collection.shopifyCollection.handle === slug)

  if (!collection) {
    return notFound()
  }

  const products = await getAllProducts()
  const productsForCollection = await getProductsByCollectionHandle(collection.shopifyCollection.handle)

  return (
    <CollectionTemplatePage
      collection={collection}
      products={products}
      productsForCollection={productsForCollection}
    />
  )
}
