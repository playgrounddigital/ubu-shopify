import { cookies } from 'next/headers'
import Container from '~/components/Layout/Container'
import { getCustomerWithOrders } from '~/lib/shopify'

export default async function AccountPage() {
  let customer: {
    firstName?: string | null
    lastName?: string | null
    email: string
    orders: {
      id: string
      orderNumber: number
      processedAt: string
      totalPrice: { amount: string; currencyCode: string }
      statusUrl?: string | null
    }[]
  } | null = null

  try {
    const cookie = (await cookies()).get('customerAccessToken')
    if (cookie?.value) {
      const token = JSON.parse(cookie.value) as { accessToken: string }
      const data = await getCustomerWithOrders(token.accessToken)
      customer = {
        firstName: data.firstName ?? null,
        lastName: data.lastName ?? null,
        email: data.email,
        orders: data.orders,
      }
    }
  } catch {}

  return (
    <Container className="py-16">
      {!customer ? (
        <div className="mx-auto max-w-[680px]">
          <h1 className="mb-4 text-[64px] leading-none font-semibold -tracking-[2px]">You’re not signed in</h1>
          <p className="mb-8">Please sign in to view your orders.</p>
          <a
            className="underline"
            href="/sign-in"
          >
            Go to Sign in
          </a>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-[64px] leading-none font-semibold -tracking-[2px]">
            Welcome{customer.firstName ? `, ${customer.firstName}` : ''}
          </h1>
          <p className="mb-10">{customer.email}</p>

          <h2 className="mb-6 text-2xl font-semibold">Order history</h2>
          {!customer.orders?.length ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="divide-y">
              {customer.orders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between py-5"
                >
                  <div>
                    <p className="font-semibold">Order #{o.orderNumber}</p>
                    <p className="text-sm text-neutral-600">{new Date(o.processedAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {o.totalPrice.amount} {o.totalPrice.currencyCode}
                    </p>
                    {o.statusUrl && (
                      <a
                        className="underline"
                        href={o.statusUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Track order
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  )
}
