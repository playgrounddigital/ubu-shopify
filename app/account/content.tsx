import { cookies } from 'next/headers'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'
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
    <section>
      <Container
        noPaddingDesktop
        className="pt-[126px]"
      >
        <div className="grid gap-x-5 lg:grid-cols-2">
          <OptimisedImage
            src={content.image.url}
            alt={joinSmartTagsIntoString(content.image.smartTags)}
            layout="cover"
            className="w-full"
          />
          <div className="bg-off-white p-[50px]">
            {!customer ? (
              <div>
                <h1 className="mb-4.5 text-right text-[76px] leading-none font-semibold -tracking-[4.56px]">Account</h1>
                <p className="mb-12 ml-auto max-w-[243px] text-right">Please sign in to view your orders.</p>
                <PageLink
                  href={SitePages.SignIn}
                  className="underline"
                >
                  Go to Sign in
                </PageLink>
              </div>
            ) : (
              <div>
                <h1 className="mb-4.5 text-right text-[76px] leading-none font-semibold -tracking-[4.56px]">
                  Welcome{customer.firstName ? `, ${customer.firstName}` : ''}
                </h1>
                <p className="mb-12 ml-auto max-w-[243px] text-right">{customer.email}</p>
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
          </div>
        </div>
      </Container>
    </section>
  )
}
