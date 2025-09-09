import cx from 'classnames'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { DoubleLinkImageSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'

interface DoubleLinkImageSectionProps {
  content: DoubleLinkImageSectionRecord
}

const DoubleLinkImageSection: FC<DoubleLinkImageSectionProps> = ({ content }) => {
  return (
    <section>
      <Container
        noPaddingTablet
        noPaddingMobile
        className="flex flex-col gap-y-2 pt-5 lg:grid lg:h-[600px] lg:grid-cols-2 lg:gap-x-5"
      >
        {/* LINK BLOCk */}
        <div
          className={cx(
            'relative inline-flex h-[277px] items-end overflow-hidden p-4 pb-5 md:h-[480px] md:p-[30px] md:pl-10 lg:h-full',
            {
              'order-1': content.shouldSwapOrder,
            }
          )}
          style={{
            backgroundColor: content.linkBlock.backgroundColour,
          }}
        >
          <div className="relative z-10 flex w-full flex-col md:flex-row md:items-end md:justify-between">
            {/* LEFT SIDE */}
            <p className="heading-3 mb-[22px] md:mb-0">
              {content.linkBlock.lineOne}
              {content.linkBlock.lineTwo && (
                <>
                  <br />
                  {content.linkBlock.lineTwo}
                </>
              )}
            </p>

            {/* RIGHT SIDE */}
            <PageLink href={`${SitePages.Collections}/${content.linkBlock.link.collection.handle}`}>
              <Button
                variant="white-black"
                size="sm"
              >
                {content.linkBlock.buttonText}
              </Button>
            </PageLink>
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
