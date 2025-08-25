import AboutPage from '~/app/about/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { getAllProducts } from '~/lib/shopify'
import { AboutContent } from '~/types/cms/pages/about'
import { GraphQlQueryEnum } from '~/types/graphql'

export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const aboutPageQuery = getGraphQLQuery(GraphQlQueryEnum.AboutPage)
  const { aboutPage }: { aboutPage: AboutContent } = await fetchFromDatoAPI(aboutPageQuery)

  return await _generateMetadata(await params, {
    title: aboutPage.sharePreview?.title || 'About',
    description: aboutPage.sharePreview?.description,
  })
}

// export const generateStaticParams = async () => {
//   return [{ slug: SitePages.Home }]
// }

export default async () => {
  const aboutPageQuery = getGraphQLQuery(GraphQlQueryEnum.AboutPage)
  const { aboutPage }: { aboutPage: AboutContent } = await fetchFromDatoAPI(aboutPageQuery)

  const products = await getAllProducts()

  return (
    <AboutPage
      content={aboutPage}
      products={products}
    />
  )
}
