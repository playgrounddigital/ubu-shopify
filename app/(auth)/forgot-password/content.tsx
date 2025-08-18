'use client'
import { useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { SitePages } from '~/types/pages'

export default function ForgotPasswordPage({ content }: { content: SignInContent }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to send reset email')
      setSent(true)
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Container
        noPaddingDesktop
        className="pt-[126px]"
      >
        <div className="grid gap-x-5 lg:grid-cols-2">
          <OptimisedImage
            src={content.image.url}
            alt={joinSmartTagsIntoString(content.image.smartTags)}
            layout="cover"
            className="w-full"
          />
          <div className="bg-off-white p-[50px]">
            <h1 className="mb-4.5 text-right text-[76px] leading-none font-semibold -tracking-[4.56px]">
              Forgot password
            </h1>
            <p className="mb-12 ml-auto max-w-[243px] text-right">We’ll email you a link to reset your password.</p>

            {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}
            {sent && (
              <div className="mb-6 rounded-md border border-green-500 bg-green-50 p-4 text-green-700">
                Check your inbox for a reset link.
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-8 border-b border-black pb-4">
                <label
                  htmlFor="email"
                  className="sr-only"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="text-input w-full bg-transparent placeholder:text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <Button
                type="submit"
                size="md"
                variant="white-black"
                disabled={loading}
                className="mb-4.5 !flex"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </Button>
              <PageLink
                href={SitePages.SignIn}
                className="underline"
              >
                Back to Sign in
              </PageLink>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
