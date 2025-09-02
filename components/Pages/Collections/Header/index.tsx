import cx from 'classnames'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { Image } from '~/types/cms/common'
import { DatoCMSCollectionModel } from '~/types/cms/models/collection'
import { ShopContent } from '~/types/cms/pages/shop'

interface HeaderProps {
  title?: string
  image?: Image
  content?: DatoCMSCollectionModel | ShopContent
  backgroundClassName?: string
}

const Header: FC<HeaderProps> = ({ title, image, content, backgroundClassName }) => {
  const _title = (() => {
    if (!content) return title || ''
    if ('shopifyCollection' in content) {
      return content.shopifyCollection.title
    }
    return content.title
  })()

  const _image = (() => {
    if (!content) return image || { url: '/img/collections/hats-collection.jpg' }
    if ('shopifyCollection' in content) {
      return content.shopifyCollection.image
    }
    return content.image
  })()

  return (
    <section className="pt-[126px]">
      <Container className="mb-5 flex flex-col-reverse gap-x-5 gap-y-2 lg:grid lg:h-[600px] lg:grid-cols-2">
        {/* LINK BLOCk */}
        <div
          className={cx(
            'relative inline-flex h-[221px] items-end overflow-hidden p-[30px] pl-10 md:h-[270px] lg:h-full',
            {
              'bg-yellow': !content?.backgroundColour && !backgroundClassName,
            },
            backgroundClassName
          )}
          style={{
            backgroundColor: backgroundClassName ? undefined : content?.backgroundColour,
          }}
        >
          <div className="relative z-10 flex w-full items-end justify-between">
            {/* LEFT SIDE */}
            <h1
              className={cx({
                'heading-1': _title.length < 4,
                'text-collection-title': _title.length >= 4,
              })}
            >
              {_title}
            </h1>
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <OptimisedImage
          src={_image.url}
          alt={
            (_image as Image).smartTags
              ? joinSmartTagsIntoString((_image as Image).smartTags || [])
              : 'Image of children wearing hats looking down to the ground'
          }
          layout="cover"
          className="h-[333px] md:aspect-square md:h-full lg:aspect-auto"
        />
      </Container>
      {content && (
        <div className="bg-black pt-[100px] pb-[43px]">
          <Container>
            <p className="text-introduction max-w-[824px] text-white">{content.description}</p>
          </Container>
        </div>
      )}
    </section>
  )
}

export default Header
