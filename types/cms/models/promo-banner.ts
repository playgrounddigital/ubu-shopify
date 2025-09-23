import { Image } from '~/types/cms/common'

export interface PromoBannerContent {
  id: string
  image: Image
  badgeText: string
  bannerTitle: string
  bannerText: string

  badgeTextSubmitted: string
  bannerTextSubmitted: string
  discountCode: string
  isBannerActive: boolean
}
