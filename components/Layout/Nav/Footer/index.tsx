'use client'
import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import OptimisedImage from '~/components/Layout/OptimisedImage'
import OutgoingLink from '~/components/Layout/OutgoingLink'
import FooterJSON from '~/public/footer.json'

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white">
      <Container className="pt-16 pb-14">
        <div className="mb-[50px] flex items-center justify-between text-[44px] leading-10 -tracking-[2.64px]">
          <p className="font-semibold">Sign up to our newsletter</p>

          <div className="flex max-w-[650px] gap-x-10 border-b border-white pb-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent placeholder:text-white"
            />
            <Button
              type="submit"
              size="md"
              variant="black-pink"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <hr className="mb-16" />

        <div className="mb-[168px] flex justify-end">
          <div className="flex gap-x-5">
            {FooterJSON.socialLinks.map((item) => (
              <OutgoingLink
                href={item.link}
                key={item.id}
              >
                <OptimisedImage
                  src={item.image.url}
                  alt={item.name}
                  className="size-[42px] transition-opacity hover:opacity-70"
                />
              </OutgoingLink>
            ))}
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="flex justify-end">
          <div className="flex gap-x-5">
            {FooterJSON.acceptedPaymentMethods.map((item) => (
              <OptimisedImage
                key={item.id}
                src={item.image.url}
                alt={item.name}
                className="h-6 w-[34px]"
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
