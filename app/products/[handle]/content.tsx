'use client'
import { FC } from 'react'
import Header from '~/components/Pages/Products/Template/Header'
import FeaturedProductsSection from '~/components/Pages/Shared/FeaturedProductsSection'
import FullWidthBannerSection from '~/components/Pages/Shared/FullWidthBannerSection'
import ReasonsSection from '~/components/Pages/Shared/ReasonsSection'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { ProductPageTemplate } from '~/types/cms/models/product-page-template'
import { Product } from '~/types/shopify'

interface ProductPageContentProps {
  product: Product
  products: Product[]
  content: ProductPageTemplate['content']
}

const ProductPageContent: FC<ProductPageContentProps> = ({ product, products, content }) => {
  return (
    <>
      <Header product={product} />
      {content.map((section) => {
        switch (section.__typename) {
          case 'ReasonsSectionRecord':
            return (
              <ReasonsSection
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
          case 'FullWidthBannerSectionRecord':
            return (
              <FullWidthBannerSection
                key={section.id}
                content={section}
              />
            )
          case 'TextMarqueeSectionRecord':
            return (
              <TextMarqueeSection
                key={section.id}
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

export default ProductPageContent
