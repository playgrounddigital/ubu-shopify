export interface Image {
  url: string
  smartTags: string[]
}

export interface DatoCMSMetadata {
  favicon: {
    url: string
  }
  globalSeo: {
    siteName: string
    titleSuffix: string
    fallbackSeo: {
      title: string
      description: string
      image: Image
    }
  }
}

export interface SharePreview {
  title: string
  description: string
}

export interface PageContent {
  sharePreview: SharePreview
}

export interface LinkedButton {
  text: string
  link: {
    path: string
  }
}

