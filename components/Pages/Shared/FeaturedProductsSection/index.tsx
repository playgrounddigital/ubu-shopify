import { FC, useRef, useState } from 'react'
import Slider from 'react-slick'
import CircleButton from '~/components/Layout/Button/Circle'
import Container from '~/components/Layout/Container'
import PageLink from '~/components/Layout/PageLink'
import { featuredProductsSliderSettings } from '~/components/Pages/Shared/FeaturedProductsSection/presets'
import ProductCard from '~/components/Pages/Shared/ProductCard'
import { FeaturedProductsSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'
import { Product } from '~/types/shopify'

const SLIDES_TO_SHOW = 5

interface FeaturedProductsSectionProps {
  products: Product[]
  content: FeaturedProductsSectionRecord
}

const FeaturedProductsSection: FC<FeaturedProductsSectionProps> = ({ products, content }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)
  const { products: cmsProducts } = content

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  const handleSlideChange = (_: number, nextSlide: number) => {
    setCurrentSlide(nextSlide)
  }

  let _cmsProducts = cmsProducts

  // Make sure there are at least 5 products
  if (cmsProducts.length < SLIDES_TO_SHOW) {
    _cmsProducts = [...cmsProducts, ...cmsProducts, ...cmsProducts, ...cmsProducts, ...cmsProducts]
  }

  const productsToShow = _cmsProducts.slice(0, SLIDES_TO_SHOW)

  return (
    <section>
      <Container className="pt-[88px] pb-20">
        <div className="mb-[52px] flex items-end justify-between">
          <h2 className="heading-2">{content.title}</h2>

          <PageLink
            href={SitePages.Shop}
            className="uppercase hover:underline"
          >
            View all
          </PageLink>
        </div>
        <Slider
          {...featuredProductsSliderSettings}
          ref={sliderRef}
          beforeChange={handleSlideChange}
          className="lg:min-w-[calc(100%+40px)]"
        >
          {productsToShow.map((cmsProduct) => {
            const shopifyProduct = products.find((p) => p.variants.find((v) => v.id === cmsProduct.product.id))
            if (!shopifyProduct) {
              console.error(`Product ${cmsProduct.product.id} not found in Shopify products`)
              return null
            }
            return (
              <ProductCard
                key={cmsProduct.product.id}
                product={shopifyProduct}
                className="mr-10"
              />
            )
          })}
        </Slider>
        {/* Show next and prev buttons */}
        <div className="mt-[52px] flex gap-x-4">
          <CircleButton
            isFlipped
            disabled={currentSlide === 0}
            ariaLabel="Previous product"
            variant="white-black"
            onClick={handlePrev}
          />
          <CircleButton
            disabled={currentSlide === productsToShow.length - SLIDES_TO_SHOW - 1}
            ariaLabel="Next product"
            variant="white-black"
            onClick={handleNext}
          />
        </div>
      </Container>
    </section>
  )
}

export default FeaturedProductsSection
