import { cookies } from 'next/headers'
import AuthLayout from '~/components/Layout/AuthLayout'
import PageLink from '~/components/Layout/PageLink'
import { getCustomerWithOrders } from '~/lib/shopify'
import { SignInContent } from '~/types/cms/pages/sign-in'
import { SitePages } from '~/types/pages'

export default async function AccountPage({ content }: { content: SignInContent }) {
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
    <AuthLayout
      image={content.image}
      title={!customer ? 'Account' : `Welcome${customer.firstName ? `, ${customer.firstName}` : ''}`}
      description={!customer ? 'Please sign in to view your orders.' : customer.email}
      content={content.content}
    >
      {!customer ? (
        <PageLink
          href={SitePages.SignIn}
          className="underline"
        >
          Go to Sign in
        </PageLink>
      ) : (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Order history</h2>
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
    </AuthLayout>
  )
}
