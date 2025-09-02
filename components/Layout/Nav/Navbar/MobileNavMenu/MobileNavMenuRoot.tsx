'use client'
import cx from 'classnames'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import FeaturedCard from '~/components/Layout/Nav/Navbar/MobileNavMenu/FeaturedCard'
import MobileNavLink from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavLink'
import {
  mobileNavMenuSlideClasses,
  mobileNavMenuSlideInternalClasses,
} from '~/components/Layout/Nav/Navbar/MobileNavMenu/presets'
import PageLink from '~/components/Layout/PageLink'
import allShopNavigationMenusJSON from '~/public/all-shop-navigation-menus.json'
import UserIcon from '~/public/img/icons/user.svg'
import { SitePages } from '~/types/pages'

interface MobileNavMenuRootProps {
  isOpen: boolean
  isAuthenticated?: boolean
  onClose: () => void
  onOpenShop: () => void
}

const MobileNavMenuRoot: FC<MobileNavMenuRootProps> = ({ isOpen, isAuthenticated, onClose, onOpenShop }) => {
  return (
    <div
      className={cx(mobileNavMenuSlideClasses, {
        'scale-95': !isOpen,
      })}
    >
      <div className={cx(mobileNavMenuSlideInternalClasses)}>
        <ul className="space-y-6">
          {[
            {
              title: 'Shop',
              href: SitePages.Shop,
              onClick: onOpenShop,
              isButton: true,
              hasCircleButton: true,
            },
            {
              title: 'Gifts',
              href: `${SitePages.Collections}/gifts`,
              onClick: onClose,
              isButton: false,
              hasCircleButton: false,
            },
            {
              title: 'About',
              href: SitePages.About,
              onClick: onClose,
              isButton: false,
              hasCircleButton: false,
            },
          ].map((item) => (
            <MobileNavLink
              key={item.title}
              title={item.title}
              href={item.href}
              onClick={item.onClick}
              isButton={item.isButton}
              onClose={onClose}
              hasCircleButton={item.hasCircleButton}
            />
          ))}
        </ul>

        <div className="mt-8">
          <PageLink
            href={isAuthenticated ? SitePages.Account : SitePages.SignIn}
            onClick={onClose}
          >
            <Button
              variant="black-green"
              icon={UserIcon}
              buttonClassName="w-full"
              className="w-full"
            >
              {isAuthenticated ? 'My Account' : 'Sign In'}
            </Button>
          </PageLink>
        </div>

        {/* Featured preview card */}
        <FeaturedCard
          menu={allShopNavigationMenusJSON[0]}
          onClose={onClose}
        />
      </div>
    </div>
  )
}

export default MobileNavMenuRoot
