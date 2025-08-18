// {
//   homePage {
//     heroSlides {
//       id
//       image {
//         url
//       }
//       imageMobile {
//         url
//       }
//       vimeoVideo {
//         url
//       }
//       vimeoVideoMobile {
//         url
//       }
//       useVideo
//       description
//     }

import { StructuredTextGraphQlResponse } from 'react-datocms/structured-text'
import { Image, PageContent } from '~/types/cms/common'

//     content {
//       __typename
//       ... on ReasonsSectionRecord {
//         id
//         title
//         shouldShowTitle
//         reasons {
//           id
//           image {
//             url
//           }
//           title
//         }
//       }

//       ... on FeaturedProductsSectionRecord {
//         id
//         title
//         products {
//           product
//         }
//       }

//       ... on FullWidthBannerSectionRecord {
//         id
//         image {
//           url
//         }
//         imageMobile {
//           url
//         }
//         title
//         buttonText
//         buttonColour
//         link
//         height
//       }

//       ... on TextMarqueeSectionRecord {
//         id
//         marqueeText
//         textColour
//       }

//       ... on DoubleLinkSectionRecord {
//         id
//         linkBlocks {
//           id
//           image {
//             url
//           }
//           lineOne
//           lineTwo
//           link
//         }
//       }

//       ... on IntroSectionRecord {
//         id
//         description {
//           value
//           inlineBlocks {
//             __typename
//             ... on ImageRecord {
//               id
//               image {
//                 url
//               }
//             }
//           }
//         }
//       }

//       ... on DoubleLinkImageSectionRecord {
//         id
//         linkBlock {
//           id
//           backgroundColour
//           lineOne
//           lineTwo
//           link
//           buttonText
//         }
//       }

//       ... on FullWidthBannerSectionRecord {
//         id
//         image {
//           url
//         }
//         imageMobile {
//           url
//         }
//         title
//         buttonText
//         buttonColour
//         link
//         height
//       }

//     }
//   }
// }

export interface HomeContent extends PageContent {
  heroSlides: HeroSlide[]
  content: Content[]
}

export interface HeroSlide {
  id: string
  image: Image
  imageMobile: Image
  vimeoVideo: string
  vimeoVideoMobile: string
  useVideo: boolean
  description: string
}

type Content =
  | ReasonsSectionRecord
  | FeaturedProductsSectionRecord
  | FullWidthBannerSectionRecord
  | TextMarqueeSectionRecord
  | DoubleLinkSectionRecord
  | IntroSectionRecord
  | DoubleLinkImageSectionRecord

export interface ReasonsSectionRecord {
  id: string
  title: string
  shouldShowTitle: boolean
  reasons: Reason[]
}

interface Reason {
  id: string
  image: Image
  title: string
}

export interface FeaturedProductsSectionRecord {
  id: string
  title: string
  products: DatoCMSShopifyProduct[]
}

interface DatoCMSShopifyProduct {
  product: {
    __typename: 'product'
    id: string
    title: string
    handle: string
    images: {
      edges: {
        node: {
          src: string
        }
      }[]
    }
    imageUrl: string
  }
}

export interface FullWidthBannerSectionRecord {
  id: string
  image: Image
  imageMobile: Image
  title: string
  buttonText: string
  buttonColour: string
  link: string
  height: string
}

export interface TextMarqueeSectionRecord {
  id: string
  marqueeText: string
  textColour: string
}

export interface DoubleLinkSectionRecord {
  id: string
  linkBlocks: LinkBlock[]
}

interface LinkBlock {
  id: string
  image: Image
  lineOne: string
  lineTwo: string
  link: string
}

export interface IntroSectionRecord {
  id: string
  description: StructuredTextGraphQlResponse
}

export interface DoubleLinkImageSectionRecord {
  id: string
  linkBlock: LinkBlock
}
