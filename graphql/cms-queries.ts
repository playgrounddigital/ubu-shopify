import { GraphQlQueryEnum } from '~/types/graphql'

const imageQuery = `{
    id
    url
    smartTags
}`

const reasonsSectionQuery = `... on ReasonsSectionRecord {
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
}`

const featuredProductsSectionQuery = `... on FeaturedProductsSectionRecord {
  id
  title
  products {
    product
  }
}`

const fullWidthBannerSectionQuery = `... on FullWidthBannerSectionRecord {
  id
  image ${imageQuery}
  imageMobile ${imageQuery}
  title
  titleColour
  buttonText
  buttonColour
  link
  height
}`

const textMarqueeSectionQuery = `... on TextMarqueeSectionRecord {
  id
  marqueeText
  textColour
}`

const doubleLinkImageSectionQuery = `... on DoubleLinkImageSectionRecord {
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

        ${reasonsSectionQuery}
        ${featuredProductsSectionQuery}
        ${fullWidthBannerSectionQuery}
        ${textMarqueeSectionQuery}
        
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
        
        ${doubleLinkImageSectionQuery}
        
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
  [GraphQlQueryEnum.SignInPage]: () => `{
    signInPage {
      image ${imageQuery}
      title
      description
      content {
        __typename
        ${textMarqueeSectionQuery}
      }
    }
  }`,

  [GraphQlQueryEnum.ProductPageTemplate]: () => `{
    productPageTemplate {
      content {
        __typename
        ${reasonsSectionQuery}
        ${featuredProductsSectionQuery}
        ${fullWidthBannerSectionQuery}
        ${textMarqueeSectionQuery}
        ${doubleLinkImageSectionQuery}
      }
    }
  }`,

  [GraphQlQueryEnum.AllCollections]: () => `{
    allCollections {
      shopifyCollection
      backgroundColour
      image ${imageQuery}
      description
      
      content {
        __typename
        ${reasonsSectionQuery}
        ${featuredProductsSectionQuery}
        ${fullWidthBannerSectionQuery}
      }
    }
  }`,

  [GraphQlQueryEnum.ShopPage]: () => `{
    shopPage {
      title
      backgroundColour
      image ${imageQuery}
      description
      
      content {
        __typename
        ${reasonsSectionQuery}
        ${featuredProductsSectionQuery}
        ${fullWidthBannerSectionQuery}
      }
    }
  }`,

  [GraphQlQueryEnum.ShippingReturnsInformation]: () => `{
    shippingReturnsInformation {
      content {
        value
      }
    }
  }`,

  [GraphQlQueryEnum.Footer]: () => `{
    footer {
      signUpText
      
      socialLinks {
        id
        image {
          url
        }
        name
        link
      }
      
      acceptedPaymentMethods {
        id
        image {
          url
        }
        name
      }
    }
  }`,
}
