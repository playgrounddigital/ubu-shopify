import { NextRequest, NextResponse } from 'next/server'
import { recoverCustomerPassword } from '~/lib/shopify'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    await recoverCustomerPassword(email)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to send reset email' }, { status: 400 })
  }
}
