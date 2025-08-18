import { Image } from '~/types/cms/common'
import { TextMarqueeSectionRecord } from '~/types/cms/pages/home'

export interface SignInContent {
  image: Image
  title: string
  description: string
  content: TextMarqueeSectionRecord[]
}
