export type ButtonColours = 'primary' | 'border'
export type ButtonSize = 36

export type CircleButtonColours = 'white-black' | 'black-green'

export const defaultButtonClasses =
  'group relative font-mono flex select-none items-center justify-between gap-x-2 overflow-hidden border text-[9.5px] leading-4 tracking-[0.765px] uppercase font-normal transition-all'

export const BUTTON_SIZE: Record<ButtonSize, string> = {
  36: 'pl-3 pr-2',
}

export const CIRCLE_BUTTON_COLOURS: Record<
  CircleButtonColours,
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
}
