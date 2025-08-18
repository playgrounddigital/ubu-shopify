import { GraphQlQueryEnum } from '~/types/graphql'

const imageQuery = `{
    id
    url
    smartTags
}`

export const GRAPHQL_QUERIES: Record<GraphQlQueryEnum, (slug?: string) => string> = {
  [GraphQlQueryEnum.HomePage]: () => `{
    homePage {
      heroSlides {
        id
        image {
          url
        }
        imageMobile {
          url
        }
        vimeoVideo {
          url
        }
        vimeoVideoMobile {
          url
        }
        useVideo
        description
      }
      
      content {
        __typename 
        ... on ReasonsSectionRecord {
          id
          title
          shouldShowTitle
          reasons {
            id
            image {
              url
            }
            title
          }
        }
        
        ... on FeaturedProductsSectionRecord {
          id
          title
          products {
            product
          }
        }
        
        ... on FullWidthBannerSectionRecord {
          id
          image {
            url
          }
          imageMobile {
            url
          }
          title
          buttonText
          buttonColour
          link
          height
        }
        
        ... on TextMarqueeSectionRecord {
          id
          marqueeText
          textColour
        }
        
        ... on DoubleLinkSectionRecord {
          id
          linkBlocks {
            id
            image {
              url
            }
            lineOne
            lineTwo
            link
          }
        }
        
        ... on IntroSectionRecord {
          id
          description {
            value
            inlineBlocks {
              __typename
              ... on ImageRecord {
                id
                image {
                  url
                }
              }
            }
          }
        }
        
        ... on DoubleLinkImageSectionRecord {
          id
          linkBlock {
            id
            backgroundColour
            lineOne
            lineTwo
            link
            buttonText
          }
        }
        
        ... on FullWidthBannerSectionRecord {
          id
          image {
            url
          }
          imageMobile {
            url
          }
          title
          buttonText
          buttonColour
          link
          height
        }
        
      }
    }
  }`,
}
