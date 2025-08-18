'use client'
import { useEffect, useState } from 'react'
import AuthInput from '~/components/Layout/AuthInput'
import AuthLayout from '~/components/Layout/AuthLayout'
import Button from '~/components/Layout/Button'
import PageLink from '~/components/Layout/PageLink'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { SitePages } from '~/types/pages'

export default function ResetPasswordPage({ content }: { content: SignInContent }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resetUrl, setResetUrl] = useState('')

  useEffect(() => {
    setResetUrl(window.location.href)
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetUrl, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Password reset failed')
      window.location.href = '/account'
    } catch (err: any) {
      setError(err?.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      image={content.image}
      title="Reset password"
      description="Choose a new password for your account."
      content={content.content}
    >
      {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

      <form onSubmit={onSubmit}>
        <AuthInput
          id="password"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
        />

        <AuthInput
          id="confirm"
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
          minLength={6}
        />

        <div className="flex items-center gap-x-6">
          <Button
            type="submit"
            size="md"
            variant="white-black"
            disabled={loading}
          >
            {loading ? 'Resetting…' : 'Reset password'}
          </Button>
          <PageLink
            href={SitePages.SignIn}
            className="underline"
          >
            Back to Sign in
          </PageLink>
        </div>
      </form>
    </AuthLayout>
  )
}
