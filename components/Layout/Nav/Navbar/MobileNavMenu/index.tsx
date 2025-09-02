'use client'
import cx from 'classnames'
import { FC, useEffect, useMemo, useState } from 'react'
import MobileNavMenuFeatured from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavMenuFeatured'
import MobileNavMenuRoot from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavMenuRoot'
import MobileNavMenuShop from '~/components/Layout/Nav/Navbar/MobileNavMenu/MobileNavMenuShop'
import { TIMEOUT_500MS } from '~/constants/timeouts'
import allShopNavigationMenusJSON from '~/public/all-shop-navigation-menus.json'
import { ShopNavigationMenu as ShopNavigationMenuType } from '~/types/cms/models/shop-navigation-menu'

interface MobileNavMenuProps {
  isOpen: boolean
  isAuthenticated?: boolean
  onClose: () => void
}

// Mobile navigation has three states:
// 1) Root list (Shop, Gifts, About) + sign in CTA
// 2) Shop categories list (from allShopNavigationMenusJSON)
// 3) Featured collection card (repurposed from desktop ShopNavigationMenu)
const MobileNavMenu: FC<MobileNavMenuProps> = ({ isOpen, isAuthenticated, onClose }) => {
  const [activeView, setActiveView] = useState<'root' | 'shop' | 'featured'>('root')
  const [currentShopMenuId, setCurrentShopMenuId] = useState<string | null>(null)

  const currentMenu = useMemo(
    () => allShopNavigationMenusJSON.find((m) => m.id === currentShopMenuId) as ShopNavigationMenuType | undefined,
    [currentShopMenuId]
  )

  const openShop = () => setActiveView('shop')
  const closeShop = () => setActiveView('root')

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setActiveView('root')
        setCurrentShopMenuId(null)
      }, TIMEOUT_500MS)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const openFeatured = (menuId: string) => {
    setCurrentShopMenuId(menuId)
    setActiveView('featured')
  }
  const closeFeatured = () => setActiveView('shop')

  return (
    <div
      aria-hidden={!isOpen}
      className={cx(
        'fixed inset-0 z-40 h-dvh overflow-hidden bg-black/70 backdrop-blur-[12px] transition-all lg:hidden',
        {
          'pointer-events-none opacity-0': !isOpen,
        }
      )}
    >
      {/* Header bar with close */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-sm font-medium uppercase">Menu</span>
        <span className="w-6" />
      </div>

      {/* Views wrapper for horizontal slide between levels */}
      <div className="relative h-[calc(100dvh-46px)] overflow-hidden">
        <div
          className={cx('absolute inset-0 flex w-[300%] transition-transform', {
            'translate-x-0': activeView === 'root',
            '-translate-x-1/3': activeView === 'shop',
            '-translate-x-2/3': activeView === 'featured',
          })}
          style={{ willChange: 'transform' }}
        >
          {/* Level 1: Root */}
          <MobileNavMenuRoot
            isOpen={isOpen}
            isAuthenticated={isAuthenticated}
            onClose={onClose}
            onOpenShop={openShop}
          />

          {/* Level 2: Shop categories */}
          <MobileNavMenuShop
            isOpen={isOpen}
            onClose={onClose}
            onBack={closeShop}
            onOpenFeatured={openFeatured}
          />

          {/* Level 3: Featured collection (repurposed from desktop) */}
          <MobileNavMenuFeatured
            isOpen={isOpen}
            menu={currentMenu}
            onClose={onClose}
            onBack={closeFeatured}
          />
        </div>
      </div>
    </div>
  )
}

export default MobileNavMenu
