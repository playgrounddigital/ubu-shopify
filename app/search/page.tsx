import { notFound } from 'next/navigation'
import SearchPage from '~/app/search/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { getAllProducts } from '~/lib/shopify'
import { SearchContent } from '~/types/cms/pages/search'
import { GraphQlQueryEnum } from '~/types/graphql'

// Fetch dynamic routes not pre-rendered
export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const searchPageQuery = getGraphQLQuery(GraphQlQueryEnum.SearchPage)
  const { searchPage }: { searchPage: SearchContent } = await fetchFromDatoAPI(searchPageQuery)

  if (!searchPage) {
    return notFound()
  }

  return await _generateMetadata(await params, {
    title: searchPage.title,
    image: searchPage.image.url,
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
  const searchPageQuery = getGraphQLQuery(GraphQlQueryEnum.SearchPage)
  const { searchPage }: { searchPage: SearchContent } = await fetchFromDatoAPI(searchPageQuery)

  if (!searchPage) {
    return notFound()
  }

  const products = await getAllProducts()

  return (
    <SearchPage
      title={searchPage.title}
      collection={searchPage}
      products={products}
    />
  )
}
