import { Image } from '~/types/cms/common'
import { DatoCMSShopifyCollection } from '~/types/cms/models/collection'

export interface Footer {
  id: string
  signUpText: string
  socialLinks: SocialLink[]
  acceptedPaymentMethods: AcceptedPaymentMethod[]
  links: {
    id: string
    collection: DatoCMSShopifyCollection
  }[]
}

interface SocialLink {
  id: string
  image: Image
  name: string
  link: string
}

interface AcceptedPaymentMethod {
  id: string
  image: Image
  name: string
}
