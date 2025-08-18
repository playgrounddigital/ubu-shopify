'use client'
import { useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
    <Container className="py-20">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-2 text-right text-[88px] leading-none font-semibold -tracking-[3px]">Sign Up</h1>
        <p className="mb-12 text-right text-xl">Create an account to view your past orders and get updates.</p>

        {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

        <form
          onSubmit={onSubmit}
          className="space-y-10"
        >
          <div className="border-b border-black pb-4">
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
              className="w-full bg-transparent placeholder:text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="border-b border-black pb-4">
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
              className="w-full bg-transparent placeholder:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="border-b border-black pb-4">
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
                className="w-full bg-transparent placeholder:text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </div>
            <div className="border-b border-black pb-4">
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
                className="w-full bg-transparent placeholder:text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <Button
              type="submit"
              size="md"
              variant="white-black"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Create Account'}
            </Button>
            <a
              href="/sign-in"
              className="underline"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </Container>
  )
}
