import ContactPage from '~/app/contact/content'
import { _generateMetadata, PageProps } from '~/helpers/next'

export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  // const aboutPageQuery = getGraphQLQuery(GraphQlQueryEnum.AboutPage)
  // const { aboutPage }: { aboutPage: AboutContent } = await fetchFromDatoAPI(aboutPageQuery)

  return await _generateMetadata(await params, {
    // title: aboutPage.sharePreview?.title || 'About',
    title: 'Contact',
    // description: aboutPage.sharePreview?.description,
  })
}

// export const generateStaticParams = async () => {
//   return [{ slug: SitePages.Home }]
// }

export default async () => {
  // const aboutPageQuery = getGraphQLQuery(GraphQlQueryEnum.AboutPage)
  // const { aboutPage }: { aboutPage: AboutContent } = await fetchFromDatoAPI(aboutPageQuery)

  // const products = await getAllProducts()

  return <ContactPage />
}
