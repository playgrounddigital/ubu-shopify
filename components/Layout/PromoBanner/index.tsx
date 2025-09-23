'use client'
import { useForm } from '@formspree/react'
import cx from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import AnimateOnUpdate from '~/components/Layout/AnimateOnUpdate'
import Button from '~/components/Layout/Button'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import CopyButton from '~/components/Layout/PromoBanner/CopyButton'
import { isProduction } from '~/constants/environment'
import { iconStyles } from '~/constants/iconStyles'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { retrieveFromLocalStorage, saveToLocalStorage } from '~/helpers/common'
import ArrowRightIcon from '~/public/img/icons/arrow-right.svg'
import CloseIcon from '~/public/img/icons/close.svg'
import promoBannerJSON from '~/public/promo-banner.json'
import { PromoBannerContent } from '~/types/cms/models/promo-banner'

const isBannerActive = promoBannerJSON.isBannerActive

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
if (!FORM_ID) {
  throw new Error('NEXT_PUBLIC_FORMSPREE_FORM_ID is not set')
}
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
if (!SITE_KEY) {
  throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set')
}

type BannerState = 'initial' | 'email' | 'thankyou'

interface PromoBannerProps {
  content: PromoBannerContent
}

const PromoBanner: FC<PromoBannerProps> = ({ content }) => {
  const [state, handleSubmit] = useForm(FORM_ID)
  const [bannerState, setBannerState] = useState<BannerState>('initial')
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [hasInputBeenFocused, setHasInputBeenFocused] = useState(false)
  const [hasSubscribedPreviously, setHasSubscribedPreviously] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleInputFocus = () => setHasInputBeenFocused(true)

  const hasSubmittedSuccessfully = state.succeeded
  const isSubmitting = state.submitting

  const validateForm = async () => {
    if (!email) return false
    if (isProduction) {
      const token = await recaptchaRef.current?.executeAsync()
      if (!token) return false
    }
    return true
  }

  const handleClaimClick = () => {
    setBannerState('email')
  }

  const handleDismiss = () => {
    saveToLocalStorage('promoBannerDismissed', 'true')
    setIsVisible(false)
  }

  const handleShow = () => {
    setIsVisible(true)
  }

  // Show banner after 10 seconds
  useEffect(() => {
    const hasDismissed = retrieveFromLocalStorage('promoBannerDismissed') === 'true'
    const hasSubscribedPreviously = retrieveFromLocalStorage('hasSubscribedPreviously') === 'true'
    if (hasSubscribedPreviously) {
      setHasSubscribedPreviously(true)
      return
    }
    if (!isBannerActive || hasDismissed) return
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Move to thank you state after successful submission
  useEffect(() => {
    if (hasSubmittedSuccessfully) {
      setBannerState('thankyou')
      saveToLocalStorage('hasSubscribedPreviously', 'true')
    }
  }, [hasSubmittedSuccessfully])

  if (hasSubscribedPreviously) return null

  return (
    <div className="!fixed bottom-4 left-0 z-50 flex h-px items-end px-4">
      <div
        className={cx(
          'relative flex h-[143px] w-full transform-gpu gap-x-2 overflow-hidden rounded-[12px] border-[1.5px] border-white bg-white shadow-xl transition-all duration-500 md:w-[455px]',
          {
            '-translate-x-[calc(100%-32px)]': !isVisible && !hasSubmittedSuccessfully,
            'pointer-events-none scale-95 opacity-0': !isVisible && hasSubmittedSuccessfully,
          }
        )}
      >
        {/* Dismiss button */}
        <AnimateOnUpdate
          updateKey={isVisible}
          className="absolute top-4 right-4"
        >
          {isVisible ? (
            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
            >
              <CloseIcon className={cx(iconStyles[16])} />
            </button>
          ) : (
            <button
              onClick={handleShow}
              aria-label="Dismiss banner"
            >
              <ArrowRightIcon className={cx(iconStyles[16])} />
            </button>
          )}
        </AnimateOnUpdate>

        {/* Product image */}
        <OptimisedImage
          src={content.image.url}
          alt={joinSmartTagsIntoString(content.image.smartTags)}
          layout="cover"
          className="h-full w-[110px]"
        />

        {/* Content area */}
        <div className="pt-3">
          <div className="mb-2 inline-flex h-6 items-center justify-center rounded bg-green px-[7px] text-xs text-black">
            <AnimateOnUpdate
              isSpan
              updateKey={bannerState}
            >
              {bannerState === 'thankyou' ? content.badgeTextSubmitted : content.badgeText}
            </AnimateOnUpdate>
          </div>

          <AnimateOnUpdate updateKey={bannerState}>
            {bannerState === 'initial' && (
              <>
                <h3 className="mb-0.5 text-xl">{content.bannerTitle}</h3>
                <p className="mb-2 text-[13px]">{content.bannerText}</p>
                <Button
                  size="xs"
                  variant="black-green"
                  onClick={handleClaimClick}
                >
                  Claim
                </Button>
              </>
            )}

            {bannerState === 'email' && (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    if (isSubmitting || hasSubmittedSuccessfully) return
                    const isValid = await validateForm()
                    if (isValid) await handleSubmit({ email })
                  }}
                  className="mt-4"
                >
                  <div className="mb-3">
                    {hasInputBeenFocused && isProduction && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={SITE_KEY}
                      />
                    )}
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      required
                      onFocus={handleInputFocus}
                      onChange={(e) => {
                        if (hasSubmittedSuccessfully || isSubmitting) return
                        setEmail(e.target.value)
                      }}
                      className="w-full border-b-2 border-gray-900 bg-transparent pb-1 placeholder:text-black focus:border-green focus:outline-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="xs"
                    variant="black-green"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </form>
              </>
            )}

            {bannerState === 'thankyou' && (
              <>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl">{content.discountCode}</h3>
                  <CopyButton value={content.discountCode} />
                </div>
                <p className="mb-1 text-[13px]">{content.bannerTextSubmitted}</p>
              </>
            )}
          </AnimateOnUpdate>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
