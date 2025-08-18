import { FC } from 'react'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { DatoCMSCollection } from '~/types/cms/models/collection'

interface HeaderProps {
  content: DatoCMSCollection
}

const Header: FC<HeaderProps> = ({ content }) => {
  return (
    <section className="pt-[122px]">
      <Container className="mb-5 grid h-[600px] gap-x-5 gap-y-2 lg:grid-cols-2">
        {/* LINK BLOCk */}
        <div
          className="relative inline-flex h-full items-end overflow-hidden p-[30px] pl-10"
          style={{
            backgroundColor: content.backgroundColour,
          }}
        >
          <div className="relative z-10 flex w-full items-end justify-between">
            {/* LEFT SIDE */}
            <h1 className="text-collection-title">{content.shopifyCollection.title}</h1>
          </div>
        </div>

        {/* IMAGE BLOCK */}
        <OptimisedImage
          src={content.image.url}
          alt={joinSmartTagsIntoString(content.image.smartTags)}
          layout="cover"
        />
      </Container>
      <div className="bg-black pt-[100px] pb-[43px]">
        <Container>
          <p className="text-introduction max-w-[824px] text-white">{content.description}</p>
        </Container>
      </div>
    </section>
  )
}

export default Header
