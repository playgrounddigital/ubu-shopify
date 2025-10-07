import cx from 'classnames'
import { FC } from 'react'
import CircleButton from '~/components/Layout/Button/Circle'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import LinkOneLineOneRectangle from '~/public/img/home/double-link-section/link-one-line-one-rectangle.svg'
import LinkOneLineTwoRectangle from '~/public/img/home/double-link-section/link-one-line-two-rectangle.svg'
import LinkTwoLineOneRectangle from '~/public/img/home/double-link-section/link-two-line-one-rectangle.svg'
import LinkTwoLineTwoRectangle from '~/public/img/home/double-link-section/link-two-line-two-rectangle.svg'
import { Image } from '~/types/cms/common'

const rectangleClassNames = {
  primary: {
    lineOne: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-1/2',
    lineTwo: 'absolute -top-0.5 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-1/2',
  },
  secondary: {
    lineOne: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+30px)] -translate-x-[calc(50%-8px)]',
    lineTwo: 'absolute -top-2 left-1/2 h-[130%] w-[calc(100%+24px)] -translate-x-[calc(50%+2px)]',
  },
}

interface LinkBlockProps {
  link?: string | null
  image: Image
  lineOneText: string
  lineTwoText: string
  variant: 'primary' | 'secondary'
}

const LinkBlock: FC<LinkBlockProps> = ({ link, image, variant, lineOneText, lineTwoText }) => {
  const isPrimary = variant === 'primary'
  const LineOneRectangle = isPrimary ? LinkOneLineOneRectangle : LinkTwoLineOneRectangle
  const LineTwoRectangle = isPrimary ? LinkOneLineTwoRectangle : LinkTwoLineTwoRectangle

  return (
    <PageLink
      href={link}
      className={cx('relative inline-flex h-[480px] items-end overflow-hidden p-[30px] pl-10 lg:h-full', {
        'group/button': !!link,
      })}
    >
      <OptimisedImage
        src={image.url}
        alt={joinSmartTagsIntoString(image.smartTags)}
        layout="cover"
        imgClassName="group-hover/button:scale-105 transition-transform transform-gpu"
        className="absolute inset-0"
      />
      <div className="relative z-10 flex w-full items-end justify-between">
        {/* LEFT SIDE */}
        <div
          className={cx({
            'text-white': isPrimary,
          })}
        >
          <div
            className={cx('relative w-fit transform-gpu transition-transform', {
              'group-hover/button:-translate-y-2 group-hover/button:rotate-3': isPrimary,
              'group-hover/button:-translate-y-2 group-hover/button:-rotate-3': !isPrimary,
            })}
          >
            <LineOneRectangle className={rectangleClassNames[variant].lineOne} />
            <span className="heading-3 relative z-10">{lineOneText}</span>
          </div>
          <div
            className={cx('relative w-fit transform-gpu transition-transform', {
              'group-hover/button:translate-y-1 group-hover/button:-rotate-3': isPrimary,
              'group-hover/button:translate-y-2 group-hover/button:rotate-3': !isPrimary,
            })}
          >
            <LineTwoRectangle className={rectangleClassNames[variant].lineTwo} />
            <span className="heading-3 relative z-10">{lineTwoText}</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {link && (
          <CircleButton
            ariaLabel="Open link"
            variant={isPrimary ? 'white-black' : 'black-green'}
          />
        )}
      </div>
    </PageLink>
  )
}

export default LinkBlock
