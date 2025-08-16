import { Breakpoints } from '~/config/breakpoints'

export type ImageSizes = 'full' | 'half' | 'third' | 'quarter'

export const IMAGE_SIZES_DESKTOP: Record<ImageSizes, string> = {
  full: `(max-width: ${Breakpoints['max']}px) 1360px`,
  half: `(max-width: ${Breakpoints['max']}px) 680px`,
  third: `(max-width: ${Breakpoints['max']}px) 453px`,
  quarter: `(max-width: ${Breakpoints['max']}px) 340px`,
}

export const IMAGE_SIZES_TABLET: Record<ImageSizes, string> = {
  full: `(max-width: ${Breakpoints['lg']}px) 100vw`,
  half: `(max-width: ${Breakpoints['lg']}px) 50vw`,
  third: `(max-width: ${Breakpoints['lg']}px) 33vw`,
  quarter: `(max-width: ${Breakpoints['lg']}px) 25vw`,
}

export const IMAGE_SIZES_MOBILE: Record<ImageSizes, string> = {
  full: `(max-width: ${Breakpoints['md']}px) 767px`,
  half: `(max-width: ${Breakpoints['md']}px) 50vw`,
  third: `(max-width: ${Breakpoints['md']}px) 33vw`,
  quarter: `(max-width: ${Breakpoints['md']}px) 25vw`,
}
