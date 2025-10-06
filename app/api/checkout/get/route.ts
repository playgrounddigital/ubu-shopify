import { NextRequest, NextResponse } from 'next/server'
import { getCheckout } from '~/lib/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { checkoutId }: { checkoutId: string } = body

    if (!checkoutId) {
      return NextResponse.json({ error: 'checkoutId is required' }, { status: 400 })
    }

    const checkout = await getCheckout(checkoutId)

    return NextResponse.json({ checkout })
  } catch (error) {
    console.error('Error fetching checkout:', error)
    return NextResponse.json({ error: 'Failed to fetch checkout' }, { status: 500 })
  }
}
