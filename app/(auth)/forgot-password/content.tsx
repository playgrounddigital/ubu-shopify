'use client'
import { useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'

export default function ForgotPasswordPage() {
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
    <Container className="py-20">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-2 text-right text-[88px] leading-none font-semibold -tracking-[3px]">Forgot password</h1>
        <p className="mb-12 text-right text-xl">We’ll email you a link to reset your password.</p>

        {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}
        {sent && (
          <div className="mb-6 rounded-md border border-green-500 bg-green-50 p-4 text-green-700">
            Check your inbox for a reset link.
          </div>
        )}

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

          <div className="flex items-center gap-x-6">
            <Button
              type="submit"
              size="md"
              variant="white-black"
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </Button>
            <a
              href="/sign-in"
              className="underline"
            >
              Back to Sign in
            </a>
          </div>
        </form>
      </div>
    </Container>
  )
}
