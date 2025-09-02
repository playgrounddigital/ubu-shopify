import cx from 'classnames'
import { FC, useMemo, useState } from 'react'
import ShopNavigationMenu from '~/components/Layout/Nav/Navbar/ShopMenu/ShopNavigationMenu'
import PageLink from '~/components/Layout/PageLink'
import allShopNavigationMenusJSON from '~/public/all-shop-navigation-menus.json'
import { ShopNavigationMenu as ShopNavigationMenuType } from '~/types/cms/models/shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface ShopMenuBarProps {
  isBannerActive: boolean
  isOpen: boolean
  onClose: () => void
}

const ShopMenuBar: FC<ShopMenuBarProps> = ({ isBannerActive, isOpen, onClose }) => {
  const [currentHoveredMenu, setCurrentHoveredMenu] = useState<string | null>(null)

  const handleMouseEnter = (menu: any) => setCurrentHoveredMenu(menu.id)

  const _onClose = () => {
    setCurrentHoveredMenu(null)
    onClose()
  }

  const currentMenu = useMemo(
    () => allShopNavigationMenusJSON.find((menu) => menu.id === currentHoveredMenu),
    [currentHoveredMenu]
  )

  return (
    <>
      {/* OVERLAY */}
      <div
        aria-label="Close shop menu"
        aria-hidden={!isOpen}
        onClick={_onClose}
        className={cx('fixed inset-0 z-30 bg-black/60 backdrop-blur-[12px] transition-opacity', {
          'pointer-events-none opacity-0': !isOpen,
        })}
      />
      <menu
        aria-label="Shop menu"
        aria-hidden={!isOpen}
        className={cx(
          'fixed left-0 z-40 hidden h-16 w-full border-y-[1.5] border-black bg-white transition-all lg:block',
          {
            'pointer-events-none': !isOpen,
            'top-[126px]': isBannerActive,
            'top-[88px]': !isBannerActive,
            '-translate-y-[calc(100%+190px)]': !isOpen && isBannerActive,
            '-translate-y-[calc(100%+152px)]': !isOpen && !isBannerActive,
          }
        )}
      >
        <ul className="mx-auto flex h-full max-w-[1440px] items-center gap-x-4 px-10">
          <li>
            <PageLink
              href={SitePages.Shop}
              onClick={_onClose}
              className="font-bold uppercase hover:underline"
            >
              All
            </PageLink>
          </li>
          {allShopNavigationMenusJSON.map((menu) => (
            <li key={menu.id}>
              <PageLink
                tabIndex={isOpen ? -1 : 0}
                href={`${SitePages.Collections}/${menu.collectionLink.handle}`}
                onMouseEnter={() => handleMouseEnter(menu as any)}
                onClick={_onClose}
              >
                <button
                  tabIndex={-1}
                  className={cx('h-[34px] rounded-full border px-4 uppercase transition-colors', {
                    'bg-black text-white': currentHoveredMenu === menu.id,
                  })}
                >
                  {menu.title}
                </button>
              </PageLink>
            </li>
          ))}
        </ul>
      </menu>

      <ShopNavigationMenu
        currentMenu={currentMenu as unknown as ShopNavigationMenuType}
        currentHoveredMenu={currentHoveredMenu}
        isBannerActive={isBannerActive}
        isOpen={isOpen}
        onClose={_onClose}
      />
    </>
  )
}

export default ShopMenuBar
