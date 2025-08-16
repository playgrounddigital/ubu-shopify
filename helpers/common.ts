import { Breakpoints } from '~/config/breakpoints'

export const disableScroll = (): string => (document.body.style.overflowY = 'hidden')
export const enableScroll = (): void => document.body.removeAttribute('style')

export const enableScrollWithFixedPosition = (): void => {
  document.body.removeAttribute('style')
  document.body.classList.remove('no-scroll')
}

export const isMobile = (): boolean => window.innerWidth < Breakpoints['md']
export const isTabletPortrait = (): boolean => window.innerWidth <= Breakpoints['md']
export const isTablet = (): boolean => window.innerWidth <= Breakpoints['lg']
export const isDesktop = (): boolean => window.innerWidth >= Breakpoints['lg']
export const isUnderMenuBreakpoint = (): boolean => window.innerWidth < Breakpoints['xl']
export const isUnder2xlBreakpoint = (): boolean => window.innerWidth < Breakpoints['2xl']
export const getCurrentYear = (): number => new Date().getFullYear()

export const saveToLocalStorage = (key: string, value: string): void => window.localStorage.setItem(key, value)

export const retrieveFromLocalStorage = (key: string): string | null => window.localStorage.getItem(key)

export const capitaliseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

export const smoothScrollIdIntoView = (id: string): void => {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element not found with selector: ${id}`)
    return
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const smoothScrollToTopOfPage = (): void => {
  // const isAlreadyAtTop = window.scrollY === 0
  // if (isAlreadyAtTop) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const DEFAULT_MARGIN = 72 // height of navbar

export const scrollToIdWithMargin = (id: string, margin?: number): void => {
  margin = margin ?? DEFAULT_MARGIN
  id = id.replace('#', '')
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element not found for selector ${id}`)
    return
  }
  const elementRect = element.getBoundingClientRect()
  const absoluteElementTop = elementRect.top + window.scrollY
  const scrollTo = absoluteElementTop - margin

  window.scrollTo({
    top: scrollTo,
    behavior: 'smooth',
  })
}

export const mapEnumToValues = <T extends { [key: string]: string | number }>(enumObj: T): T[keyof T][] => {
  return Object.values(enumObj) as T[keyof T][]
}

export const createMapsLink = (address: string) => {
  let query = address.replaceAll(' ', '+')
  // Replace \n with a space
  query = query.replaceAll('\n', '+')
  return `https://www.google.com/maps?q=${query}`
}

export const shareLink = ({ title, url }: { title: string; url: string }): void => {
  // Test if the browser supports the share API
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .then(() => {})
      .catch(console.error)
  }
  // Otherwise fallback to copying the URL to the clipboard
  else {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard')
    })
  }
}

export const createSlug = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
}

export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: ReturnType<typeof setTimeout> | undefined // Returns number in browsers, Timer in Node.js
  const debounced = (...args: Parameters<T>): void => {
    const later = () => {
      timeout = undefined
      func(...args)
    }

    clearTimeout(timeout) // Clear the timeout from previous calls
    timeout = setTimeout(later, wait) // Set a new timeout
  }

  return debounced as T
}

export const displayPlural = (text: string, count: number) => {
  if (count === 1 || count === -1) return text
  if (text.at(-1) === 's') return `${text}es`
  return `${text}s`
}

export const formatSecondsToTimeframe = (seconds: number) => {
  // Return e.g. 9d 8h 7m 6s
  const days = Math.floor(seconds / (24 * 60 * 60))
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  if (days) {
    return `${days}d`
  }
  if (hours) {
    return `${hours}h`
  }
  if (minutes) {
    return `${minutes}m`
  }
  return `${remainingSeconds}s`
}

// Formats a file name into a title. E.g. "my-file.pdf" -> "My File" and "my_file" -> "My File"
export const formatFileNameToTitle = (fileName: string): string => {
  return fileName
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => capitaliseFirstLetter(word))
    .join(' ')
}

export const shouldUseAOrAn = (word: string): string => {
  if (!word) return 'a'
  // If word ends in s, return an empty string
  if (word.at(-1) === 's') return ''
  const firstLetter = word.charAt(0).toLowerCase()
  return 'aeiou'.includes(firstLetter) ? 'an' : 'a'
}
