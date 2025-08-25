import cx from 'classnames'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import StructuredTextRenderer from '~/components/Layout/StructuredTextRenderer'
import { IntroSectionRecord } from '~/types/cms/pages/home'

interface IntroSectionProps {
  content: IntroSectionRecord
}

const IntroSection: FC<IntroSectionProps> = ({ content }) => {
  return (
    <section className="bg-black">
      <Container
        className={cx('flex items-end', {
          'pt-[272px] pb-4.5': !content.shouldAddPaddingBelow,
          'py-[220px] lg:!px-20': content.shouldAddPaddingBelow,
        })}
      >
        <div
          className={cx('text-introduction text-white', {
            'max-w-[888px]': !content.shouldAddPaddingBelow,
          })}
        >
          <StructuredTextRenderer data={content.description} />
        </div>
      </Container>
    </section>
  )
}

export default IntroSection
