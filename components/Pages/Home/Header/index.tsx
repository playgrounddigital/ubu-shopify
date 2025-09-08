import cx from 'classnames'
import { FC } from 'react'
import Slider from 'react-slick'
import { HomePageSectionProps } from '~/app/content'
import AutoplayVimeoVideo from '~/components/Layout/AutoplayVimeoVideo'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { heroSliderSettings } from '~/components/Pages/Home/Header/presets'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import useBreakpoints from '~/hooks/useBreakpoints'
import RectangleBackground from '~/public/img/home/header/rectangle-background.svg'

const Header: FC<HomePageSectionProps> = ({ content }) => {
  const { isTablet } = useBreakpoints()

  return (
    <section className="relative z-0 overflow-hidden lg:aspect-video">
      <Slider {...heroSliderSettings}>
        {content.heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative"
          >
            {slide.useVideo && !!slide.vimeoVideo ? (
              <>
                <AutoplayVimeoVideo
                  isFullScreen={isTablet}
                  src={slide.vimeoVideo.url}
                  autoplay
                  loop
                  wrapperClassName="lg:scale-[1.1] 2xl:scale-[1.16] lg:aspect-video"
                  className={cx('h-svh lg:max-h-[calc(100vw*0.0.5625)] lg:w-screen lg:max-w-[100vw]', {
                    'xxs:hidden lg:flex': !!slide.vimeoVideoMobile?.url,
                  })}
                />
                {!!slide.vimeoVideoMobile?.url && (
                  <AutoplayVimeoVideo
                    src={slide.vimeoVideoMobile.url}
                    autoplay
                    loop
                    className="lg:hidden"
                  />
                )}
              </>
            ) : (
              <OptimisedImage
                src={slide.image.url}
                alt={joinSmartTagsIntoString(slide.image.smartTags)}
                layout="cover"
                imgClassName="object-bottom"
                className="h-svh w-full xl:aspect-video xl:h-auto"
              />
            )}
            {/* Text overlay on top */}
            <Container className="!absolute bottom-0 left-1/2 flex -translate-x-1/2 justify-end pb-22 md:pb-6">
              <div className="relative pt-4 pr-3.5 pb-3.5 pl-[31px] lg:pt-2">
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
