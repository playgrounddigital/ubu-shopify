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
          noPadding
          className="pt-[126px]"
        >
          <div className="flex flex-col-reverse gap-x-5 gap-y-2 lg:grid lg:grid-cols-2">
            <OptimisedImage
              src={image.url}
              alt={joinSmartTagsIntoString(image.smartTags)}
              layout="cover"
              className="h-[333px] w-full lg:h-full"
            />
            <div className="bg-off-white px-4 pt-24 pb-6 md:px-6 lg:p-[50px]">
              <div className="mb-8 flex flex-col gap-x-4 gap-y-2 md:flex-row md:justify-between lg:mb-12 lg:block">
                <h1 className="heading-3 leading-none font-semibold whitespace-nowrap md:text-[76px] md:-tracking-[4.56px] lg:mb-4.5 lg:text-right">
                  {title}
                </h1>
                <p className="max-w-[243px] translate-y-2 md:ml-auto lg:translate-y-0 lg:text-right">{description}</p>
              </div>
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
