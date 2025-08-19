import { Image as DatoCMSImage } from '~/types/cms/common'
import {
  FeaturedProductsSectionRecord,
  FullWidthBannerSectionRecord,
  ReasonsSectionRecord,
} from '~/types/cms/pages/home'

export interface ShopContent {
  title: string
  backgroundColour: string
  image: DatoCMSImage
  description: string
  content: CollectionContent[]
}

type CollectionContent = ReasonsSectionRecord | FeaturedProductsSectionRecord | FullWidthBannerSectionRecord
