'use client'
import { usePathname, useRouter } from 'next/navigation'
import { FC, MouseEventHandler, ReactNode, createContext, use, useTransition } from 'react'
import { DELAY } from '~/context/PageTransitionContext/presets'
import { noop, sleep } from '~/context/PageTransitionContext/utils'
import { smoothScrollToTopOfPage } from '~/helpers/common'

interface PageTransitionContextState {
  pending: boolean
  navigate: (url: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextState>({
  pending: false,
  navigate: noop,
})

interface PageTransitionProviderProps {
  children: ReactNode
}

const PageTransitionProvider: FC<PageTransitionProviderProps> = ({ children }) => {
  const pathname = usePathname()
  const [pending, start] = useTransition()
  const router = useRouter()

  const navigate = (href: string) => {
    start(async () => {
      router.push(href)
      await sleep(DELAY)
    })
  }

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const a = (e.target as Element).closest('a')
    if (a) {
      const href = a.getAttribute('href')
      const isSameHref = href && href === pathname
      const isInternalLink = href && !href.startsWith('/')
      const hasIgnoreAttribute = a.hasAttribute('data-ignore-page-transition')
      if (hasIgnoreAttribute) return

      if (!isInternalLink) {
        e.preventDefault()

        // If not the same href, navigate to the new href
        if (!isSameHref) {
          // If the build is Extension, we want to use the router to navigate within the page transitions
          navigate(href)
        } else {
          smoothScrollToTopOfPage()
        }
      }
    }
  }

  return (
    <PageTransitionContext.Provider value={{ pending, navigate }}>
      <div onClickCapture={onClick}>{children}</div>
    </PageTransitionContext.Provider>
  )
}

export default PageTransitionProvider

export const usePageTransitionContext = () => {
  const context = use(PageTransitionContext)
  if (!context) throw new Error('usePageTransitionContext must be used within a PageTransitionProvider')
  return context
}
