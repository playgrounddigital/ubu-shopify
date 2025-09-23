'use client'
import { GoogleAnalytics } from '@next/third-parties/google'
import cx from 'classnames'
import { Inter } from 'next/font/google'
import { ReactNode, Suspense } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import AnimateLayout from '~/components/Layout/AnimateLayout'
import ErrorBoundary from '~/components/Layout/ErrorBoundary'
import Footer from '~/components/Layout/Nav/Footer'
import Navbar from '~/components/Layout/Nav/Navbar'
import PromoBanner from '~/components/Layout/PromoBanner'
import AuthProvider from '~/context/AuthContext'
import CartProvider from '~/context/CartContext'
import PageTransitionProvider from '~/context/PageTransitionContext'
import promoBannerJSON from '~/public/promo-banner.json'
import '~/styles/styles.css'

const isBannerActive = promoBannerJSON.isBannerActive

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
if (!GA_ID) {
  throw new Error('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is not set')
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={cx(inter.variable)}>
        <ErrorBoundary>
          <GoogleAnalytics gaId={GA_ID} />
          <PageTransitionProvider>
            <AuthProvider>
              <CartProvider>
                <Suspense>
                  <Navbar />
                  {isBannerActive && <PromoBanner content={promoBannerJSON} />}
                  <AnimateLayout>
                    {children}
                    <Footer />
                  </AnimateLayout>
                </Suspense>
              </CartProvider>
            </AuthProvider>
          </PageTransitionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
