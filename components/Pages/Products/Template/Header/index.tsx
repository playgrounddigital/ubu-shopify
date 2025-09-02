'use client'
import { FC, useState } from 'react'
import Accordion from '~/components/Layout/Accordion'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import QuantitySelector from '~/components/Layout/QuantitySelector'
import StructuredTextRenderer from '~/components/Layout/StructuredTextRenderer'
import ProductImageGallery from '~/components/Pages/Shared/ProductImageGallery'
import { useCart } from '~/context/CartContext'
import CartIcon from '~/public/img/icons/cart.svg'
import TruckIcon from '~/public/img/icons/truck.svg'
import ShippingReturnsInformationJSON from '~/public/shipping-returns-information.json'
import { FreeShippingBanner } from '~/types/cms/models/free-shipping-banner'
import { Product } from '~/types/shopify'

interface HeaderProps {
  product: Product
  freeShippingBanner: FreeShippingBanner
}

const Header: FC<HeaderProps> = ({ product, freeShippingBanner }) => {
  const { addToCart, isLoading } = useCart()
  const [quantity, setQuantity] = useState(1)

  const variant = product.variants[0]
  const productPrice = variant?.priceV2.amount
  const variantTitle = variant?.title
  const colorMetafield = product.metafields[0]?.references[0]?.fields.find((field) => field.key === 'label')?.value

  const secondaryTitleToUse = (() => {
    if (variantTitle === 'Default Title' && colorMetafield) {
      return colorMetafield
    }
    return variantTitle
  })()

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))
  const increaseQty = () =>
    setQuantity((q) => {
      const maxQty = variant?.quantityAvailable ?? Infinity
      return Math.min(maxQty, q + 1)
    })

  const handleAddToCart = () => {
    if (!variant) return
    addToCart({
      variantId: variant.id,
      quantity,
      productTitle: product.title,
      variantTitle: variant.title,
      priceAmount: productPrice ?? '0',
      currencyCode: 'AUD',
      imageUrl: product.images[0]?.url,
      quantityAvailable: variant.quantityAvailable,
    })
  }

  return (
    <section>
      <Container className="pt-[176px] pb-[50px]">
        <div className="mb-10 flex md:gap-x-10">
          {/* Left: Thumbnails + Main image slider */}
          <ProductImageGallery product={product} />

          {/* Right: Details */}
          <div className="flex w-full flex-col pt-12">
            <div className="mb-14">
              <h1 className="text-general-title mb-3">{product.title}</h1>
              {variant?.priceV2?.amount ? (
                <div className="mb-6 text-[27px] leading-[32.4px] font-medium -tracking-[0.81px]">
                  ${Number(variant.priceV2.amount).toFixed(2)}
                </div>
              ) : null}
              {secondaryTitleToUse ? (
                <div className="text-[19px] leading-[22.8px] font-medium -tracking-[0.57px] text-grey">
                  {secondaryTitleToUse}
                </div>
              ) : null}
            </div>

            {/* Quantity + Add to cart */}
            <div className="mb-5 flex items-center gap-x-3">
              <QuantitySelector
                size="lg"
                quantity={quantity}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                disabled={isLoading}
                maxQuantity={variant?.quantityAvailable ?? null}
              />

              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !variant}
                buttonClassName="w-full"
                className="w-full"
                icon={CartIcon}
                iconClassName="!w-6 min-w-6 !h-[26px] !translate-x-0"
              >
                ADD TO CART
              </Button>
            </div>

            <div className="flex items-center justify-center gap-x-3 text-sm">
              <TruckIcon className="h-[15px] w-[17px]" />
              <p>{freeShippingBanner.bannerText}</p>
            </div>

            {/* Description */}
            {product.description ? <p className="mt-9 mb-[60px]">{product.description}</p> : null}

            <Accordion label="Shipping & Returns">
              <div className="pb-6">
                <StructuredTextRenderer data={ShippingReturnsInformationJSON.content} />
              </div>
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Header
