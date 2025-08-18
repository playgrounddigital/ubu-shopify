'use client'
import cx from 'classnames'
import { Inter } from 'next/font/google'
import { ReactNode, Suspense } from 'react'
import AnimateLayout from '~/components/Layout/AnimateLayout'
import ErrorBoundary from '~/components/Layout/ErrorBoundary'
import Footer from '~/components/Layout/Nav/Footer'
import Navbar from '~/components/Layout/Nav/Navbar'
import CartProvider from '~/context/CartContext'
import PageTransitionProvider from '~/context/PageTransitionContext'
import '~/styles/styles.css'

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
          <PageTransitionProvider>
            <CartProvider>
              <Suspense>
                <Navbar />
                <AnimateLayout>
                  {children}
                  <Footer />
                </AnimateLayout>
              </Suspense>
            </CartProvider>
          </PageTransitionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
