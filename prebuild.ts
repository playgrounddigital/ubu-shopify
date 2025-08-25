import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { Footer } from '~/types/cms/models/footer'
import { ShippingReturnsInformationContent } from '~/types/cms/models/shipping-returns-information'
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
  const {
    siteBanner,
  }: {
    siteBanner: SiteBanner
  } = await fetchFromDatoAPI(siteBannerQuery)
  const {
    footer,
  }: {
    footer: Footer
  } = await fetchFromDatoAPI(footerQuery)
  const {
    shippingReturnsInformation,
  }: {
    shippingReturnsInformation: ShippingReturnsInformationContent
  } = await fetchFromDatoAPI(shippingReturnsInformationQuery)

  const siteBannerJson = JSON.stringify(siteBanner)
  fs.writeFileSync(path.join(publicDir, 'site-banner.json'), siteBannerJson)

  const footerJson = JSON.stringify(footer)
  fs.writeFileSync(path.join(publicDir, 'footer.json'), footerJson)

  const shippingReturnsInformationJson = JSON.stringify(shippingReturnsInformation)
  fs.writeFileSync(path.join(publicDir, 'shipping-returns-information.json'), shippingReturnsInformationJson)
}

fetchContent().then(() => process.exit(0))
