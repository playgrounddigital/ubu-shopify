'use client'
import { useForm } from '@formspree/react'
import cx from 'classnames'
import { FC, Fragment, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OutgoingLink from '~/components/Layout/OutgoingLink'
import { formFieldItems } from '~/components/Pages/Contact/presets'
import LinkBlock from '~/components/Pages/Shared/DoubleLinkSection/LinkBlock'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { isProduction } from '~/constants/environment'

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID
if (!FORM_ID) {
  throw new Error('NEXT_PUBLIC_FORMSPREE_NEWSLETTER_SIGNUP_FORM_ID is not set')
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
if (!SITE_KEY) {
  throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set')
}

const ContactPage: FC = () => {
  const [formFields, setFormFields] = useState(
    formFieldItems.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [state, handleSubmit] = useForm(FORM_ID)
  const [hasInputBeenFocused, setHasInputBeenFocused] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleInputFocus = () => setHasInputBeenFocused(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const hasSubmittedSuccessfully = state.succeeded
  const isSubmitting = state.submitting

  const validateForm = async () => {
    if (isProduction) {
      const token = await recaptchaRef.current?.executeAsync()
      if (!token) return false
    }
    return true
  }

  return (
    <>
      <section>
        <Container
          noPadding
          className="pt-20 md:pt-[126px]"
        >
          <div className="flex flex-col gap-x-5 gap-y-2 lg:grid lg:grid-cols-2">
            <LinkBlock
              image={{
                id: '1',
                url: '/img/contact/header.jpg',
                smartTags: [],
              }}
              lineOneText="Contact"
              lineTwoText="Us"
              variant="primary"
            />
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (isSubmitting || hasSubmittedSuccessfully) return
                const isValid = await validateForm()
                if (isValid) await handleSubmit(formFields)
              }}
              className="bg-off-white px-4 pt-10 pb-6 md:px-6 lg:p-[50px]"
            >
              <p className="mb-8 max-w-[559px] translate-y-2 lg:translate-y-0">
                Reach out to us at 
                <OutgoingLink
                  href="mailto:hello@ubustore.com.au"
                  className="underline"
                >
                  hello@ubustore.com.au
                </OutgoingLink>{' '}
                or via our contact form and we’ll get right back to you.
              </p>
              {hasInputBeenFocused && isProduction && (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={SITE_KEY}
                />
              )}
              <div
                className={cx('mb-8 flex flex-col gap-y-4 transition-opacity', {
                  'pointer-events-none opacity-50': hasSubmittedSuccessfully,
                })}
              >
                {formFieldItems.map((field) => (
                  <Fragment key={field.id}>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formFields[field.name]}
                        onChange={handleChange}
                        autoComplete={field.autoComplete}
                        onFocus={handleInputFocus}
                        required={field.required}
                        className="max-h-[300px] min-h-[138px] rounded-lg bg-white py-5 pl-2 placeholder:text-black"
                      />
                    ) : (
                      <input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="h-14 rounded-lg bg-white py-5 pl-2 placeholder:text-black"
                        value={formFields[field.name]}
                        onChange={handleChange}
                        autoComplete={field.autoComplete}
                        onFocus={handleInputFocus}
                        required={field.required}
                      />
                    )}
                  </Fragment>
                ))}
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || hasSubmittedSuccessfully}
                variant="white-black"
                buttonClassName="w-full"
                className="w-full"
              >
                {hasSubmittedSuccessfully ? 'Success!' : isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </div>
        </Container>
      </section>
      <TextMarqueeSection
        content={{
          __typename: 'TextMarqueeSectionRecord',
          id: '1',
          marqueeText: 'You be you.',
          textColour: 'white',
        }}
      />
      {/* {content.map((section) => {
        switch (section.__typename) {
          case 'TextMarqueeSectionRecord':
            return (
              <TextMarqueeSection
                key={section.id}
                content={section}
              />
            )
        }
      })} */}
    </>
  )
}

export default ContactPage
