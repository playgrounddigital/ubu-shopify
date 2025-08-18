import cx from 'classnames'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { FullWidthBannerSectionRecord } from '~/types/cms/pages/home'

interface FullWidthBannerSectionProps {
  content: FullWidthBannerSectionRecord
}

const FullWidthBannerSection: FC<FullWidthBannerSectionProps> = ({ content }) => {
  return (
    <section
      className={cx('relative', {
        'border-y-4 border-green': content.shouldAddBorder && content.buttonColour === 'green',
        'border-y-4 border-blue': content.shouldAddBorder && content.buttonColour === 'blue',
        'border-y-4 border-pink': content.shouldAddBorder && content.buttonColour === 'pink',
        'border-y-4 border-yellow': content.shouldAddBorder && content.buttonColour === 'yellow',
      })}
    >
      <OptimisedImage
        src={content.image.url}
        alt={content.title}
        layout="cover"
        imgClassName="object-right"
        className="absolute inset-0"
      />
      <Container
        className={cx('z-10 flex items-end pt-10', {
          'h-[480px] pb-10': content.height === 'md',
          'h-[600px] pb-[150px]': content.height === 'lg',
        })}
      >
        <div
          className={cx({
            'max-w-[531px]': content.height === 'md',
            'max-w-[631px]': content.height === 'lg',
          })}
        >
          <p className="heading-3 mb-10">{content.title}</p>
          <Button
            size="md"
            variant={(() => {
              switch (content.buttonColour) {
                case 'green':
                  return 'black-green'
                case 'blue':
                  return 'black-blue'
                case 'pink':
                  return 'black-pink'
                case 'yellow':
                  return 'black-yellow'
              }
            })()}
          >
            {content.buttonText}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FullWidthBannerSection
