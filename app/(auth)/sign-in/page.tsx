import SignInPage from '~/app/(auth)/sign-in/content'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { GraphQlQueryEnum } from '~/types/graphql'
import { SitePages } from '~/types/pages'

export const generateMetadata = async ({ params }: PageProps) => {
  const signInPageQuery = getGraphQLQuery(GraphQlQueryEnum.SignInPage)
  const { signInPage }: { signInPage: SignInContent } = await fetchFromDatoAPI(signInPageQuery)

  return await _generateMetadata(await params, {
    title: signInPage.title || 'Sign In',
    description: signInPage.description,
  })
}

export const generateStaticParams = async () => {
  return [{ slug: SitePages.SignIn }]
}

export default async () => {
  const signInPageQuery = getGraphQLQuery(GraphQlQueryEnum.SignInPage)
  const { signInPage }: { signInPage: SignInContent } = await fetchFromDatoAPI(signInPageQuery)

  return <SignInPage content={signInPage} />
}
