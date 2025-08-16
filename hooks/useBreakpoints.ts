import { useEffect, useState } from 'react'
import {
  isDesktop as isDesktopCheck,
  isMobile as isMobileCheck,
  isTablet as isTabletCheck,
  isTabletPortrait as isTabletPortraitCheck,
  isUnder2xlBreakpoint as isUnder2xlBreakpointCheck,
  isUnderMenuBreakpoint as isUnderMenuBreakpointCheck,
} from '~/helpers/common'

const useBreakpoints = (): {
  isMobile: boolean
  isTabletPortrait: boolean
  isTablet: boolean
  isDesktop: boolean
  isUnderMenuBreakpoint: boolean
  isUnder2xlBreakpoint: boolean
} => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTabletPortrait, setIsTabletPortrait] = useState(false)
  const [isUnderMenuBreakpoint, setIsUnderMenuBreakpoint] = useState(false)
  const [isUnder2xlBreakpoint, setIsUnder2xlBreakpoint] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(isTabletCheck())
      setIsMobile(isMobileCheck())
      setIsTabletPortrait(isTabletPortraitCheck())
      setIsDesktop(isDesktopCheck())
      setIsUnderMenuBreakpoint(isUnderMenuBreakpointCheck())
      setIsUnder2xlBreakpoint(isUnder2xlBreakpointCheck())
    }

    handleResize() // initial check

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile, isTabletPortrait, isTablet, isDesktop, isUnderMenuBreakpoint, isUnder2xlBreakpoint }
}

export default useBreakpoints
