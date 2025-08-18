import ForgotPasswordPage from '~/app/(auth)/forgot-password/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { GraphQlQueryEnum } from '~/types/graphql'
import { SitePages } from '~/types/pages'

export const generateMetadata = async ({ params }: PageProps) => {
  return await _generateMetadata(await params, {
    title: 'Forgot password',
  })
}

export const generateStaticParams = async () => {
  return [{ slug: SitePages.ForgotPassword }]
}

export default async () => {
  const signInPageQuery = getGraphQLQuery(GraphQlQueryEnum.SignInPage)
  const { signInPage }: { signInPage: SignInContent } = await fetchFromDatoAPI(signInPageQuery)

  return <ForgotPasswordPage content={signInPage} />
}
