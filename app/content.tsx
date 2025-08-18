'use client'
import { FC } from 'react'
import Header from '~/components/Pages/Home/Header'
import DoubleLinkSection from '~/components/Pages/Shared/DoubleLinkSection'
import IntroSection from '~/components/Pages/Shared/IntroSection'
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
          default:
            return null
        }
      })}
    </>
  )
}

export default HomePage
