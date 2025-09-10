import { Settings } from 'react-slick'
import { Breakpoints } from '~/config/breakpoints'

export const productImageGallerySliderSettings: Settings = {
  dots: false,
  arrows: false,
  infinite: false,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: Breakpoints.xl,
      settings: {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: false,
        pauseOnHover: false,
      },
    },
  ],
}
