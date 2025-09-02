'use client'
import { FC, useEffect, useState } from 'react'
import Header from '~/components/Pages/Collections/Header'
import ProductsGrid from '~/components/Pages/Collections/ProductsGrid'
import SearchBar from '~/components/Pages/Search/SearchBar'
import FeaturedProductsSection from '~/components/Pages/Shared/FeaturedProductsSection'
import FullWidthBannerSection from '~/components/Pages/Shared/FullWidthBannerSection'
import ReasonsSection from '~/components/Pages/Shared/ReasonsSection'
import { debounce } from '~/helpers/common'
import { DatoCMSCollectionModel } from '~/types/cms/models/collection'
import { SearchContent } from '~/types/cms/pages/search'
import { ShopContent } from '~/types/cms/pages/shop'
import { Product } from '~/types/shopify'

interface SearchPageProps {
  title: string
  collection: DatoCMSCollectionModel | ShopContent | SearchContent
  products: Product[]
}

export interface SearchPageSectionProps {
  collection?: DatoCMSCollectionModel
}

const SearchPage: FC<SearchPageProps> = ({ title, collection, products }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const debouncedSetSearchQuery = debounce((query: string) => {
    setSearchQuery(query)
  }, 500)

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products)
      return
    }
    setFilteredProducts(
      products
        .map((product) => {
          const title = product.title.toLowerCase()
          const handle = product.handle.toLowerCase()
          const description = product.description?.toLowerCase()
          const collections = product.collections.map((collection) => collection.title.toLowerCase())
          const searchQueryLower = searchQuery.toLowerCase().trim()

          // Check if title matches search query for priority sorting
          const titleMatch = title.includes(searchQueryLower)

          return {
            product,
            titleMatch,
            matches: [title, handle, description, ...collections].some((text) => text.includes(searchQueryLower)),
          }
        })
        .filter((item) => item.matches)
        .sort((a, b) => {
          // Sort products with title matches first
          if (a.titleMatch && !b.titleMatch) return -1
          if (!a.titleMatch && b.titleMatch) return 1
          return 0
        })
        .map((item) => item.product)
    )
  }, [searchQuery, products])

  return (
    <>
      <Header
        title={title}
        content={collection}
      />
      <SearchBar
        hasResults={filteredProducts.length > 0}
        searchQuery={searchQuery}
        setSearchQuery={debouncedSetSearchQuery}
      />
      {filteredProducts.length > 0 && <ProductsGrid products={filteredProducts} />}
      {collection?.content.map((section) => {
        switch (section.__typename) {
          case 'ReasonsSectionRecord':
            return (
              <ReasonsSection
                key={section.id}
                content={section}
              />
            )
          case 'FullWidthBannerSectionRecord':
            return (
              <FullWidthBannerSection
                key={section.id}
                content={section}
              />
            )
          case 'FeaturedProductsSectionRecord':
            return (
              <FeaturedProductsSection
                key={section.id}
                products={products}
                content={section}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default SearchPage
