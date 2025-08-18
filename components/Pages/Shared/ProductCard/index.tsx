import { FC } from 'react'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { useCart } from '~/context/CartContext'
import { DatoCMSShopifyProduct } from '~/types/cms/pages/home'
import { Product } from '~/types/shopify'

interface ProductCardProps {
  product: DatoCMSShopifyProduct
  productData: Product
}

const ProductCard: FC<ProductCardProps> = ({ product, productData }) => {
  const { addToCart } = useCart()
  const productTitle = productData?.title
  const productPrice = productData?.variants.find((v) => v.id === product.product.id)?.priceV2.amount
  const variantTitle = product.product.title
  return (
    <div className="relative mr-10 !w-[305px]">
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
          <button
            onClick={() =>
              addToCart({
                variantId: product.product.id,
                quantity: 1,
                productTitle: productTitle,
                priceAmount: productPrice ?? '0',
                currencyCode: 'USD',
                imageUrl: product.product.image.src,
              })
            }
            className="group/button relative inline-flex h-[34px] w-fit items-center justify-center rounded-full px-4 text-center uppercase"
          >
            <span className="absolute inset-0 rounded-full bg-black transition-[filter] group-hover/button:blur-sm" />
            <span className="relative z-10 text-white">+ ADD</span>
          </button>
        </div>
      </div>
      {/* TITLE + VARIANT */}
      <div className="mb-[3px] flex items-center justify-between">
        <h3 className="text-product-title truncate">{productTitle}</h3>
        <span className="text-lg leading-[21.6px] -tracking-[0.54px]">${productPrice}</span>
      </div>
      {/* PRICE */}
      <span className="text-[17px] leading-5 -tracking-[0.51px] text-grey">{variantTitle}</span>
    </div>
  )
}

export default ProductCard
