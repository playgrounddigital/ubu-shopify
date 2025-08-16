import HomePage from '~/app/content'
import { _generateMetadata, PageProps } from '~/helpers/next'
import { SitePages } from '~/types/pages'

export const generateMetadata = async ({ params }: PageProps) => {
  return await _generateMetadata(await params, {
    title: 'Home',
  })
}

export const generateStaticParams = async () => {
  return [{ slug: SitePages.Home }]
}

export default async () => {
  return <HomePage />
}
