import { Metadata } from 'next'

interface ParamsProps {
  handle?: string // use for slug etc later
  pathname: string
}

export type PageProps = {
  params?: Promise<{
    handle?: string // use for slug etc later
    pathname: string
  }>
}

export interface PageInformation {
  title: string
  description?: string
  image?: string
}

export const _generateMetadata = async (
  params: ParamsProps,
  { title, description, image }: PageInformation
): Promise<Metadata> => {
  // const metadataQuery = getGraphQLQuery(GraphQlQueryEnum.Metadata)
  // const {
  //   _site: cmsMetadata,
  // }: {
  //   _site: DatoCMSMetadata
  // } = await fetchFromDatoAPI(metadataQuery)

  const {
    favicon,
    globalSeo: {
      siteName,
      titleSuffix,
      fallbackSeo: { title: fallbackTitle, image: fallbackImage, description: fallbackDescription },
    },
  } = {
    favicon: {
      url: '',
    },
    globalSeo: {
      siteName: '',
      titleSuffix: '',
      fallbackSeo: {
        title: '',
        image: {
          url: '',
        },
        description: '',
      },
    },
  }

  const _favicon = favicon.url || process.env.siteFavicon

  const _title = `${title || fallbackTitle} ${titleSuffix || process.env.siteTitle}`
  const _image = image || fallbackImage?.url || process.env.siteImagePreviewURL
  const _description = description || fallbackDescription || process.env.siteDescription

  const _siteName = siteName || process.env.siteName
  const siteUrl = process.env.siteUrl
  const metaTitle = _siteName
  const metaDescription = _description
  const publisher = process.env.publisher
  const imagePreview = _image?.includes('https://') ? _image : `${process.env.siteUrl}${_image}`

  // Extend parent metadata
  const currentImage = { url: imagePreview }

  return {
    metadataBase: new URL(siteUrl),
    title: _title,
    description: description || metaDescription,
    openGraph: {
      title: _title,
      type: 'website',
      url: `${siteUrl}${params.pathname}`,
      images: currentImage,
      siteName: siteName,
      description: description,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: description,
      images: image,
    },
    creator: publisher,
    publisher,
    icons: {
      icon: _favicon,
    },
  }
}
