'use client'
import cx from 'classnames'
import { FC } from 'react'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { MobileShopNavigationMenu as MobileShopNavigationMenuType } from '~/types/cms/models/mobile-shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface FeaturedCardProps {
  menu: MobileShopNavigationMenuType
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
          maskImage: 'url(/img/shared/nav-featured-card-mask-small.svg)',
          maskSize: 'cover',
          maskPosition: 'bottom',
          maskRepeat: 'no-repeat',
        }}
      >
        <OptimisedImage
          src={menu.image?.url}
          alt={menu.collectionLink.title}
          layout="cover"
          imgClassName="object-bottom"
          className="z-10 h-[260px] w-full"
        />
      </div>
      <span className="xs:text-[26px] xs:bottom-4.5 absolute right-3 bottom-3 z-20 text-right text-2xl font-bold whitespace-nowrap">
        {menu.featuredTitle}
      </span>
    </PageLink>
  )
}

export default FeaturedCard
