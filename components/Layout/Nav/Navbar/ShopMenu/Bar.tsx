import cx from 'classnames'
import { FC, useMemo, useState } from 'react'
import AnimateOnUpdate from '~/components/Layout/AnimateOnUpdate'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import allShopNavigationMenusJSON from '~/public/all-shop-navigation-menus.json'
import { ShopNavigationMenu } from '~/types/cms/models/shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface ShopMenuBarProps {
  isBannerActive: boolean
  isOpen: boolean
  onClose: () => void
}

const ShopMenuBar: FC<ShopMenuBarProps> = ({ isBannerActive, isOpen, onClose }) => {
  const [currentHoveredMenu, setCurrentHoveredMenu] = useState<string | null>(null)

  const handleMouseEnter = (menu: ShopNavigationMenu) => setCurrentHoveredMenu(menu.id)

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
        onMouseEnter={() => setCurrentHoveredMenu(null)}
        onClick={onClose}
        className={cx('fixed inset-0 z-30 bg-black/60 backdrop-blur-[12px] transition-opacity', {
          'pointer-events-none opacity-0': !isOpen,
        })}
      />
      <menu
        aria-label="Shop menu"
        aria-hidden={!isOpen}
        className={cx(
          'fixed left-0 z-40 hidden h-16 w-full border-y-[1.5] border-black bg-white transition-transform lg:block',
          {
            'pointer-events-none opacity-0': !isOpen,
            'top-[126px]': isBannerActive,
            'top-[88px]': !isBannerActive,
            '-translate-y-[calc(100%+190px)]': !isOpen && isBannerActive,
            '-translate-y-[calc(100%+152px)]': !isOpen && !isBannerActive,
          }
        )}
      >
        <ul className="mx-auto flex h-full max-w-[1440px] items-center gap-x-4 px-10">
          {allShopNavigationMenusJSON.map((menu) => (
            <li key={menu.id}>
              <PageLink
                tabIndex={isOpen ? -1 : 0}
                href={`${SitePages.Collections}/${menu.collectionLink.handle}`}
                onMouseEnter={() => handleMouseEnter(menu as unknown as ShopNavigationMenu)}
                onClick={onClose}
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

      <div
        className={cx('fixed left-1/2 z-40 w-full max-w-[1340px] -translate-x-1/2 pt-5 transition-opacity', {
          'pointer-events-none opacity-0': !currentHoveredMenu,
          'top-[190px]': isBannerActive,
          'top-[152px]': !isBannerActive,
        })}
      >
        <div className="mx-auto min-h-[418px] rounded-[10px] bg-white p-[30px] pl-12 shadow-shop-nav-menu">
          <AnimateOnUpdate
            disableTransition={currentHoveredMenu === null}
            updateKey={currentHoveredMenu}
            className="flex justify-between gap-x-10"
          >
            <div
              className="grid w-fit"
              style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr)` }}
            >
              {currentMenu?.menuLists.map((menu) => (
                <div key={menu.id}>
                  <h3 className="mb-5 font-bold uppercase">{menu.title}</h3>
                  <ul className="flex flex-col gap-y-5">
                    {menu.collections.map((collection) => (
                      <li
                        key={collection.id}
                        className="text-general-title"
                      >
                        {collection.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE - FEATURED COLLECTION */}

            <div className="relative mb-4">
              <PageLink
                aria-label="View featured collection"
                href={`${SitePages.Collections}/${currentMenu?.collectionLink.handle}`}
              >
                <div
                  className={cx('h-[363px] overflow-hidden rounded-[10px]', {
                    'w-[312px]': !currentMenu?.isLarge,
                    'min-w-[739px]': currentMenu?.isLarge,
                  })}
                  style={{
                    maskImage: currentMenu?.isLarge ? undefined : 'url(/img/shared/nav-featured-card-mask-small.svg)',
                    maskSize: 'cover',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                  }}
                >
                  <OptimisedImage
                    src={currentMenu?.image?.url}
                    alt={currentMenu?.collectionLink.title}
                    layout="cover"
                    imgClassName="object-top"
                    className="h-full w-full"
                  />
                </div>
              </PageLink>
              <span className="absolute right-3 bottom-4.5 text-right text-[26px] font-bold whitespace-nowrap">
                {currentMenu?.featuredTitle}
              </span>
            </div>
          </AnimateOnUpdate>
        </div>
      </div>
    </>
  )
}

export default ShopMenuBar
