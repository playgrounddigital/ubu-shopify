import { GraphQlQueryEnum } from '~/types/graphql'

const imageQuery = `{
    id
    url
    smartTags
}`

export const GRAPHQL_QUERIES: Record<GraphQlQueryEnum, (slug?: string) => string> = {
  [GraphQlQueryEnum.SiteBanner]: () => `{
    siteBanner {
      id
      bannerText
      isBannerActive
    }
  }`,
  [GraphQlQueryEnum.HomePage]: () => `{
    homePage {
      heroSlides {
        id
        image ${imageQuery}
        imageMobile ${imageQuery}
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
          image ${imageQuery}
          imageMobile ${imageQuery}
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
            image ${imageQuery}
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
                image ${imageQuery}
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
          image ${imageQuery}
          shouldSwapOrder
        }
        
        ... on FullWidthBannerSectionRecord {
          id
          image ${imageQuery}
          imageMobile ${imageQuery}
          title
          buttonText
          buttonColour
          link
          height
          shouldAddBorder
        }
        
      }
    }
  }`,
}
