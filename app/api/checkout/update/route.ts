import { NextRequest, NextResponse } from 'next/server'
import { updateCheckout } from '~/lib/shopify'
import { CheckoutLineItemAddInput, CheckoutLineItemUpdateInput } from '~/types/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      checkoutId,
      add,
      update,
    }: {
      checkoutId: string
      add?: CheckoutLineItemAddInput[]
      update?: CheckoutLineItemUpdateInput[]
    } = body

    if (!checkoutId) {
      return NextResponse.json({ error: 'checkoutId is required' }, { status: 400 })
    }

    if ((!add || add.length === 0) && (!update || update.length === 0)) {
      return NextResponse.json({ error: 'Either add or update items must be provided' }, { status: 400 })
    }

    const checkout = await updateCheckout({ checkoutId, add, update })

    return NextResponse.json({ checkout })
  } catch (error) {
    console.error('Error updating checkout:', error)
    return NextResponse.json({ error: 'Failed to update checkout' }, { status: 500 })
  }
}
