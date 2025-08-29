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
      <Container className="flex flex-col gap-y-2 pt-5 lg:grid lg:h-[600px] lg:grid-cols-2 lg:gap-x-5">
        {/* LINK BLOCk */}
        <div
          className={cx(
            'relative inline-flex h-[277px] items-end overflow-hidden p-[30px] pl-10 md:h-[480px] lg:h-full',
            {
              'order-1': content.shouldSwapOrder,
            }
          )}
          style={{
            backgroundColor: content.linkBlock.backgroundColour,
          }}
        >
          <div className="relative z-10 flex w-full items-end justify-between">
            {/* LEFT SIDE */}
            <p className="heading-3">
              {content.linkBlock.lineOne}
              {content.linkBlock.lineTwo && (
                <>
                  <br />
                  {content.linkBlock.lineTwo}
                </>
              )}
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
          className="h-[480px] lg:h-full"
        />
      </Container>
    </section>
  )
}

export default DoubleLinkImageSection
