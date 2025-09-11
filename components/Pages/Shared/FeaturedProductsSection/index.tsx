import cx from 'classnames'
import { FC, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'
import CircleButton from '~/components/Layout/Button/Circle'
import Container from '~/components/Layout/Container'
import PageLink from '~/components/Layout/PageLink'
import { featuredProductsSliderSettings } from '~/components/Pages/Shared/FeaturedProductsSection/presets'
import ProductCard from '~/components/Pages/Shared/ProductCard'
import useBreakpoints from '~/hooks/useBreakpoints'
import { FeaturedProductsSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'
import { Product } from '~/types/shopify'

const MIN_SLIDES_TO_SHOW = 5
const MIN_SLIDES_TO_SHOW_MOBILE = 2

interface FeaturedProductsSectionProps {
  products: Product[]
  content: FeaturedProductsSectionRecord
}

const FeaturedProductsSection: FC<FeaturedProductsSectionProps> = ({ products, content }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)
  const { isMobile, isDesktop } = useBreakpoints()
  const { products: cmsProducts } = content

  const handleNext = () => sliderRef.current?.slickNext()

  const handlePrev = () => sliderRef.current?.slickPrev()

  const handleSlideChange = (_: number, nextSlide: number) => setCurrentSlide(nextSlide)

  const isNextDisabled = useMemo(() => {
    if (isDesktop) {
      return currentSlide === cmsProducts.length - MIN_SLIDES_TO_SHOW + 1
    }
    if (isMobile) {
      return currentSlide === cmsProducts.length - 1
    }
    return currentSlide === cmsProducts.length - 2
  }, [currentSlide, cmsProducts.length, isDesktop])

  return (
    <section className="max-w-[100vw] overflow-x-hidden">
      <Container className="pt-[88px] pb-20">
        <div className="mb-[52px] flex flex-col gap-y-4 md:flex-row md:items-end md:justify-between md:gap-x-9">
          <h2 className="heading-2">{content.title}</h2>

          <PageLink
            href={
              content.collectionLink?.handle
                ? `${SitePages.Collections}/${content.collectionLink.handle}`
                : SitePages.Shop
            }
            className="whitespace-nowrap uppercase hover:underline"
          >
            View all
          </PageLink>
        </div>
        <Slider
          {...featuredProductsSliderSettings}
          ref={sliderRef}
          beforeChange={handleSlideChange}
          className="min-w-[calc(100%+24px)] lg:min-w-[calc(100%+40px)]"
        >
          {cmsProducts.map((cmsProduct) => {
            const shopifyProduct = products.find(
              (p) => p.id === cmsProduct.product.id || p.variants.find((v) => v.id === cmsProduct.product.id)
            )
            if (!shopifyProduct) {
              console.error(`Product ${cmsProduct.product.id} not found in Shopify products`)
              return null
            }
            return (
              <ProductCard
                key={cmsProduct.product.id}
                product={shopifyProduct}
                className="mr-2 w-[50vw] max-w-[200px] min-w-[180px] md:mr-6 md:w-auto md:max-w-[unset] md:min-w-[305px] xl:mr-10"
              />
            )
          })}
          {/* Add an additional slide to make sure the last slide is visible */}
          {!isDesktop && (
            <>
              <div
                aria-hidden
                className="mr-2 md:mr-6"
              />
              {isMobile && (
                <div
                  aria-hidden
                  className="mr-2 md:mr-6"
                />
              )}
            </>
          )}
        </Slider>
        {/* Show next and prev buttons */}
        <div
          className={cx('mt-[34px] flex gap-x-4 md:mt-[52px]', {
            'lg:hidden': cmsProducts.length < MIN_SLIDES_TO_SHOW,
            '!hidden lg:flex': cmsProducts.length < MIN_SLIDES_TO_SHOW_MOBILE && !isDesktop,
          })}
        >
          <CircleButton
            isFlipped
            disabled={currentSlide === 0}
            ariaLabel="Previous product"
            variant="white-black"
            onClick={handlePrev}
          />
          <CircleButton
            disabled={isNextDisabled}
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
