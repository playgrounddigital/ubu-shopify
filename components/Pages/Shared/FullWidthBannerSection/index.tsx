import cx from 'classnames'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import useBreakpoints from '~/hooks/useBreakpoints'
import { FullWidthBannerSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'

interface FullWidthBannerSectionProps {
  content: FullWidthBannerSectionRecord
}

const FullWidthBannerSection: FC<FullWidthBannerSectionProps> = ({ content }) => {
  const { isMobile } = useBreakpoints()
  const link = (() => {
    if (!content.link) {
      return SitePages.Shop
    }
    if (content.link.collection) {
      return `${SitePages.Collections}/${content.link.collection.handle}`
    }
    if (content.link.product) {
      return `${SitePages.Products}/${content.link.product.handle}`
    }
  })()

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
        className={cx('absolute inset-0', {
          'hidden lg:block': content.imageMobile?.url,
        })}
      />
      {content.imageMobile?.url && (
        <OptimisedImage
          src={content.imageMobile.url}
          alt={content.title}
          layout="cover"
          imgClassName="object-bottom"
          className="absolute inset-0 lg:hidden"
        />
      )}
      <Container
        className={cx('z-10 flex lg:items-end', {
          'pt-[50px] pb-[306px] lg:pt-[70px] lg:pb-10 xl:h-[480px]': content.height === 'md',
          'h-[573px] pt-[50px] pb-[150px] lg:h-[600px]': content.height === 'lg',
        })}
      >
        <div
          className={cx({
            'max-w-[450px] xl:max-w-[531px]': content.height === 'md',
            'max-w-[424px]': content.height === 'lg',
          })}
        >
          <h2
            className={cx('heading-3 mb-10', {
              'text-black': content.titleColour === 'black',
              'text-white': content.titleColour === 'white',
            })}
          >
            {content.title}
          </h2>
          <PageLink href={link}>
            <Button
              size={isMobile ? 'sm' : 'md'}
              variant={(() => {
                switch (content.buttonColour) {
                  case 'green':
                    return 'black-green'
                  case 'blue':
                    return 'white-blue'
                  case 'pink':
                    return 'black-pink'
                  case 'yellow':
                    return 'black-yellow'
                }
              })()}
            >
              {content.buttonText}
            </Button>
          </PageLink>
        </div>
      </Container>
    </section>
  )
}

export default FullWidthBannerSection
