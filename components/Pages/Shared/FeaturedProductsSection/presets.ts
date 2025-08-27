import { Settings } from 'react-slick'

export const featuredProductsSliderSettings: Settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  swipe: true,
  draggable: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 9999,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        variableWidth: true,
      },
    },
  ],
}
