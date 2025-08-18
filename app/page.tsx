import HomePage from '~/app/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { HomeContent } from '~/types/cms/pages/home'
import { GraphQlQueryEnum } from '~/types/graphql'
import { SitePages } from '~/types/pages'

export const generateMetadata = async ({ params }: PageProps) => {
  const homePageQuery = getGraphQLQuery(GraphQlQueryEnum.HomePage)
  const { homePage }: { homePage: HomeContent } = await fetchFromDatoAPI(homePageQuery)

  return await _generateMetadata(await params, {
    title: homePage.sharePreview?.title || 'Home',
    description: homePage.sharePreview?.description,
  })
}

export const generateStaticParams = async () => {
  return [{ slug: SitePages.Home }]
}

export default async () => {
  const homePageQuery = getGraphQLQuery(GraphQlQueryEnum.HomePage)
  const { homePage }: { homePage: HomeContent } = await fetchFromDatoAPI(homePageQuery)

  return <HomePage content={homePage} />
}
