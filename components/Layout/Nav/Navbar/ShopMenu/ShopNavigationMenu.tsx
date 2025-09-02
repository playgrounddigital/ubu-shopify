import cx from 'classnames'
import { FC } from 'react'
import AnimateOnUpdate from '~/components/Layout/AnimateOnUpdate'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { ShopNavigationMenu as ShopNavigationMenuType } from '~/types/cms/models/shop-navigation-menu'
import { SitePages } from '~/types/pages'

interface ShopNavigationMenuProps {
  currentMenu: ShopNavigationMenuType | undefined
  currentHoveredMenu: string | null
  isBannerActive: boolean
  isOpen: boolean
  onClose: () => void
}

const ShopNavigationMenu: FC<ShopNavigationMenuProps> = ({
  currentMenu,
  currentHoveredMenu,
  isBannerActive,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={cx('fixed left-1/2 z-40 w-full max-w-[1340px] -translate-x-1/2 pt-5 transition-all', {
        'pointer-events-none -translate-y-4 opacity-0': !currentHoveredMenu || !isOpen,
        'top-[190px]': isBannerActive,
        'top-[152px]': !isBannerActive,
      })}
    >
      <div className="mx-auto min-h-[418px] rounded-[10px] bg-white p-[30px] pl-12 shadow-shop-nav-menu">
        <AnimateOnUpdate
          duration={0.25}
          disableTransition={currentHoveredMenu === null}
          updateKey={currentHoveredMenu}
          className="flex justify-between gap-x-4"
        >
          <div
            className="grid w-fit"
            style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr)` }}
          >
            {currentMenu?.menuLists.map((menu) => (
              <div key={menu.id}>
                <h3 className="mb-5 font-bold uppercase">{menu.title}</h3>
                <ul className="flex min-w-[259px] flex-col gap-y-5">
                  {menu.collections.map((collection) => (
                    <li key={collection.id}>
                      <PageLink
                        href={`${SitePages.Collections}/${collection.collection.handle}`}
                        onClick={onClose}
                        className="text-general-title hover:underline"
                      >
                        {collection.title}
                      </PageLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - FEATURED COLLECTION */}
          <div className="group/card relative">
            <PageLink
              aria-label="View featured collection"
              href={`${SitePages.Collections}/${currentMenu?.collectionLink.handle}`}
              onClick={onClose}
            >
              <div
                className={cx('relative h-[363px] overflow-hidden rounded-[10px]', {
                  'w-[312px]': !currentMenu?.isLarge,
                  'min-w-[739px]': currentMenu?.isLarge,
                })}
                style={{
                  maskImage: currentMenu?.isLarge ? undefined : 'url(/img/shared/nav-featured-card-mask-small.svg)',
                  // backgroundImage: currentMenu?.isLarge
                  //   ? 'url(/img/shared/nav-featured-card-mask-large.svg)'
                  //   : undefined,
                  maskSize: 'cover',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                }}
              >
                {/* Show background image */}
                {currentMenu?.isLarge && (
                  <OptimisedImage
                    src="/img/shared/nav-featured-card-mask-large.svg"
                    alt=""
                    layout="contain"
                    className="absolute inset-0"
                  />
                )}
                <OptimisedImage
                  src={currentMenu?.image?.url}
                  alt={currentMenu?.collectionLink.title}
                  layout={currentMenu?.isLarge ? 'contain' : 'cover'}
                  imgClassName={cx('object-top transition-transform transform-gpu', {
                    'group-hover/card:scale-105': !currentMenu?.isLarge,
                    'group-hover/card:scale-[1.02]': currentMenu?.isLarge,
                  })}
                  className={cx('h-full w-full', {
                    'mix-blend-darken': currentMenu?.isLarge,
                  })}
                />
              </div>
            </PageLink>
            <span
              className={cx('absolute text-right text-[26px] font-bold whitespace-nowrap', {
                'right-3 bottom-4.5': !currentMenu?.isLarge,
                'right-1 bottom-5': currentMenu?.isLarge,
              })}
            >
              {currentMenu?.featuredTitle}
            </span>
          </div>
        </AnimateOnUpdate>
      </div>
    </div>
  )
}

export default ShopNavigationMenu
