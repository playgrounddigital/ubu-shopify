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
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
        }}
      >
        {menu.isLarge && (
          <OptimisedImage
            src="/img/shared/nav-featured-card-mask-large.svg"
            alt=""
            layout="contain"
            className="absolute inset-0"
          />
        )}
        <OptimisedImage
          src={menu.image?.url}
          alt={menu.collectionLink.title}
          layout={menu.isLarge ? 'contain' : 'cover'}
          imgClassName={cx('object-top')}
          className={cx('z-10 h-full w-full', {
            'mix-blend-darken': menu.isLarge,
          })}
        />
      </div>
      <span
        className={cx('absolute z-20 text-right text-[26px] font-bold whitespace-nowrap', {
          'right-3 bottom-4.5': !menu.isLarge,
          'right-1 bottom-5': menu.isLarge,
        })}
      >
        {menu.featuredTitle}
      </span>
    </PageLink>
  )
}

export default FeaturedCard
