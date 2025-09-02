import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { EmptyCartTextContent } from '~/types/cms/models/empty-cart-text'
import { Footer } from '~/types/cms/models/footer'
import { FreeShippingBanner } from '~/types/cms/models/free-shipping-banner'
import { ShippingReturnsInformationContent } from '~/types/cms/models/shipping-returns-information'
import { ShopNavigationMenu } from '~/types/cms/models/shop-navigation-menu'
import { SiteBanner } from '~/types/cms/models/site-banner'
import { GraphQlQueryEnum } from '~/types/graphql'
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
  const emptyCartTextQuery = getGraphQLQuery(GraphQlQueryEnum.EmptyCartText)

  const [
    { siteBanner },
    { footer },
    { shippingReturnsInformation },
    { freeShippingBanner },
    { allShopNavigationMenus },
    { emptyCartText },
  ]: [
    { siteBanner: SiteBanner },
    { footer: Footer },
    { shippingReturnsInformation: ShippingReturnsInformationContent },
    { freeShippingBanner: FreeShippingBanner },
    { allShopNavigationMenus: ShopNavigationMenu[] },
    { emptyCartText: EmptyCartTextContent },
  ] = await Promise.all([
    fetchFromDatoAPI(siteBannerQuery),
    fetchFromDatoAPI(footerQuery),
    fetchFromDatoAPI(shippingReturnsInformationQuery),
    fetchFromDatoAPI(freeShippingBannerQuery),
    fetchFromDatoAPI(allShopNavigationMenusQuery),
    fetchFromDatoAPI(emptyCartTextQuery),
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

  const emptyCartTextJson = JSON.stringify(emptyCartText)
  fs.writeFileSync(path.join(publicDir, 'empty-cart-text.json'), emptyCartTextJson)
}

fetchContent().then(() => process.exit(0))
