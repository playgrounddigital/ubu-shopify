import { NextRequest, NextResponse } from 'next/server'
import { createCheckout } from '~/lib/shopify'
import { CheckoutLineItemAddInput } from '~/types/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lineItems }: { lineItems: CheckoutLineItemAddInput[] } = body

    if (!Array.isArray(lineItems)) {
      return NextResponse.json({ error: 'lineItems must be an array' }, { status: 400 })
    }

    const checkout = await createCheckout(lineItems)

    return NextResponse.json({ checkout })
  } catch (error) {
    console.error('Error creating checkout:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
