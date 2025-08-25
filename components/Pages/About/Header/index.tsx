import { FC } from 'react'
import { AboutPageProps } from '~/app/about/content'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import { joinSmartTagsIntoString } from '~/helpers/cms'

const Header: FC<AboutPageProps> = ({ content }) => {
  return (
    <section>
      <OptimisedImage
        src={content.image.url}
        alt={joinSmartTagsIntoString(content.image.smartTags)}
        layout="cover"
        imgClassName="object-bottom"
        className="hidden h-svh w-full lg:block"
      />
      <OptimisedImage
        src={content.imageMobile.url}
        alt={joinSmartTagsIntoString(content.imageMobile.smartTags)}
        layout="cover"
        imgClassName="object-bottom"
        className="h-svh w-full lg:hidden"
      />
    </section>
  )
}

export default Header
