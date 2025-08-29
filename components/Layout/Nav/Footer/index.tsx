'use client'
import { useForm } from '@formspree/react'
import cx from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import OutgoingLink from '~/components/Layout/OutgoingLink'
import { isProduction } from '~/constants/environment'
import useBreakpoints from '~/hooks/useBreakpoints'
import FooterJSON from '~/public/footer.json'

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
if (!FORM_ID) {
  throw new Error('NEXT_PUBLIC_FORMSPREE_FORM_ID is not set')
}
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
if (!SITE_KEY) {
  throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set')
}

const Footer: FC = () => {
  const [state, handleSubmit] = useForm(FORM_ID)
  const [email, setEmail] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const { isMobile } = useBreakpoints()

  const hasSubmittedSuccessfully = state.succeeded
  const isSubmitting = state.submitting

  const validateForm = async () => {
    if (isProduction) {
      const token = await recaptchaRef.current.executeAsync()
      if (!token) return false
    }

    return true
  }

  useEffect(() => {
    if (hasSubmittedSuccessfully) {
      setEmail('Success!')
    }
  }, [hasSubmittedSuccessfully])

  return (
    <footer className="bg-black text-white">
      <Container className="pt-16 pb-14">
        <div className="mb-[50px] flex flex-col gap-y-5 lg:gap-y-10 xl:flex-row xl:items-center xl:justify-between">
          <p className="text-input font-semibold">Sign up to our newsletter</p>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (isSubmitting || hasSubmittedSuccessfully) return
              const isValid = await validateForm()
              if (isValid) await handleSubmit({ email })
            }}
            className={cx('flex gap-x-10 border-b pb-5 xl:max-w-[650px]', {
              'border-white': !hasSubmittedSuccessfully,
              'border-green': hasSubmittedSuccessfully,
              'cursor-not-allowed': hasSubmittedSuccessfully || isSubmitting,
            })}
          >
            <input
              name="email"
              type={hasSubmittedSuccessfully ? 'text' : 'email'}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                if (hasSubmittedSuccessfully || isSubmitting) return
                setEmail(e.target.value)
              }}
              className={cx(
                'md:text-input w-full bg-transparent text-[26px] leading-6 -tracking-[1px] placeholder:text-white',
                {
                  'text-green': hasSubmittedSuccessfully,
                }
              )}
            />
            <Button
              type="submit"
              size={isMobile ? 'sm' : 'md'}
              variant="black-pink"
              disabled={isSubmitting}
              className={cx('transition-opacity', {
                'pointer-events-none opacity-0': hasSubmittedSuccessfully,
              })}
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </form>
        </div>

        <hr className="mb-16 hidden xl:block" />

        <div className="mb-[168px] flex lg:justify-end">
          <div className="flex gap-x-5">
            {FooterJSON.socialLinks.map((item) => (
              <OutgoingLink
                href={item.link}
                key={item.id}
              >
                <OptimisedImage
                  src={item.image.url}
                  alt={item.name}
                  className="size-[42px] transition-opacity hover:opacity-70"
                />
              </OutgoingLink>
            ))}
          </div>
        </div>

        <hr className="mb-16 xl:hidden" />

        {/* Accepted Payment Methods */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-4">
            {FooterJSON.acceptedPaymentMethods.map((item) => (
              <OptimisedImage
                key={item.id}
                src={item.image.url}
                alt={item.name}
                className="h-6 w-[34px]"
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
