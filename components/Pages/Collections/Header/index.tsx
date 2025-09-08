import cx from 'classnames'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import useBreakpoints from '~/hooks/useBreakpoints'
import { Image } from '~/types/cms/common'
import { DatoCMSCollectionModel } from '~/types/cms/models/collection'
import { SearchContent } from '~/types/cms/pages/search'
import { ShopContent } from '~/types/cms/pages/shop'

interface HeaderProps {
  title?: string
  image?: Image
  content?: DatoCMSCollectionModel | ShopContent | SearchContent
  backgroundClassName?: string
}

const Header: FC<HeaderProps> = ({ title, image, content, backgroundClassName }) => {
  const { isMobile } = useBreakpoints()

  const _title = (() => {
    if (!content) return title || ''
    if ('shopifyCollection' in content) {
      return content.shopifyCollection.title
    }
    return content.title
  })()

  const _image = (() => {
    if (content && 'image' in content) {
      return content.image || (content as DatoCMSCollectionModel).shopifyCollection.image
    }
    if (image) return image
    return { url: '/img/collections/hats-collection.jpg' }
  })()

  return (
    <section className="pt-[126px]">
      <Container
        noPadding
        className="mb-5 flex flex-col-reverse gap-x-5 gap-y-2 lg:grid lg:h-[600px] lg:grid-cols-2"
      >
        {/* LINK BLOCk */}
        <div
          className={cx(
            'relative inline-flex h-[221px] items-end overflow-hidden p-4 pl-4.5 md:h-[270px] md:p-[30px] md:pl-10 lg:h-full',
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
                'text-[48px] leading-[58px] font-extrabold -tracking-[1.44px]': isMobile,
                'heading-1': _title.length < 4 && !isMobile,
                'text-collection-title': _title.length >= 4 && !isMobile,
              })}
            >
              {_title}
            </h1>
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <OptimisedImage
          src={_image?.url || '/img/collections/hats-collection.jpg'}
          alt={
            (_image as Image)?.smartTags
              ? joinSmartTagsIntoString((_image as Image).smartTags || [])
              : 'Image of children wearing hats looking down to the ground'
          }
          layout="cover"
          className="h-[333px] md:aspect-square md:h-full lg:aspect-auto"
        />
      </Container>
      {content && 'description' in content && (
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
