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
  collectionLink
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

const productOrCollectionLinkQuery = `{
  __typename
  ... on CollectionLinkRecord {
    collection
  }
  ... on ProductLinkRecord {
    product
  }
}`

const doubleLinkImageSectionQuery = `... on DoubleLinkImageSectionRecord {
  id
  linkBlock {
    id
    backgroundColour
    lineOne
    lineTwo
    link ${productOrCollectionLinkQuery}
    buttonText
  }
  image ${imageQuery}
  shouldSwapOrder
}`

export const GRAPHQL_QUERIES: Record<GraphQlQueryEnum, (slug?: string) => string> = {
  [GraphQlQueryEnum.Metadata]: () => `{
    _site {
      favicon {
        url
      }
      globalSeo {
        siteName
        titleSuffix
        fallbackSeo {
          description
          image ${imageQuery}
        }
      }
    }
  }`,
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
            link ${productOrCollectionLinkQuery}
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
          shouldAddPaddingBelow
        }
        
        ${doubleLinkImageSectionQuery}
        
        ... on FullWidthBannerSectionRecord {
          id
          image ${imageQuery}
          imageMobile ${imageQuery}
          title
          buttonText
          buttonColour
          link ${productOrCollectionLinkQuery}
          height
          shouldAddBorder
        }
        
      }
    }
  }`,
  [GraphQlQueryEnum.AboutPage]: () => `{
    aboutPage {
      image ${imageQuery}
      imageMobile ${imageQuery}

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
            link ${productOrCollectionLinkQuery}
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
          shouldAddPaddingBelow
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

  [GraphQlQueryEnum.PrivacyPolicyPage]: () => `{
    privacyPolicyPage {
      title
      image ${imageQuery}
      content {
        value
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

  [GraphQlQueryEnum.AllShopNavigationMenus]: () => `{
    allShopNavigationMenus {
      id
      title
      menuLists {
        id
        title
        collections {
          id
          title
          collection
        }
      }
      
      featuredTitle
      image {
        url
      }
      collectionLink
      isLarge
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

  [GraphQlQueryEnum.FreeShippingBanner]: () => `{
    freeShippingBanner {
      bannerText
      freeShippingThreshold
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
