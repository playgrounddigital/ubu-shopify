'use client'
import { FC } from 'react'
import Container from '~/components/Layout/Container'
import StructuredTextRenderer from '~/components/Layout/StructuredTextRenderer'
import Header from '~/components/Pages/Collections/Header'
import { PrivacyPolicyPageContent } from '~/types/cms/pages/privacy-policy'

interface PrivacyPolicyPageProps {
  content: PrivacyPolicyPageContent
}

const PrivacyPolicyPage: FC<PrivacyPolicyPageProps> = ({ content }) => {
  return (
    <>
      <Header
        title={content.title}
        image={content.image}
        backgroundClassName="bg-pink"
      />
      <section className="bg-black">
        <Container className="py-24 text-white">
          <StructuredTextRenderer
            data={content.content}
            paragraphClassName="text-subheading lg:text-introduction"
            headingTwoClassName="text-subheading lg:text-introduction mb-8"
          />
        </Container>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
