import { StructuredTextGraphQlResponse } from 'react-datocms/structured-text'
import { Image } from '~/types/cms/common'

export interface PrivacyPolicyPageContent {
  title: string
  image: Image
  content: StructuredTextGraphQlResponse
}
