import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { getAllProducts } from '~/lib/shopify'
import { EmptyCartTextContent } from '~/types/cms/models/empty-cart-text'
import { Footer } from '~/types/cms/models/footer'
import { FreeShippingBanner } from '~/types/cms/models/free-shipping-banner'
import { MobileShopNavigationMenu } from '~/types/cms/models/mobile-shop-navigation-menu'
import { PromoBannerContent } from '~/types/cms/models/promo-banner'
import { RecommendedCartItemListContent } from '~/types/cms/models/recommended-cart-item-list'
import { ShippingReturnsInformationContent } from '~/types/cms/models/shipping-returns-information'
import { ShopNavigationMenu } from '~/types/cms/models/shop-navigation-menu'
import { SiteBanner } from '~/types/cms/models/site-banner'
import { GraphQlQueryEnum } from '~/types/graphql'
import { Product } from '~/types/shopify'
dotenv.config()

const __dirname = path.dirname(new URL(import.meta.url).pathname)
// Public directory
const publicDir = path.join(__dirname, 'public').replace('\\', '')

const fetchContent = async () => {
  const siteBannerQuery = getGraphQLQuery(GraphQlQueryEnum.SiteBanner)
  const footerQuery = getGraphQLQuery(GraphQlQueryEnum.Footer)
  const shippingReturnsInformationQuery = getGraphQLQuery(GraphQlQueryEnum.ShippingReturnsInformation)
  const freeShippingBannerQuery = getGraphQLQuery(GraphQlQueryEnum.FreeShippingBanner)
  const allShopNavigationMenusQuery = getGraphQLQuery(GraphQlQueryEnum.AllShopNavigationMenus)
  const allMobileShopNavigationMenusQuery = getGraphQLQuery(GraphQlQueryEnum.AllMobileShopNavigationMenus)
  const emptyCartTextQuery = getGraphQLQuery(GraphQlQueryEnum.EmptyCartText)
  const recommendedCartItemListQuery = getGraphQLQuery(GraphQlQueryEnum.RecommendedCartItemList)
  const promoBannerQuery = getGraphQLQuery(GraphQlQueryEnum.PromoBanner)

  const [
    { siteBanner },
    { footer },
    { shippingReturnsInformation },
    { freeShippingBanner },
    { allShopNavigationMenus },
    { allMobileShopNavigationMenus },
    { emptyCartText },
    { recommendedCartItemList },
    { promoBanner },
    products,
  ]: [
    { siteBanner: SiteBanner },
    { footer: Footer },
    { shippingReturnsInformation: ShippingReturnsInformationContent },
    { freeShippingBanner: FreeShippingBanner },
    { allShopNavigationMenus: ShopNavigationMenu[] },
    { allMobileShopNavigationMenus: MobileShopNavigationMenu[] },
    { emptyCartText: EmptyCartTextContent },
    { recommendedCartItemList: RecommendedCartItemListContent },
    { promoBanner: PromoBannerContent },
    products: Product[],
  ] = await Promise.all([
    fetchFromDatoAPI(siteBannerQuery),
    fetchFromDatoAPI(footerQuery),
    fetchFromDatoAPI(shippingReturnsInformationQuery),
    fetchFromDatoAPI(freeShippingBannerQuery),
    fetchFromDatoAPI(allShopNavigationMenusQuery),
    fetchFromDatoAPI(allMobileShopNavigationMenusQuery),
    fetchFromDatoAPI(emptyCartTextQuery),
    fetchFromDatoAPI(recommendedCartItemListQuery),
    fetchFromDatoAPI(promoBannerQuery),
    getAllProducts(),
  ])

  const siteBannerJson = JSON.stringify(siteBanner)
  fs.writeFileSync(path.join(publicDir, 'site-banner.json'), siteBannerJson)

  const footerJson = JSON.stringify(footer)
  fs.writeFileSync(path.join(publicDir, 'footer.json'), footerJson)

  const shippingReturnsInformationJson = JSON.stringify(shippingReturnsInformation)
  fs.writeFileSync(path.join(publicDir, 'shipping-returns-information.json'), shippingReturnsInformationJson)

  const freeShippingBannerJson = JSON.stringify(freeShippingBanner)
  fs.writeFileSync(path.join(publicDir, 'free-shipping-banner.json'), freeShippingBannerJson)

  const allShopNavigationMenusJson = JSON.stringify(allShopNavigationMenus)
  fs.writeFileSync(path.join(publicDir, 'all-shop-navigation-menus.json'), allShopNavigationMenusJson)

  const allMobileShopNavigationMenusJson = JSON.stringify(allMobileShopNavigationMenus)
  fs.writeFileSync(path.join(publicDir, 'all-mobile-shop-navigation-menus.json'), allMobileShopNavigationMenusJson)

  const emptyCartTextJson = JSON.stringify(emptyCartText)
  fs.writeFileSync(path.join(publicDir, 'empty-cart-text.json'), emptyCartTextJson)

  const recommendedCartItemListJson = JSON.stringify(recommendedCartItemList)
  fs.writeFileSync(path.join(publicDir, 'recommended-cart-item-list.json'), recommendedCartItemListJson)

  const promoBannerJson = JSON.stringify(promoBanner)
  fs.writeFileSync(path.join(publicDir, 'promo-banner.json'), promoBannerJson)

  const productsJson = JSON.stringify(products)
  fs.writeFileSync(path.join(publicDir, 'products.json'), productsJson)
}

fetchContent().then(() => process.exit(0))
