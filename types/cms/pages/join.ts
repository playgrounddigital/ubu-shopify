import { Image } from '~/types/cms/common'

export interface JoinPageContent {
  title: string
  subheading: string
  description: string
  s1Title: string
  s1Dotpoints: {
    id: string
    description: string
  }[]

  s2Title: string
  s2Dotpoints: {
    id: string
    description: string
  }[]

  s3Image: Image
  s3Title: string
  s3Description: string

  contactButtonText: string
}
