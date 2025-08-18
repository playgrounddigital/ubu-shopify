import { StructuredTextGraphQlResponse } from 'react-datocms/structured-text'
import { Image, PageContent } from '~/types/cms/common'

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
  __typename: 'ReasonsSectionRecord'
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
  __typename: 'FeaturedProductsSectionRecord'
  id: string
  title: string
  products: DatoCMSShopifyProduct[]
}

export interface DatoCMSShopifyProduct {
  product: {
    __typename: 'product-variant'
    id: string
    title: string
    sku: string | null
    image: {
      src: string
    }
    productId: string
    imageUrl: string
  }
}

export interface FullWidthBannerSectionRecord {
  __typename: 'FullWidthBannerSectionRecord'
  id: string
  image: Image
  imageMobile: Image
  title: string
  titleColour: 'black' | 'white'
  buttonText: string
  buttonColour: 'pink' | 'yellow' | 'blue' | 'green'
  link: string
  height: 'md' | 'lg'
  shouldAddBorder: boolean
}

export interface TextMarqueeSectionRecord {
  __typename: 'TextMarqueeSectionRecord'
  id: string
  marqueeText: string
  textColour: string
}

export interface DoubleLinkSectionRecord {
  __typename: 'DoubleLinkSectionRecord'
  id: string
  linkBlocks: LinkBlockWithImage[]
}

interface LinkBlockWithImage {
  id: string
  image: Image
  lineOne: string
  lineTwo: string
  link: string
}

export interface IntroSectionRecord {
  __typename: 'IntroSectionRecord'
  id: string
  description: StructuredTextGraphQlResponse
}

export interface DoubleLinkImageSectionRecord {
  __typename: 'DoubleLinkImageSectionRecord'
  id: string
  linkBlock: LinkBlockWithoutImage
  image: Image
  shouldSwapOrder: boolean
}

interface LinkBlockWithoutImage {
  id: string
  lineOne: string
  lineTwo: string
  link: string
  backgroundColour: string
  buttonText: string
}
