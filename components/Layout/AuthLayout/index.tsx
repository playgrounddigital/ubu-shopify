import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { TextMarqueeSectionRecord } from '~/types/cms/pages/home'

interface AuthLayoutProps {
  image: {
    url: string
    smartTags: string[]
  }
  title: string
  description: string
  content: TextMarqueeSectionRecord[]
  children: React.ReactNode
}

export default function AuthLayout({ image, title, description, content, children }: AuthLayoutProps) {
  return (
    <>
      <section>
        <Container
          noPaddingDesktop
          className="pt-[126px]"
        >
          <div className="grid gap-x-5 lg:grid-cols-2">
            <OptimisedImage
              src={image.url}
              alt={joinSmartTagsIntoString(image.smartTags)}
              layout="cover"
              className="w-full"
            />
            <div className="bg-off-white p-[50px]">
              <h1 className="mb-4.5 text-right text-[76px] leading-none font-semibold -tracking-[4.56px]">{title}</h1>
              <p className="mb-12 ml-auto max-w-[243px] text-right">{description}</p>
              {children}
            </div>
          </div>
        </Container>
      </section>
      {content.map((section) => {
        switch (section.__typename) {
          case 'TextMarqueeSectionRecord':
            return (
              <TextMarqueeSection
                key={section.id}
                content={section}
              />
            )
        }
      })}
    </>
  )
}
