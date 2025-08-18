'use client'
import { useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import TextMarqueeSection from '~/components/Pages/Shared/TextMarqueeSection'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { SitePages } from '~/types/pages'

export default function SignInPage({ content }: { content: SignInContent }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Sign in failed')
      window.location.href = '/account'
    } catch (err: any) {
      setError(err?.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
                {content.title}
              </h1>
              <p className="mb-12 ml-auto max-w-[243px] text-right">{content.description}</p>

              {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

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
                <div className="mb-3 border-b border-black pb-4">
                  <label
                    htmlFor="password"
                    className="sr-only"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="text-input w-full bg-transparent placeholder:text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="mb-9 text-sm">
                  <PageLink
                    href={SitePages.ForgotPassword}
                    className="underline"
                  >
                    Forgot your password?
                  </PageLink>
                </div>

                <Button
                  type="submit"
                  size="md"
                  variant="white-black"
                  disabled={loading}
                  className="mb-4.5 !flex"
                >
                  {loading ? 'Signing In…' : 'Sign In'}
                </Button>
                <PageLink
                  href={SitePages.SignUp}
                  className="underline"
                >
                  Don’t have an account? Sign up
                </PageLink>
              </form>
            </div>
          </div>
        </Container>
      </section>
      {content.content.map((section) => {
        switch (section.__typename) {
          case 'TextMarqueeSectionRecord':
            return (
              <TextMarqueeSection
                key={section.id}
                content={section}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
