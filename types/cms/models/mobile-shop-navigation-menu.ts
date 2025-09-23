import { DatoCMSShopifyCollection } from '~/types/cms/models/collection'

export interface MobileShopNavigationMenu {
  id: string
  title: string
  featuredTitle: string
  image: {
    url: string
  }
  collectionLink: DatoCMSShopifyCollection
}
