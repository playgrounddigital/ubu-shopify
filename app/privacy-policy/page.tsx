import { notFound } from 'next/navigation'
import PrivacyPolicyPage from '~/app/privacy-policy/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { PageProps, _generateMetadata } from '~/helpers/next'
import { PrivacyPolicyPageContent } from '~/types/cms/pages/privacy-policy'
import { GraphQlQueryEnum } from '~/types/graphql'

export const dynamicParams = true
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps) => {
  const privacyPolicyPageQuery = getGraphQLQuery(GraphQlQueryEnum.PrivacyPolicyPage)
  const { privacyPolicyPage }: { privacyPolicyPage: PrivacyPolicyPageContent } =
    await fetchFromDatoAPI(privacyPolicyPageQuery)

  if (!privacyPolicyPage) {
    return notFound()
  }

  return await _generateMetadata(await params, {
    title: privacyPolicyPage.title,
  })
}

// export const generateStaticParams = async () => {
//   return [{ slug: SitePages.PrivacyPolicy }]
// }

export default async () => {
  const privacyPolicyPageQuery = getGraphQLQuery(GraphQlQueryEnum.PrivacyPolicyPage)
  const { privacyPolicyPage }: { privacyPolicyPage: PrivacyPolicyPageContent } =
    await fetchFromDatoAPI(privacyPolicyPageQuery)

  if (!privacyPolicyPage) {
    return notFound()
  }

  return <PrivacyPolicyPage content={privacyPolicyPage} />
}
