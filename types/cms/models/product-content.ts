import { Image } from '~/types/cms/common'
import { DatoCMSShopifyProduct } from '~/types/cms/pages/home'

export interface DatoCMSProductModel {
  shopifyProduct: DatoCMSShopifyProduct['product']
  content: [ImageSliderSectionRecord]
}

export interface ImageSliderSectionRecord {
  __typename: 'ImageSliderSectionRecord'
  id: string
  images: Image[]
}
