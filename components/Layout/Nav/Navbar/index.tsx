'use client'
import cx from 'classnames'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Container from '~/components/Layout/Container'
import HamburgerButton from '~/components/Layout/Nav/Navbar/HamburgerButton'
import MobileNavMenu from '~/components/Layout/Nav/Navbar/MobileNavMenu'
import { navLinks } from '~/components/Layout/Nav/Navbar/presets'
import ShopMenuBar from '~/components/Layout/Nav/Navbar/ShopMenu/Bar'
import PageLink from '~/components/Layout/PageLink'
import { useAuth } from '~/context/AuthContext'
import { useCart } from '~/context/CartContext'
import { disableScroll, enableScroll } from '~/helpers/common'
import useBreakpoints from '~/hooks/useBreakpoints'
import useOpenState from '~/hooks/useOpenState'
import CartIcon from '~/public/img/icons/cart.svg'
import SearchIcon from '~/public/img/icons/search.svg'
import UserIcon from '~/public/img/icons/user.svg'
import UBULogo from '~/public/logo.svg'
import SiteBannerJSON from '~/public/site-banner.json'
import { SiteBanner } from '~/types/cms/models/site-banner'
import { SitePages } from '~/types/pages'

const siteBanner = SiteBannerJSON as SiteBanner

const Navbar: FC = () => {
  const { isOpen: isShopMenuOpen, open: openShopMenu, close: closeShopMenu } = useOpenState()
  const { isOpen: isHamburgerMenuOpen, toggle: toggleHamburgerMenu, close: closeHamburgerMenu } = useOpenState()
  const [hasScrolled, setHasScrolled] = useState(false)
  const { cart, openCart } = useCart()
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const { isDesktop } = useBreakpoints()

  const isOnHomePage = pathname === SitePages.Home

  const cartItemsCount = cart?.lineItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  const rightSideButtons = [
    {
      label: 'Search',
      icon: SearchIcon,
      iconClassName: 'size-4.5 min-w-4.5',
      link: SitePages.Search,
      onClick: () => {},
    },
    {
      label: 'User',
      icon: UserIcon,
      iconClassName: 'w-4 min-w-4 h-4.5',
      link: isAuthenticated ? SitePages.Account : SitePages.SignIn,
      className: 'lg:block hidden',
    },
    {
      label: 'Cart',
      count: cartItemsCount,
      icon: CartIcon,
      iconClassName: 'w-4.5 min-w-4.5 h-5',
      onClick: openCart,
    },
  ]

  const closeAllMenus = () => {
    closeShopMenu()
    closeHamburgerMenu()
  }

  // Disable scroll on mobile menu open
  useEffect(() => {
    if (isHamburgerMenuOpen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [isHamburgerMenuOpen])

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0)

    // Set initial scroll state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        {siteBanner.isBannerActive && (
          <div className="flex h-[34px] items-center justify-center bg-black text-center text-white md:h-[38px]">
            <Container>
              <p>{siteBanner.bannerText}</p>
            </Container>
          </div>
        )}
        <div
          className={cx('w-full transition-colors', {
            'bg-white': hasScrolled || !isOnHomePage || isShopMenuOpen,
            'bg-white xl:bg-transparent': !hasScrolled && isOnHomePage && !isShopMenuOpen,
          })}
        >
          <Container className="grid h-[51px] grid-cols-3 md:h-[88px]">
            {/* Left links */}
            <div className="hidden items-center gap-x-2.5 lg:inline-flex">
              {navLinks.map((link) => (
                <PageLink
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => {
                    if (link.href === SitePages.Shop) {
                      openShopMenu()
                    } else {
                      closeShopMenu()
                    }
                  }}
                  onClick={closeAllMenus}
                  className="group relative inline-flex h-[34px] items-center justify-center px-4 text-center text-white uppercase"
                >
                  <span className="absolute inset-0 rounded-full bg-black transition-[filter] group-hover:blur-sm" />
                  <span className="relative z-10">{link.label}</span>
                </PageLink>
              ))}
            </div>

            {/* Hamburger button */}
            <HamburgerButton
              isOpen={isHamburgerMenuOpen}
              onClick={toggleHamburgerMenu}
            />

            {/* Logo */}
            <div className="flex items-center justify-center">
              <PageLink
                href={SitePages.Home}
                onClick={closeAllMenus}
              >
                <UBULogo className="h-[31px] w-[101px] md:h-[61px] md:w-[202px]" />
              </PageLink>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center justify-end gap-x-[7px] md:gap-x-2.5">
              {rightSideButtons.map(({ label, icon: Icon, iconClassName, link, onClick, count, className }) => (
                <PageLink
                  key={label}
                  href={link}
                  className={cx(className)}
                >
                  <button
                    key={label}
                    aria-label={label}
                    onClick={() => {
                      onClick?.()
                      closeAllMenus()
                    }}
                    className="group relative inline-flex h-[34px] max-w-[44px] items-center justify-center rounded-full px-4 md:max-w-[50px]"
                  >
                    <span
                      className={cx('absolute inset-0 rounded-full bg-black transition-[filter] group-hover:blur-sm')}
                    />
                    <Icon className={cx('relative z-10 text-white', iconClassName)} />
                    <span
                      aria-hidden={!count}
                      className={cx(
                        'absolute -top-[7px] -right-2 flex size-[23px] items-center justify-center rounded-full bg-black text-[13px] leading-[22.7px] font-medium text-white uppercase transition-opacity md:-top-[11px]',
                        {
                          'opacity-0': !count,
                        }
                      )}
                    >
                      {count}
                    </span>
                  </button>
                </PageLink>
              ))}
            </div>
          </Container>
        </div>
      </header>

      {isDesktop && (
        <ShopMenuBar
          isBannerActive={siteBanner.isBannerActive}
          isOpen={isShopMenuOpen}
          onClose={closeShopMenu}
        />
      )}

      {/* Mobile nav menu */}
      <MobileNavMenu
        isOpen={isHamburgerMenuOpen}
        isAuthenticated={isAuthenticated}
        onClose={closeAllMenus}
      />
    </>
  )
}

export default Navbar
