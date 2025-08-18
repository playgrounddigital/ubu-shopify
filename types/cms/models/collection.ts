import { Image as DatoCMSImage } from '~/types/cms/common'
import {
  FeaturedProductsSectionRecord,
  FullWidthBannerSectionRecord,
  ReasonsSectionRecord,
} from '~/types/cms/pages/home'
import { Image } from '~/types/shopify'

export interface DatoCMSCollection {
  shopifyCollection: DatoCMSShopifyCollection
  backgroundColour: string
  image: DatoCMSImage
  description: string
  content: CollectionContent[]
}

type CollectionContent = ReasonsSectionRecord | FeaturedProductsSectionRecord | FullWidthBannerSectionRecord

export interface DatoCMSShopifyCollection {
  __typename: 'collection'
  id: string
  title: string
  handle: string
  image: Image | null
  imageUrl: string
}
