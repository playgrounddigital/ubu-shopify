import { NextResponse } from 'next/server'

const COOKIE_NAME = 'customerAccessToken'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    expires: new Date(0),
  })
  return res
}
