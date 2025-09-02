import cx from 'classnames'
import { FC } from 'react'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { useCart } from '~/context/CartContext'
import { SitePages } from '~/types/pages'
import { Product } from '~/types/shopify'

interface ProductCardProps {
  isSmall?: boolean
  product: Product
  onClick?: () => void
  className?: string
}

const ProductCard: FC<ProductCardProps> = ({ isSmall, product, onClick, className }) => {
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
    return ''
  })()

  return (
    <div
      className={cx('group/card relative', className, {
        'md:min-w-[305px]': !isSmall,
      })}
    >
      {/* IMAGE AND CART BUTTON */}
      <div className="relative mb-4">
        <PageLink
          href={`${SitePages.Products}/${product.handle}`}
          onClick={onClick}
        >
          <div
            className={cx('overflow-hidden', {
              'aspect-[305/406] rounded-[10px]': !isSmall,
              'h-[63px] w-[57px] rounded-xs border': isSmall,
            })}
            style={{
              maskImage: !isSmall ? 'url(/img/shared/product-card-mask.svg)' : 'none',
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
        {!isSmall && (
          <div className="absolute right-0 bottom-0 flex w-full justify-end p-[6.4px] md:p-[11px]">
            <button
              onClick={() =>
                addToCart({
                  variantId: variant?.id,
                  quantity: 1,
                  productTitle: productTitle,
                  variantTitle: secondaryTitleToUse,
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
        )}
      </div>
      {/* TITLE + VARIANT */}
      <div
        className={cx('mb-[3px] flex', {
          'justify-between gap-x-2': !isSmall,
          'flex-col gap-y-1.5': isSmall,
        })}
      >
        <h3
          className={cx({
            'text-product-title': !isSmall,
            'text-sm font-bold -tracking-[0.42px]': isSmall,
          })}
        >
          {productTitle}
        </h3>
        <span
          className={cx({
            'translate-y-0.5 text-lg leading-[21.6px] -tracking-[0.54px]': !isSmall,
            'text-[11px] leading-[13px] -tracking-[0.33px]': isSmall,
          })}
        >
          ${productPrice}
        </span>
      </div>
      {/* PRICE */}
      {!isSmall && <span className="text-[17px] leading-5 -tracking-[0.51px] text-grey">{secondaryTitleToUse}</span>}
    </div>
  )
}

export default ProductCard
