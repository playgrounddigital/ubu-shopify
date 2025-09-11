'use client'
import cx from 'classnames'
import { FC } from 'react'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { ShopNavigationMenu as ShopNavigationMenuType } from '~/types/cms/models/shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface FeaturedCardProps {
  menu: ShopNavigationMenuType
  onClose: () => void
}

const FeaturedCard: FC<FeaturedCardProps> = ({ menu, onClose }) => {
  return (
    <PageLink
      aria-label="View featured collection"
      href={`${SitePages.Collections}/${menu.collectionLink.handle}`}
      onClick={onClose}
      className="relative mt-[30px] block w-full"
    >
      <div
        className={cx('relative w-full overflow-hidden rounded-[10px]')}
        style={{
          maskImage: menu.isLarge ? undefined : 'url(/img/shared/nav-featured-card-mask-small.svg)',
          maskSize: 'cover',
          maskPosition: 'bottom',
          maskRepeat: 'no-repeat',
        }}
      >
        {menu.isLarge && (
          <>
            <OptimisedImage
              src="/img/shared/nav-featured-card-mask-large.svg"
              alt=""
              layout="contain"
              className="absolute inset-0 hidden md:block"
            />
            <OptimisedImage
              src="/img/shared/nav-featured-card-mask-mobile.svg"
              alt=""
              layout="contain"
              className="opacity-30 md:hidden"
            />
          </>
        )}
        <OptimisedImage
          src={menu.image?.url}
          alt={menu.collectionLink.title}
          layout={menu.isLarge ? 'contain' : 'cover'}
          imgClassName={cx('object-top')}
          className={cx('z-10 h-full w-full', {
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-24px)] mix-blend-darken md:static md:translate-x-0 md:translate-y-0':
              menu.isLarge,
          })}
        />
      </div>
      <span
        className={cx('xs:text-[26px] absolute bottom-3 z-20 text-right text-2xl font-bold whitespace-nowrap', {
          'xs:bottom-4.5 right-3': !menu.isLarge,
          'xs:bottom-5 right-1': menu.isLarge,
        })}
      >
        {menu.featuredTitle}
      </span>
    </PageLink>
  )
}

export default FeaturedCard
