export const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

if (!reCaptchaSiteKey) {
  throw new Error('Missing reCAPTCHA site key')
}
