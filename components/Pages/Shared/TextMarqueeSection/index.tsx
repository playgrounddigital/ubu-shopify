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
            className="md:heading-1 inline-block text-[87px] leading-[78px] font-extrabold -tracking-[1.74px] md:-translate-y-6"
          >
            {content.marqueeText}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

export default TextMarqueeSection
