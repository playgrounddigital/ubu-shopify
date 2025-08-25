import { SitePages } from '~/types/pages'

export const navLinks = [
  {
    label: 'Shop',
    href: SitePages.Shop,
    backgroundColour: 'bg-pink',
  },
  {
    label: 'Gifts',
    href: `${SitePages.Collections}/gifts`,
    backgroundColour: 'bg-yellow',
  },
  {
    label: 'About',
    href: SitePages.About,
    backgroundColour: 'bg-blue',
    className: 'text-white',
  },
]
