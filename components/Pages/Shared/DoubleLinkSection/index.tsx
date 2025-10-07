import { FC } from 'react'
import Container from '~/components/Layout/Container'
import { DoubleLinkSectionRecord } from '~/types/cms/pages/home'
import { SitePages } from '~/types/pages'
import LinkBlock from './LinkBlock'

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
            <LinkBlock
              key={linkBlock.id}
              link={link}
              image={linkBlock.image}
              lineOneText={linkBlock.lineOne}
              lineTwoText={linkBlock.lineTwo}
              variant={i === 0 ? 'primary' : 'secondary'}
            />
          )
        })}
      </Container>
    </section>
  )
}

export default DoubleLinkSection
