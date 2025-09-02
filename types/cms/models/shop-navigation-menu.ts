import { Image } from '~/types/cms/common'
import { DatoCMSShopifyCollection } from '~/types/cms/models/collection'

export interface ShopNavigationMenu {
  id: string
  title: string
  menuLists: MenuList[]
  featuredTitle: string
  image: Image
  collectionLink: DatoCMSShopifyCollection
  isLarge: boolean
}

export interface MenuList {
  id: string
  title: string
  collections: DatoCMSShopifyCollection[]
}
