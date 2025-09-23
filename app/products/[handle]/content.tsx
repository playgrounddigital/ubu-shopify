'use client'
import { FC } from 'react'
import Header from '~/components/Pages/Products/Template/Header'
import FeaturedProductsSection from '~/components/Pages/Shared/FeaturedProductsSection'
import FullWidthBannerSection from '~/components/Pages/Shared/FullWidthBannerSection'
import ImageSliderSection from '~/components/Pages/Shared/ImageSliderSection'
import ReasonsSection from '~/components/Pages/Shared/ReasonsSection'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { FreeShippingBanner } from '~/types/cms/models/free-shipping-banner'
import { DatoCMSProductModel } from '~/types/cms/models/product-content'
import { ProductPageTemplate } from '~/types/cms/models/product-page-template'
import { Product } from '~/types/shopify'

interface ProductPageContentProps {
  productContent: DatoCMSProductModel | undefined
  product: Product
  products: Product[]
  freeShippingBanner: FreeShippingBanner
  content: ProductPageTemplate['content']
}

const ProductPageContent: FC<ProductPageContentProps> = ({
  productContent,
  product,
  products,
  freeShippingBanner,
  content,
}) => {
  return (
    <>
      <Header
        product={product}
        accordions={productContent?.accordions || []}
        freeShippingBanner={freeShippingBanner}
      />
      {productContent?.content.map((section) => {
        switch (section.__typename) {
          case 'ImageSliderSectionRecord':
            return (
              <ImageSliderSection
                key={section.id}
                content={section}
              />
            )
          default:
            return null
        }
      })}
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
