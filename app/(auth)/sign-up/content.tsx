'use client'
import { useEffect, useState } from 'react'
import AuthInput from '~/components/Layout/AuthInput'
import AuthLayout from '~/components/Layout/AuthLayout'
import Button from '~/components/Layout/Button'
import PageLink from '~/components/Layout/PageLink'
import { useAuth } from '~/context/AuthContext'
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
    <AuthLayout
      image={content.image}
      title="Sign Up"
      description="Create an account to view your past orders and get updates."
      content={content.content}
    >
      {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

      <form onSubmit={onSubmit}>
        <AuthInput
          id="firstName"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
        <AuthInput
          id="lastName"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="family-name"
        />
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
          autoComplete="new-password"
          required
          minLength={6}
        />

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
    </AuthLayout>
  )
}
