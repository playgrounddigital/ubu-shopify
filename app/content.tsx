'use client'
import { FC } from 'react'
import HeroSlider from '~/components/Pages/Home/Header/Slider'
import { HomeContent } from '~/types/cms/pages/home'

export interface HomePageProps {
  content: HomeContent
}

const HomePage: FC<HomePageProps> = ({ content }) => {
  return (
    <>
      <HeroSlider content={content} />
    </>
  )
}

export default HomePage
