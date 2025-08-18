import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fetchFromDatoAPI, getGraphQLQuery } from '~/helpers/cms'
import { SiteBanner } from '~/types/cms/models/site-banner'
import { GraphQlQueryEnum } from '~/types/graphql'
dotenv.config()

const __dirname = path.dirname(new URL(import.meta.url).pathname)
// Public directory
const publicDir = path.join(__dirname, 'public').replace('\\', '')

const fetchContent = async () => {
  const siteBannerQuery = getGraphQLQuery(GraphQlQueryEnum.SiteBanner)

  const {
    siteBanner,
  }: {
    siteBanner: SiteBanner
  } = await fetchFromDatoAPI(siteBannerQuery)

  const siteBannerJson = JSON.stringify(siteBanner)
  fs.writeFileSync(path.join(publicDir, 'site-banner.json'), siteBannerJson)
}

fetchContent().then(() => process.exit(0))
