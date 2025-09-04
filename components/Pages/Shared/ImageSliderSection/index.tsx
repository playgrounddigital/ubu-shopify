import { FC } from 'react'
import Slider from 'react-slick'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { imageSliderSectionSliderSettings } from '~/components/Pages/Shared/ImageSliderSection/presets'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { ImageSliderSectionRecord } from '~/types/cms/models/product-content'

interface ImageSliderSectionProps {
  content: ImageSliderSectionRecord
}

const ImageSliderSection: FC<ImageSliderSectionProps> = ({ content }) => {
  return (
    <section className="max-w-[100vw] overflow-x-hidden pb-5">
      <Slider
        {...imageSliderSectionSliderSettings}
        className="w-full overflow-hidden"
      >
        {content.images.map((image) => (
          <OptimisedImage
            key={image.id}
            src={image.url}
            alt={joinSmartTagsIntoString(image.smartTags)}
            layout="cover"
            className="mr-5 h-[237px] w-[178px] rounded-[10px] md:h-[406px] md:w-[305px]"
          />
        ))}
      </Slider>
    </section>
  )
}

export default ImageSliderSection
