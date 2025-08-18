import ForgotPasswordPage from '~/app/(auth)/forgot-password/content'
import { _generateMetadata, PageProps } from '~/helpers/next'
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
  return <ForgotPasswordPage />
}
