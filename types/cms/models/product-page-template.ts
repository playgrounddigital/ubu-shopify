import {
  DoubleLinkImageSectionRecord,
  FeaturedProductsSectionRecord,
  FullWidthBannerSectionRecord,
  ReasonsSectionRecord,
  TextMarqueeSectionRecord,
} from '~/types/cms/pages/home'

export interface ProductPageTemplate {
  content: ProductPageTemplateContent[]
}

type ProductPageTemplateContent =
  | ReasonsSectionRecord
  | FeaturedProductsSectionRecord
  | FullWidthBannerSectionRecord
  | TextMarqueeSectionRecord
  | DoubleLinkImageSectionRecord
