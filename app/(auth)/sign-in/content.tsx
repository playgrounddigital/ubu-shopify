'use client'
import { useState } from 'react'
import AuthInput from '~/components/Layout/AuthInput'
import AuthLayout from '~/components/Layout/AuthLayout'
import Button from '~/components/Layout/Button'
import PageLink from '~/components/Layout/PageLink'
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
      setLoading(false)
      setError(err?.message || 'Sign in failed')
    }
  }

  return (
    <AuthLayout
      image={content.image}
      title={content.title}
      description={content.description}
      content={content.content}
    >
      {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

      <form onSubmit={onSubmit}>
        <AuthInput
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <AuthInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="mb-3"
        />

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
          Don't have an account? Sign up
        </PageLink>
      </form>
    </AuthLayout>
  )
}
