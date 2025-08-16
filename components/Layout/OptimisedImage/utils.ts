import { IMAGE_SIZES_MOBILE } from '~/components/Layout/OptimisedImage/constants'
import { Breakpoints } from '~/config/breakpoints'

export const createSizesString = (desktopSize: string, tabletSize: string, mobileSize: string) => {
  return `(max-width: ${Breakpoints['md'] - 1}px) ${IMAGE_SIZES_MOBILE[mobileSize]}, (min-width: ${Breakpoints['md']}px) ${tabletSize}, (min-width: ${Breakpoints['lg']}px) ${desktopSize}`
}
