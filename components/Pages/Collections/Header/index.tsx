import cx from 'classnames'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { DatoCMSCollectionModel } from '~/types/cms/models/collection'
import { ShopContent } from '~/types/cms/pages/shop'

interface HeaderProps {
  title?: string
  content?: DatoCMSCollectionModel | ShopContent
}

const Header: FC<HeaderProps> = ({ title, content }) => {
  const _title = (() => {
    if (!content) return title || ''
    if ('shopifyCollection' in content) {
      return content.shopifyCollection.title
    }
    return content.title
  })()

  return (
    <section className="pt-[126px]">
      <Container className="mb-5 grid h-[600px] gap-x-5 gap-y-2 lg:grid-cols-2">
        {/* LINK BLOCk */}
        <div
          className={cx('relative inline-flex h-full items-end overflow-hidden p-[30px] pl-10', {
            'bg-yellow': !content?.backgroundColour,
          })}
          style={{
            backgroundColor: content?.backgroundColour,
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
          src={content?.image?.url || '/img/collections/hats-collection.jpg'}
          alt={
            content
              ? joinSmartTagsIntoString(content.image.smartTags || [])
              : 'Image of children wearing hats looking down to the ground'
          }
          layout="cover"
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
