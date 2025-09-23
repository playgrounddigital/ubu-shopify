import { StructuredTextGraphQlResponse } from 'react-datocms/structured-text'
import { Image } from '~/types/cms/common'
import { DatoCMSShopifyProduct } from '~/types/cms/pages/home'

export interface DatoCMSProductModel {
  shopifyProduct: DatoCMSShopifyProduct['product']
  accordions: AccordionRecord[]
  content: [ImageSliderSectionRecord]
}

export interface AccordionRecord {
  id: string
  title: string
  description: StructuredTextGraphQlResponse
}

export interface ImageSliderSectionRecord {
  __typename: 'ImageSliderSectionRecord'
  id: string
  images: Image[]
}
