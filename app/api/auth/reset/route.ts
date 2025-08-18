import { NextRequest, NextResponse } from 'next/server'
import { resetCustomerPasswordByUrl } from '~/lib/shopify'

const COOKIE_NAME = 'customerAccessToken'

export async function POST(req: NextRequest) {
  try {
    const { resetUrl, password } = await req.json()
    if (!resetUrl || !password)
      return NextResponse.json({ error: 'resetUrl and password are required' }, { status: 400 })

    const token = await resetCustomerPasswordByUrl(resetUrl, password)

    const res = NextResponse.json({ ok: true })
    res.cookies.set(COOKIE_NAME, JSON.stringify(token), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Password reset failed' }, { status: 400 })
  }
}
