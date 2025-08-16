'use client'
import cx from 'classnames'
import { Doto, Geist, IBM_Plex_Mono, Instrument_Serif } from 'next/font/google'
import { ReactNode, Suspense } from 'react'
import AnimateLayout from '~/components/Layout/AnimateLayout'
import ErrorBoundary from '~/components/Layout/ErrorBoundary'
import Footer from '~/components/Layout/Nav/Footer'
import Navbar from '~/components/Layout/Nav/Navbar'
import MobileNavbar from '~/components/Layout/Nav/Navbar/MobileNavbar'
import ContactModalProvider from '~/context/ContactFormModalContext'
import { HomeLoadingScreenContextProvider } from '~/context/HomeLoadingScreenContext'
import PageTransitionProvider from '~/context/PageTransitionContext'
import '~/styles/styles.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: '400',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const doto = Doto({
  subsets: ['latin'],
  variable: '--font-doto',
  display: 'swap',
  weight: ['400'],
})

export default ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={cx('no-scroll', geist.variable, instrumentSerif.variable, ibmPlexMono.variable, doto.variable)}>
        <ErrorBoundary>
          <PageTransitionProvider>
            <ContactModalProvider>
              <HomeLoadingScreenContextProvider>
                <Suspense>
                  <Navbar />
                  <MobileNavbar />
                  <AnimateLayout>
                    {children}
                    <Footer />
                  </AnimateLayout>
                </Suspense>
              </HomeLoadingScreenContextProvider>
            </ContactModalProvider>
          </PageTransitionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
