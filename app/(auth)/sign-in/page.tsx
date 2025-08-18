'use client'
import { useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'

export default function SignInPage() {
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
    <Container className="py-20">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-2 text-right text-[88px] leading-none font-semibold -tracking-[3px]">Sign In</h1>
        <p className="mb-12 text-right text-xl">Login to view your past orders and find tracking updates.</p>

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
              autoComplete="current-password"
              required
            />
          </div>

          <div className="flex items-center gap-x-6">
            <Button
              type="submit"
              size="md"
              variant="white-black"
              disabled={loading}
            >
              {loading ? 'Signing In…' : 'Sign In'}
            </Button>
            <a
              href="/sign-up"
              className="underline"
            >
              Don’t have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </Container>
  )
}
