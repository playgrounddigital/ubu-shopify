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
        className="h-[270px] overflow-hidden"
      >
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            style={{ color: content.textColour }}
            className="text-[270px] leading-[243px] font-extrabold -tracking-[5.4px]"
          >
            {content.marqueeText}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

export default TextMarqueeSection
