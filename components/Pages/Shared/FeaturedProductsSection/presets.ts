import { Settings } from 'react-slick'

export const featuredProductsSliderSettings: Settings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  swipe: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  draggable: true,
  responsive: [
    {
      breakpoint: 9999,
      settings: 'unslick',
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
