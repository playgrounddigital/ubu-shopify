import { DatoCMSShopifyCollection } from '~/types/cms/models/collection'

export interface ShopNavigationMenu {
  id: string
  title: string
  menuLists: MenuList[]
  featuredTitle: string
  image: {
    url: string
  }
  collectionLink: DatoCMSShopifyCollection
  isLarge: boolean
}

export interface MenuList {
  id: string
  title: string
  collections: {
    id: string
    title: string
    collection: DatoCMSShopifyCollection
  }[]
}
