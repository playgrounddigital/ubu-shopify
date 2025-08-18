import cx from 'classnames'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { DoubleLinkImageSectionRecord } from '~/types/cms/pages/home'

interface DoubleLinkImageSectionProps {
  content: DoubleLinkImageSectionRecord
}

const DoubleLinkImageSection: FC<DoubleLinkImageSectionProps> = ({ content }) => {
  return (
    <section>
      <Container className="grid h-[600px] gap-x-5 gap-y-2 pt-5 lg:grid-cols-2">
        {/* LINK BLOCk */}
        <div
          className={cx('relative inline-flex h-full items-end overflow-hidden p-[30px] pl-10', {
            'order-1': content.shouldSwapOrder,
          })}
          style={{
            backgroundColor: content.linkBlock.backgroundColour,
          }}
        >
          <div className="relative z-10 flex w-full items-end justify-between">
            {/* LEFT SIDE */}
            <p className="heading-3">
              {content.linkBlock.lineOne}
              <br />
              {content.linkBlock.lineTwo}
            </p>

            {/* RIGHT SIDE */}
            <Button
              variant="white-black"
              size="sm"
            >
              {content.linkBlock.buttonText}
            </Button>
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <OptimisedImage
          src={content.image.url}
          alt={joinSmartTagsIntoString(content.image.smartTags)}
          layout="cover"
        />
      </Container>
    </section>
  )
}

export default DoubleLinkImageSection
