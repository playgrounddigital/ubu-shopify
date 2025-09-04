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
      <div
        className={cx('relative', {
          'mb-4': !isSmall,
          'mb-2': isSmall,
        })}
      >
        <PageLink
          href={`${SitePages.Products}/${product.handle}`}
          onClick={onClick}
        >
          <div
            className={cx('aspect-[305/406] overflow-hidden rounded md:rounded-[10px]', {})}
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
        <div
          className={cx('absolute right-0 bottom-0 flex w-full justify-end md:p-[11px]', {
            'p-0.5': isSmall,
            'p-1': !isSmall,
          })}
        >
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
            className={cx(
              'group/button relative inline-flex w-fit items-center justify-center rounded-full px-3 text-center uppercase md:h-[27px] md:max-w-[unset] md:px-4',
              {
                'h-3 max-w-6': isSmall,
                'h-[22px] max-w-[50px]': !isSmall,
              }
            )}
          >
            <span className="absolute inset-0 rounded-full bg-black transition-[filter] group-hover/button:blur-sm" />
            <span
              className={cx('relative z-10 whitespace-nowrap text-white md:text-base', {
                'text-xs': !isSmall,
                'text-[6px]': isSmall,
              })}
            >
              + ADD
            </span>
          </button>
        </div>
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
            'text-[9px] leading-3 font-bold -tracking-[0.42px]': isSmall,
          })}
        >
          {productTitle}
        </h3>
        <span
          className={cx({
            'hidden translate-y-0.5 text-lg leading-[21.6px] -tracking-[0.54px] md:inline-block': !isSmall,
            'text-[8px] leading-[10px] -tracking-[0.33px]': isSmall,
          })}
        >
          ${productPrice}
        </span>
      </div>
      {/* VARIANT TITLE */}
      {!isSmall && <span className="text-[17px] leading-5 -tracking-[0.51px] text-grey">{secondaryTitleToUse}</span>}

      {!isSmall && (
        <span
          className={cx('mt-2 block md:hidden', {
            'text-lg leading-[21.6px] -tracking-[0.54px]': !isSmall,
            'text-[8px] leading-[10px] -tracking-[0.33px]': isSmall,
          })}
        >
          ${productPrice}
        </span>
      )}
    </div>
  )
}

export default ProductCard
