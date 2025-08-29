import cx from 'classnames'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import useBreakpoints from '~/hooks/useBreakpoints'
import DefaultReasonIcon from '~/public/img/icons/default-reason.svg'
import OSquiggleIcon from '~/public/img/icons/o-squiggle.svg'
import { ReasonsSectionRecord } from '~/types/cms/pages/home'

interface ReasonsSectionProps {
  content: ReasonsSectionRecord
}

const ReasonsSection: FC<ReasonsSectionProps> = ({ content }) => {
  const { isDesktop } = useBreakpoints()
  const renderTitleWithIcon = (title: string) => {
    const lastOIndex = title.lastIndexOf('o')
    if (lastOIndex === -1) {
      // No 'O' found, return title as is
      return title
    }

    const beforeO = title.substring(0, lastOIndex)
    const afterO = title.substring(lastOIndex + 1)

    return (
      <>
        {beforeO}
        <OSquiggleIcon className="inline h-[36px] w-[29px] text-green md:h-[57px] md:w-[47px]" />
        {afterO}
      </>
    )
  }

  return (
    <section>
      <Container className="pt-12 pb-20 md:pt-[90px]">
        {content.shouldShowTitle && (
          <h2 className="heading-2 mx-auto mb-[50px] max-w-[257px] text-center md:mb-[88px] md:max-w-[400px] lg:max-w-[unset]">
            {renderTitleWithIcon(content.title)}
          </h2>
        )}
        <div
          className="mx-auto grid w-full max-w-[1052px] grid-cols-2 items-start justify-between gap-y-6 lg:gap-x-10"
          style={{
            gridTemplateColumns: isDesktop ? `repeat(${content.reasons.length}, minmax(0, 1fr))` : undefined,
          }}
        >
          {content.reasons.map((reason) => (
            <div
              key={reason.id}
              className="inline-flex flex-col items-center justify-center text-center"
            >
              <div
                className={cx('mb-6', {
                  'size-[167px]': content.reasons.length >= 5,
                  'size-[135px]': content.reasons.length < 5,
                })}
              >
                {reason.image ? (
                  <OptimisedImage
                    src={reason.image.url}
                    alt={joinSmartTagsIntoString(reason.image.smartTags)}
                    className="size-full"
                  />
                ) : (
                  <DefaultReasonIcon className="size-full" />
                )}
              </div>
              <span className="text-subheading max-w-[150px] md:max-w-[200px] lg:max-w-[unset]">{reason.title}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ReasonsSection
