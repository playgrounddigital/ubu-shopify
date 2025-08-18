'use client'
import { FC } from 'react'
import Header from '~/components/Pages/Home/Header'
import DoubleLinkImageSection from '~/components/Pages/Shared/DoubleLinkImageSectionRecord'
import DoubleLinkSection from '~/components/Pages/Shared/DoubleLinkSection'
import FeaturedProductsSection from '~/components/Pages/Shared/FeaturedProductsSection'
import FullWidthBannerSection from '~/components/Pages/Shared/FullWidthBannerSection'
import IntroSection from '~/components/Pages/Shared/IntroSection'
import ReasonsSection from '~/components/Pages/Shared/ReasonsSection'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { HomeContent } from '~/types/cms/pages/home'
import { Product } from '~/types/shopify'

export interface HomePageSectionProps {
  content: HomeContent
}

interface HomePageProps {
  products: Product[]
  content: HomeContent
}

const HomePage: FC<HomePageProps> = ({ products, content }) => {
  return (
    <>
      <Header content={content} />
      {content.content.map((section) => {
        switch (section.__typename) {
          case 'IntroSectionRecord':
            return (
              <IntroSection
                key={section.id}
                content={section}
              />
            )
          case 'TextMarqueeSectionRecord':
            return (
              <TextMarqueeSection
                key={section.id}
                content={section}
              />
            )
          case 'DoubleLinkSectionRecord':
            return (
              <DoubleLinkSection
                key={section.id}
                content={section}
              />
            )
          case 'ReasonsSectionRecord':
            return (
              <ReasonsSection
                key={section.id}
                content={section}
              />
            )
          case 'DoubleLinkImageSectionRecord':
            return (
              <DoubleLinkImageSection
                key={section.id}
                content={section}
              />
            )
          case 'FeaturedProductsSectionRecord':
            return (
              <FeaturedProductsSection
                key={section.id}
                products={products}
                content={section}
              />
            )
          case 'FullWidthBannerSectionRecord':
            return (
              <FullWidthBannerSection
                key={section.id}
                content={section}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}

export default HomePage
