'use client'
import { FC } from 'react'
import Header from '~/components/Pages/Collections/Header'
import ProductsGrid from '~/components/Pages/Collections/ProductsGrid'
import FeaturedProductsSection from '~/components/Pages/Shared/FeaturedProductsSection'
import FullWidthBannerSection from '~/components/Pages/Shared/FullWidthBannerSection'
import ReasonsSection from '~/components/Pages/Shared/ReasonsSection'
import { DatoCMSCollection } from '~/types/cms/models/collection'
import { Product } from '~/types/shopify'

interface CollectionTemplatePageProps {
  collection: DatoCMSCollection
  products: Product[]
  productsForCollection: Product[]
}

export interface CollectionTemplatePageSectionProps {
  collection: DatoCMSCollection
}

const CollectionTemplatePage: FC<CollectionTemplatePageProps> = ({ collection, products, productsForCollection }) => {
  return (
    <>
      <Header content={collection} />
      <ProductsGrid products={productsForCollection} />
      {collection.content.map((section) => {
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

export default CollectionTemplatePage
