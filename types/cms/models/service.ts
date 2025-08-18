import { Image } from '~/types/cms/common'

export interface Service {
  id: string
  title: string
  excerpt: string
  image: Image
  tagline: string
  description: string
  whatWeOffer: {
    description: string
    offerings: {
      id: string
      title: string
      description: string
    }[]
  }
  content: ServiceContent[]

  ctaTitle: string
  ctaDescription: string
  ctaSubheading: string

  slug: string
}

// content {
//   __typename
//   ... on SectionRecord {
//     id
//     title
//     content {
//       value
//     }
//   }
//   ... on DotpointsSectionRecord {
//     id
//     title
//     dotpoints {
//       description
//     }
//   }
// }

export type ServiceContent = SectionRecord | DotpointsSectionRecord

interface SectionRecord {
  __typename: 'SectionRecord'
  id: string
  title: string
  content: {
    value: string
  }
}

interface DotpointsSectionRecord {
  __typename: 'DotpointsSectionRecord'
  id: string
  title: string
  description: string
  dotpoints: {
    id: string
    title: string
    description: string
  }[]
}
