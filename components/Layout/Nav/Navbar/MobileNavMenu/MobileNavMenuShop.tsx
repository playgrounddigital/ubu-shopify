'use client'
import cx from 'classnames'
import { FC } from 'react'
import BackButton from '~/components/Layout/Nav/Navbar/MobileNavMenu/BackButton'
import FeaturedCard from '~/components/Layout/Nav/Navbar/MobileNavMenu/FeaturedCard'
import MobileNavLink from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavLink'
import {
  mobileNavMenuSlideClasses,
  mobileNavMenuSlideInternalClasses,
} from '~/components/Layout/Nav/Navbar/MobileNavMenu/presets'
import allShopNavigationMenusJSON from '~/public/all-shop-navigation-menus.json'
import { SitePages } from '~/types/pages'

interface MobileNavMenuShopProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  onOpenFeatured: (menuId: string) => void
}

const MobileNavMenuShop: FC<MobileNavMenuShopProps> = ({ isOpen, onClose, onBack, onOpenFeatured }) => {
  return (
    <div
      className={cx(mobileNavMenuSlideClasses, {
        'scale-95': !isOpen,
      })}
    >
      <div className={cx(mobileNavMenuSlideInternalClasses)}>
        <BackButton onClick={onBack} />
        <ul className="space-y-6">
          <MobileNavLink
            title="All"
            href={SitePages.Shop}
            onClick={onClose}
            onClose={onClose}
            hasCircleButton={false}
          />
          {allShopNavigationMenusJSON.map((menu) => (
            <MobileNavLink
              key={menu.title}
              isButton
              title={menu.title}
              href={`${SitePages.Collections}/${menu.collectionLink.handle}`}
              onClick={() => onOpenFeatured(menu.id)}
              onClose={onClose}
            />
          ))}
        </ul>

        {/* Mirror of featured preview */}
        <FeaturedCard
          menu={allShopNavigationMenusJSON[0]}
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default MobileNavMenuShop
