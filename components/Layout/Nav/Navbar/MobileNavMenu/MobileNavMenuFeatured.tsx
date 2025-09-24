'use client'
import cx from 'classnames'
import { FC, Fragment } from 'react'
import BackButton from '~/components/Layout/Nav/Navbar/MobileNavMenu/BackButton'
import FeaturedCard from '~/components/Layout/Nav/Navbar/MobileNavMenu/FeaturedCard'
import MobileNavLink from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavLink'
import {
  mobileNavMenuSlideClasses,
  mobileNavMenuSlideInternalClasses,
} from '~/components/Layout/Nav/Navbar/MobileNavMenu/presets'
import { ShopNavigationMenu as ShopNavigationMenuType } from '~/types/cms/models/shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface MobileNavMenuFeaturedProps {
  isOpen: boolean
  menu?: ShopNavigationMenuType
  onClose: () => void
  onBack: () => void
}

const MobileNavMenuFeatured: FC<MobileNavMenuFeaturedProps> = ({ isOpen, menu, onClose, onBack }) => {
  return (
    <div
      className={cx(mobileNavMenuSlideClasses, {
        'scale-95': !isOpen,
      })}
    >
      <div className={cx(mobileNavMenuSlideInternalClasses)}>
        <BackButton onClick={onBack}>{menu?.title}</BackButton>

        <ul className="flex flex-col gap-y-5">
          {menu?.menuLists.map((menuList) => (
            <Fragment key={menuList.id}>
              {menuList.collections.map((collection) => (
                <MobileNavLink
                  key={collection.id}
                  title={collection.title}
                  href={`${SitePages.Collections}/${collection.collection.handle}`}
                  onClick={() => onClose()}
                  isButton={false}
                  onClose={onClose}
                  hasCircleButton={false}
                />
              ))}
            </Fragment>
          ))}
        </ul>

        {/* Featured card */}
        {menu && (
          <FeaturedCard
            menu={menu}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

export default MobileNavMenuFeatured
