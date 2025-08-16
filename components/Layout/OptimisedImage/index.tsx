'use client'
import cx from 'classnames'
import Image, { ImageProps } from 'next/image'
import { FC, useState } from 'react'
import { IMAGE_SIZES_DESKTOP, IMAGE_SIZES_MOBILE, ImageSizes } from '~/components/Layout/OptimisedImage/constants'
import { createSizesString } from '~/components/Layout/OptimisedImage/utils'

type Layout = 'cover' | 'contain' | 'fill' | 'undefined'

const LAYOUT: Record<Layout, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  undefined: '',
}

export interface OptimisedImageProps extends Omit<ImageProps, 'layout' | 'width'> {
  src: string
  alt: string
  layout?: Layout
  desktopSize?: ImageSizes
  desktopWidth?: string // overrides desktopSize
  tabletSize?: ImageSizes
  tabletWidth?: string // overrides tabletSize
  mobileSize?: ImageSizes
  mobileWidth?: string // overrides mobileSize
  hasLoadAnimation?: boolean
  imgClassName?: string
  className?: string
  containerStyle?: React.CSSProperties
}

const OptimisedImage: FC<OptimisedImageProps> = ({
  src,
  alt,
  layout = 'contain',
  desktopSize = 'full',
  desktopWidth,
  tabletSize = 'full',
  tabletWidth,
  mobileSize = 'full',
  mobileWidth,
  hasLoadAnimation = true,
  imgClassName,
  className,
  containerStyle,
  ...props
}) => {
  if (!src) return null
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <div
      className={cx('transform-gpu select-none', className, {
        relative: !['fixed', 'absolute', 'sticky'].some((position) => className?.includes(position)),
      })}
      style={containerStyle}
    >
      {/* Do not optimise gif images */}
      {src.includes('.gif') ? (
        <img
          src={src}
          alt={alt}
          className={cx('w-full', className)}
          {...props}
        />
      ) : (
        <Image
          // ref={imageRef}
          src={src}
          alt={alt}
          sizes={createSizesString(
            desktopWidth ?? IMAGE_SIZES_DESKTOP[desktopSize],
            tabletWidth ?? IMAGE_SIZES_DESKTOP[tabletSize],
            mobileWidth ?? IMAGE_SIZES_MOBILE[mobileSize]
          )}
          quality={100}
          fill
          onLoad={() => setHasLoaded(true)}
          className={cx('next-image transition-[opacity,filter]', imgClassName, LAYOUT[layout], {
            // 'opacity-100': hasLoaded && hasLoadAnimation,
            'opacity-0 blur-sm': !hasLoaded && hasLoadAnimation,
          })}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimisedImage
