import dotenv from 'dotenv'
dotenv.config()

import { buildRequestInit, executeQuery } from '@datocms/cda-client'
import { isProduction } from '~/constants/environment'
import { GRAPHQL_QUERIES } from '~/graphql/cms-queries'

export const DATO_CMS_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN
export const DATO_CMS_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_DATOCMS_GRAPHQL_ENDPOINT

if (!DATO_CMS_TOKEN || !DATO_CMS_GRAPHQL_ENDPOINT) throw new Error('Missing DatoCMS API token or endpoint')

export const getGraphQLQuery = (query: keyof typeof GRAPHQL_QUERIES, slug?: string): string => {
  const existingQuery = GRAPHQL_QUERIES[query]
  if (!existingQuery) throw new Error(`No GraphQL query found for ${query}`)

  return existingQuery(slug)
}

export const fetchFromDatoAPI = async (
  query: string,
  options?: {
    [key: string]: any
  }
): Promise<any> => {
  if (!DATO_CMS_TOKEN || !DATO_CMS_GRAPHQL_ENDPOINT) throw new Error('Missing DatoCMS API token or endpoint')

  const requestInit = buildRequestInit(query, {
    // @ts-expect-error
    cache: isProduction ? 'force-cache' : 'no-cache',
  })

  const result = (await executeQuery(query, {
    ...requestInit,
    token: DATO_CMS_TOKEN,
    ...(options || {}),
  })) as any

  if (!result) {
    console.error(result)
  }

  return result
}

// Universal function to fetch all entries for a given model
export const fetchFromDatoAPIRecursively = async (
  baseQuery: string,
  recordsLimit: number = 100
): Promise<Record<string, any[]>> => {
  // A helper function that inserts pagination parameters into the base query
  const insertPagination = (query: string, first: number, skip: number) => {
    return query.replace('(first: 100)', `(first: ${first}, skip: ${skip})`)
  }

  const fetchRecursive = async (skip: number = 0, accumulatedEntries: any[] = []): Promise<Record<string, any[]>> => {
    const paginatedQuery = insertPagination(baseQuery, recordsLimit, skip)

    try {
      const result = await fetchFromDatoAPI(paginatedQuery)

      // Here we use Object.keys() to dynamically extract the top-level key which should correspond to the model data
      const modelName = Object.keys(result)[0]

      if (result && result[modelName]) {
        const entriesBatch = result[modelName]
        const allEntries = accumulatedEntries.concat(entriesBatch)

        // If the batch is less than the limit, we have retrieved all data
        if (entriesBatch.length < recordsLimit) {
          return {
            [modelName]: allEntries,
          }
        }

        // Otherwise, fetch the next batch
        return fetchRecursive(skip + recordsLimit, allEntries)
      }

      // Handle unexpected result structures
      throw new Error('Unexpected GraphQL response structure')
    } catch (error) {
      console.error('Error fetching data from DatoCMS:', error)
      throw error
    }
  }

  return fetchRecursive()
}

export const joinSmartTagsIntoString = (tags: string[] | undefined) => (!tags ? '' : tags.join(', '))
