export type ButtonSize = 'sm' | 'md'

export type ButtonColours = 'white-black' | 'black-green' | 'black-pink' | 'black-yellow' | 'white-blue'

export const defaultButtonClasses =
  'group relative font-mono flex select-none items-center justify-between gap-x-2 overflow-hidden border uppercase font-normal transition-all'

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: 'h-[34px] px-4 text-base tracking-[0.1px]',
  md: 'h-11 md:h-[58px] px-5 md:px-[27px] text-[23px] leading-[45.5px]',
}

export const BUTTON_CIRCLE_SIZE: Record<ButtonSize, string> = {
  sm: 'size-[34px] min-w-[34px]',
  md: 'size-11 md:size-[58px] min-w-11 md:min-w-[58px]',
}

export const BUTTON_ARROW_SIZE: Record<ButtonSize, string> = {
  sm: 'size-[15px] min-w-[15px] min-h-[15px]',
  md: 'size-[26px] min-w-[26px] min-h-[26px]',
}

export const BUTTON_COLOURS: Record<
  ButtonColours,
  {
    button: string
    background: string
  }
> = {
  'white-black': {
    button: 'text-white',
    background: 'bg-black',
  },
  'black-green': {
    button: 'text-black',
    background: 'bg-green',
  },
  'black-pink': {
    button: 'text-black',
    background: 'bg-pink',
  },
  'black-yellow': {
    button: 'text-black',
    background: 'bg-yellow',
  },
  'white-blue': {
    button: 'text-white',
    background: 'bg-blue',
  },
}
