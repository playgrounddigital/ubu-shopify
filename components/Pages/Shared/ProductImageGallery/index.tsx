'use client'
import cx from 'classnames'
import { FC, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'
import CircleButton from '~/components/Layout/Button/Circle'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { productImageGallerySliderSettings } from '~/components/Pages/Shared/ProductImageGallery/presets'
import { Product } from '~/types/shopify'

interface ProductImageGalleryProps {
  product: Product
}

export interface ProductImageGalleryRef {
  goToPrev: () => void
  goToNext: () => void
  currentSlide: number
  totalSlides: number
}

const ProductImageGallery: FC<ProductImageGalleryProps> = ({ product }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const images = useMemo(() => product.images.slice(0, 4), [product.images])

  const handlePrev = () => sliderRef.current?.slickPrev()
  const handleNext = () => sliderRef.current?.slickNext()
  const handleImageClick = (index: number) => sliderRef.current?.slickGoTo(index)
  const handleSlideChange = (_: number, nextSlide: number) => setCurrentSlide(nextSlide)

  return (
    <div className="flex items-start gap-x-5">
      {/* Thumbs */}
      <div className="hidden flex-col gap-y-6 xl:flex">
        {images.map((img, index) => (
          <button
            key={img.id ?? index}
            onClick={() => handleImageClick(index)}
            className={cx('h-[126px] w-[114px] overflow-hidden rounded border-2 transition-colors', {
              'border-black': currentSlide === index,
              'border-off-white': currentSlide !== index,
            })}
          >
            <OptimisedImage
              src={img.url}
              alt={product.title}
              layout="cover"
              className="size-full"
            />
          </button>
        ))}
      </div>

      {/* Main slider */}
      <div className="mx-auto flex w-full max-w-[400px] flex-col xl:mx-0 xl:max-w-[630px]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] border-2 border-green md:rounded-[10px]">
          <Slider
            {...productImageGallerySliderSettings}
            ref={sliderRef}
            beforeChange={handleSlideChange}
            className="product-image-gallery-slider h-full w-full md:w-[400px] xl:w-[630px]"
          >
            {images.map((img, index) => (
              <OptimisedImage
                key={img.id ?? index}
                src={img.url}
                alt={product.title}
                layout="cover"
                className="aspect-[4/5] w-full md:w-[400px] xl:w-[630px]"
              />
            ))}
          </Slider>
        </div>
        {/* Bottom slider navigation */}
        {images.length > 1 && (
          <div className="mt-10 hidden gap-x-4 xl:flex">
            <CircleButton
              isFlipped
              disabled={currentSlide === 0}
              ariaLabel="Previous image"
              variant="white-black"
              onClick={() => handlePrev()}
            />
            <CircleButton
              disabled={currentSlide === images.length - 1}
              ariaLabel="Next image"
              variant="white-black"
              onClick={() => handleNext()}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductImageGallery
