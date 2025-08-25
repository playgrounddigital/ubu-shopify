import { Image, PageContent } from '~/types/cms/common'
import { SectionContent } from '~/types/cms/pages/home'

export interface AboutContent extends PageContent {
  image: Image
  imageMobile: Image
  content: SectionContent[]
}
