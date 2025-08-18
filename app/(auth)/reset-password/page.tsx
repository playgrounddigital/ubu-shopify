import ResetPasswordPage from '~/app/(auth)/reset-password/content'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { SitePages } from '~/types/pages'

export const generateMetadata = async ({ params }: PageProps) => {
  return await _generateMetadata(await params, {
    title: 'Reset password',
  })
}

export const generateStaticParams = async () => {
  return [{ slug: SitePages.ResetPassword }]
}

export default async () => {
  return <ResetPasswordPage />
}
