import { DatoCMSShopifyProduct } from '~/types/cms/pages/home'

export interface RecommendedCartItemListContent {
  text: string
  products: {
    id: string
    product: DatoCMSShopifyProduct['product']
  }[]
}
