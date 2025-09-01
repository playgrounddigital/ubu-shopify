import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import { TextMarqueeSectionRecord } from '~/types/cms/pages/home'

interface TextMarqueeSectionProps {
  content: TextMarqueeSectionRecord
}

const TextMarqueeSection: FC<TextMarqueeSectionProps> = ({ content }) => {
  return (
    <section className="bg-black">
      <Marquee
        speed={100}
        className="h-[78px] overflow-hidden md:h-[240px]"
      >
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            style={{ color: content.textColour }}
            className="heading-1 inline-block md:-translate-y-2"
          >
            {content.marqueeText}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

export default TextMarqueeSection
