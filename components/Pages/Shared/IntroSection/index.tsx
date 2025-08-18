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
      <Container className="flex h-[376px] items-end pb-4.5">
        <div className="text-introduction max-w-[888px] text-white">
          <StructuredTextRenderer data={content.description} />
        </div>
      </Container>
    </section>
  )
}

export default IntroSection
