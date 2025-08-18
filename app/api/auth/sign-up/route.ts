import { NextRequest, NextResponse } from 'next/server'
import { signUpCustomer } from '~/lib/shopify'

const COOKIE_NAME = 'customerAccessToken'

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })

    const token = await signUpCustomer({ email, password, firstName, lastName })

    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, JSON.stringify(token), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Sign up failed' }, { status: 400 })
  }
}
