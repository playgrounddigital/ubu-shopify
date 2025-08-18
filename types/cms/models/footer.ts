import { Image } from '~/types/cms/common'

export interface Footer {
  id: string
  signUpText: string
  socialLinks: SocialLink[]
  acceptedPaymentMethods: AcceptedPaymentMethod[]
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
