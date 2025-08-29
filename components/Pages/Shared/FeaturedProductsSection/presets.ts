import { Settings } from 'react-slick'

export const featuredProductsSliderSettings: Settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  draggable: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 9999,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 3,
        variableWidth: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        variableWidth: true,
      },
    },
  ],
}
