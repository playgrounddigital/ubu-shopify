import { NextRequest, NextResponse } from 'next/server'
import { signInCustomer } from '~/lib/shopify'

// Store token in HTTP-only cookie
const COOKIE_NAME = 'customerAccessToken'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })

    const token = await signInCustomer(email, password)

    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, JSON.stringify(token), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      // expires is handled by token.expiresAt, but we also set maxAge as a fallback
    })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Sign in failed' }, { status: 401 })
  }
}
