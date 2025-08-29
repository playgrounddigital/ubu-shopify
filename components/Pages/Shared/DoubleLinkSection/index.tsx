import cx from 'classnames'
import { FC } from 'react'
import CircleButton from '~/components/Layout/Button/Circle'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import LinkOneLineOneRectangle from '~/public/img/home/double-link-section/link-one-line-one-rectangle.svg'
import LinkOneLineTwoRectangle from '~/public/img/home/double-link-section/link-one-line-two-rectangle.svg'
import LinkTwoLineOneRectangle from '~/public/img/home/double-link-section/link-two-line-one-rectangle.svg'
import LinkTwoLineTwoRectangle from '~/public/img/home/double-link-section/link-two-line-two-rectangle.svg'
import { DoubleLinkSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'

const rectangleClassNames = {
  0: {
    lineOne: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-1/2',
    lineTwo: 'absolute -top-0.5 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-1/2',
  },
  1: {
    lineOne: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-[calc(50%-8px)]',
    lineTwo: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+24px)] -translate-x-[calc(50%+2px)]',
  },
}

interface DoubleLinkSectionProps {
  content: DoubleLinkSectionRecord
}

const DoubleLinkSection: FC<DoubleLinkSectionProps> = ({ content }) => {
  return (
    <section>
      <Container
        noPaddingTablet
        noPaddingMobile
        className="flex flex-col gap-y-2 pt-5 lg:grid lg:h-[600px] lg:grid-cols-2 lg:gap-x-5"
      >
        {content.linkBlocks.map((linkBlock, i) => {
          const LineOneRectangle = i === 0 ? LinkOneLineOneRectangle : LinkTwoLineOneRectangle
          const LineTwoRectangle = i === 0 ? LinkOneLineTwoRectangle : LinkTwoLineTwoRectangle
          const link = (() => {
            if (!linkBlock.link) {
              return SitePages.Shop
            }
            if (linkBlock.link.collection) {
              return `${SitePages.Collections}/${linkBlock.link.collection.handle}`
            }
            if (linkBlock.link.product) {
              return `${SitePages.Products}/${linkBlock.link.product.product.handle}`
            }
          })()

          return (
            <div
              key={linkBlock.id}
              className="relative inline-flex h-[480px] items-end overflow-hidden p-[30px] pl-10 lg:h-full"
            >
              <OptimisedImage
                src={linkBlock.image.url}
                alt={joinSmartTagsIntoString(linkBlock.image.smartTags)}
                layout="cover"
                className="absolute inset-0"
              />
              <div className="relative z-10 flex w-full items-end justify-between">
                {/* LEFT SIDE */}
                <div
                  className={cx({
                    'text-white': i === 0,
                  })}
                >
                  <div className="relative w-fit">
                    <LineOneRectangle className={rectangleClassNames[i].lineOne} />
                    <span className="heading-3 relative z-10">{linkBlock.lineOne}</span>
                  </div>
                  <div className="relative w-fit">
                    <LineTwoRectangle className={rectangleClassNames[i].lineTwo} />
                    <span className="heading-3 relative z-10">{linkBlock.lineTwo}</span>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <PageLink href={link}>
                  <CircleButton
                    ariaLabel="Open link"
                    variant={i === 0 ? 'white-black' : 'black-green'}
                  />
                </PageLink>
              </div>
            </div>
          )
        })}
      </Container>
    </section>
  )
}

export default DoubleLinkSection
