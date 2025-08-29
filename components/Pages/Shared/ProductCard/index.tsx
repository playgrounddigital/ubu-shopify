import cx from 'classnames'
import { FC } from 'react'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { useCart } from '~/context/CartContext'
import { SitePages } from '~/types/pages'
import { Product } from '~/types/shopify'

interface ProductCardProps {
  product: Product
  className?: string
}

const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart()
  const productTitle = product.title
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

  return (
    <div className={cx('group/card relative md:min-w-[305px]', className)}>
      {/* IMAGE AND CART BUTTON */}
      <div className="relative mb-4">
        <PageLink href={`${SitePages.Products}/${product.handle}`}>
          <div
            className="aspect-[305/406] overflow-hidden rounded-[10px]"
            style={{
              maskImage: 'url(/img/shared/product-card-mask.svg)',
              maskSize: 'cover',
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
            }}
          >
            <OptimisedImage
              src={product.images[0]?.url}
              alt={product.title}
              layout="cover"
              imgClassName="group-hover/card:scale-105 transition-transform transform-gpu"
              className="h-full w-full"
            />
          </div>
        </PageLink>
        {/* Absolute Add button */}
        <div className="absolute right-0 bottom-0 flex w-full justify-end p-[6.4px] md:p-[11px]">
          <button
            onClick={() =>
              addToCart({
                variantId: variant?.id,
                quantity: 1,
                productTitle: productTitle,
                variantTitle: variantTitle,
                priceAmount: productPrice ?? '0',
                currencyCode: 'AUD',
                imageUrl: product.images[0]?.url,
              })
            }
            className="group/button relative inline-flex h-[27px] w-fit max-w-[61px] items-center justify-center rounded-full px-3 text-center uppercase md:h-[34px] md:max-w-[unset] md:px-4"
          >
            <span className="absolute inset-0 rounded-full bg-black transition-[filter] group-hover/button:blur-sm" />
            <span className="relative z-10 text-xs whitespace-nowrap text-white md:text-base">+ ADD</span>
          </button>
        </div>
      </div>
      {/* TITLE + VARIANT */}
      <div className="mb-[3px] flex justify-between gap-x-2">
        <h3 className="text-product-title">{productTitle}</h3>
        <span className="translate-y-0.5 text-lg leading-[21.6px] -tracking-[0.54px]">${productPrice}</span>
      </div>
      {/* PRICE */}
      <span className="text-[17px] leading-5 -tracking-[0.51px] text-grey">{secondaryTitleToUse}</span>
    </div>
  )
}

export default ProductCard
