import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getCustomerWithOrders } from '~/lib/shopify'

const COOKIE_NAME = 'customerAccessToken'

export async function GET() {
  try {
    const cookie = (await cookies()).get(COOKIE_NAME)
    if (!cookie?.value) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    const token = JSON.parse(cookie.value) as { accessToken: string; expiresAt: string }

    const customer = await getCustomerWithOrders(token.accessToken)
    return NextResponse.json({ customer })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch account' }, { status: 401 })
  }
}
