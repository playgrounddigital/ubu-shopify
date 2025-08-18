import { FC } from 'react'
import Slider from 'react-slick'
import { HomePageSectionProps } from '~/app/content'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { heroSliderSettings } from '~/components/Pages/Home/Header/presets'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import RectangleBackground from '~/public/img/home/header/rectangle-background.svg'

const Header: FC<HomePageSectionProps> = ({ content }) => {
  return (
    <section className="relative z-0 h-svh overflow-hidden">
      <Slider {...heroSliderSettings}>
        {content.heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative"
          >
            <OptimisedImage
              src={slide.image.url}
              alt={joinSmartTagsIntoString(slide.image.smartTags)}
              layout="cover"
              imgClassName="object-bottom"
              className="h-svh w-full"
            />
            {/* Text overlay on top */}
            <Container className="!absolute bottom-0 left-1/2 flex -translate-x-1/2 justify-end pb-6">
              <div className="relative pt-2 pr-3.5 pb-3.5 pl-[31px]">
                <p className="text-subheading relative z-10 max-w-[259px] text-white">{slide.description}</p>
                <RectangleBackground className="absolute inset-0" />
              </div>
            </Container>
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default Header
