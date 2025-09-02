import { Image as DatoCMSImage } from '~/types/cms/common'
import {
  FeaturedProductsSectionRecord,
  FullWidthBannerSectionRecord,
  ReasonsSectionRecord,
} from '~/types/cms/pages/home'

export interface SearchContent {
  title: string
  backgroundColour: string
  image: DatoCMSImage
  content: CollectionContent[]
}

type CollectionContent = ReasonsSectionRecord | FeaturedProductsSectionRecord | FullWidthBannerSectionRecord
