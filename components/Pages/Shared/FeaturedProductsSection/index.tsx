import { FC, useRef, useState } from 'react'
import Slider from 'react-slick'
import CircleButton from '~/components/Layout/Button/Circle'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { featuredProductsSliderSettings } from '~/components/Pages/Shared/FeaturedProductsSection/presets'
import { FeaturedProductsSectionRecord } from '~/types/cms/pages/home'

const SLIDES_TO_SHOW = 5

interface FeaturedProductsSectionProps {
  content: FeaturedProductsSectionRecord
}

const FeaturedProductsSection: FC<FeaturedProductsSectionProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)
  const { products } = content

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  const handleSlideChange = (_: number, nextSlide: number) => {
    setCurrentSlide(nextSlide)
  }

  let _products = products

  // Make sure there are at least 5 products
  if (products.length < SLIDES_TO_SHOW) {
    _products = [...products, ...products, ...products, ...products, ...products]
  }

  const productsToShow = _products.slice(0, SLIDES_TO_SHOW)

  return (
    <section>
      <Container className="pt-[88px] pb-20">
        <h2 className="heading-2 mb-[52px]">{content.title}</h2>
        <Slider
          {...featuredProductsSliderSettings}
          ref={sliderRef}
          beforeChange={handleSlideChange}
        >
          {productsToShow.map((product) => (
            <div
              key={product.product.id}
              className="relative mr-10 !w-[305px]"
            >
              {/* IMAGE AND CART BUTTON */}
              <div className="relative mb-4">
                <div
                  className="h-[406px] w-[305px] overflow-hidden rounded-[10px]"
                  style={{
                    maskImage: 'url(/img/shared/product-card-mask.svg)',
                    maskSize: 'cover',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                  }}
                >
                  <OptimisedImage
                    src={product.product.image.src}
                    alt={product.product.title}
                    layout="cover"
                    className="h-full w-full"
                  />
                </div>
                {/* Absolute Add button */}
                <div className="absolute right-0 bottom-0 flex w-full justify-end p-[11px]">
                  <button className="group/button relative inline-flex h-[34px] w-fit items-center justify-center rounded-full px-4 text-center uppercase">
                    <span className="absolute inset-0 rounded-full bg-black transition-[filter] group-hover/button:blur-sm" />
                    <span className="relative z-10 text-white">+ ADD</span>
                  </button>
                </div>
              </div>
              {/* TITLE + VARIANT */}
              <div className="flex items-center justify-between">
                <h3 className="text-product-title truncate">{product.product.title}</h3>
                <span className="text-lg leading-[21.6px] -tracking-[0.54px]">$74.95</span>
              </div>
              {/* PRICE */}
              <div className="mt-[16px]"></div>
            </div>
          ))}
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
