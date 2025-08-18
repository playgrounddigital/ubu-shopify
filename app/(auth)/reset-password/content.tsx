'use client'
import { useEffect, useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
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
              Reset password
            </h1>
            <p className="mb-12 ml-auto max-w-[243px] text-right">Choose a new password for your account.</p>

            {error && <div className="mb-6 rounded-md border border-red-500 bg-red-50 p-4 text-red-700">{error}</div>}

            <form onSubmit={onSubmit}>
              <div className="mb-8 border-b border-black pb-4">
                <label
                  htmlFor="password"
                  className="sr-only"
                >
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="New password"
                  className="text-input w-full bg-transparent placeholder:text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>

              <div className="mb-8 border-b border-black pb-4">
                <label
                  htmlFor="confirm"
                  className="sr-only"
                >
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  placeholder="Confirm password"
                  className="text-input w-full bg-transparent placeholder:text-black"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>

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
          </div>
        </div>
      </Container>
    </section>
  )
}
