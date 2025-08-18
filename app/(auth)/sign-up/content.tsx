'use client'
import { useEffect, useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { useAuth } from '~/context/AuthContext'
import { joinSmartTagsIntoString } from '~/helpers/cms'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { SitePages } from '~/types/pages'

export default function SignUpPage({ content }: { content: SignInContent }) {
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) window.location.replace(SitePages.Account)
  }, [isAuthenticated])

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
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName: firstName || undefined, lastName: lastName || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Sign up failed')
      window.location.href = '/account'
    } catch (err: any) {
      setError(err?.message || 'Sign up failed')
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
            <h1 className="mb-4.5 text-right text-[76px] leading-none font-semibold -tracking-[4.56px]">Sign Up</h1>
            <p className="mb-12 ml-auto max-w-[243px] text-right">
              Create an account to view your past orders and get updates.
            </p>

            {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

            <form onSubmit={onSubmit}>
              <div className="mb-8 border-b border-black pb-4">
                <label
                  htmlFor="firstName"
                  className="sr-only"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name (optional)"
                  className="text-input w-full bg-transparent placeholder:text-black"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="mb-8 border-b border-black pb-4">
                <label
                  htmlFor="lastName"
                  className="sr-only"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name (optional)"
                  className="text-input w-full bg-transparent placeholder:text-black"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
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

              <div className="mb-8 border-b border-black pb-4">
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
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                size="md"
                variant="white-black"
                disabled={loading}
                className="mb-4.5 !flex"
              >
                {loading ? 'Creating…' : 'Create Account'}
              </Button>
              <PageLink
                href={SitePages.SignIn}
                className="underline"
              >
                Already have an account? Sign in
              </PageLink>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
