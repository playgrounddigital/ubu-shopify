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

export interface HomePageProps {
  content: HomeContent
}

const HomePage: FC<HomePageProps> = ({ content }) => {
  return (
    <>
      <Header content={content} />
      {content.content.map((section) => {
        switch (section.__typename) {
          case 'IntroSectionRecord':
            return <IntroSection content={section} />
          case 'TextMarqueeSectionRecord':
            return <TextMarqueeSection content={section} />
          case 'DoubleLinkSectionRecord':
            return <DoubleLinkSection content={section} />
          case 'ReasonsSectionRecord':
            return <ReasonsSection content={section} />
          case 'DoubleLinkImageSectionRecord':
            return <DoubleLinkImageSection content={section} />
          case 'FeaturedProductsSectionRecord':
            return <FeaturedProductsSection content={section} />
          case 'FullWidthBannerSectionRecord':
            return <FullWidthBannerSection content={section} />
          default:
            return null
        }
      })}
    </>
  )
}

export default HomePage
