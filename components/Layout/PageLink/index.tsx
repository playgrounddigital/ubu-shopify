import cx from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode, forwardRef } from 'react'

interface PageLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  href: string
  wrapChild?: boolean
  className?: string
  children: ReactNode | string
}

const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>(
  ({ href, wrapChild, className, children, ...props }, ref) => {
    const isExternal = href?.startsWith('http')

    return (
      <>
        {!href && (
          <div
            ref={ref}
            className={cx(className, {
              'block w-max': wrapChild,
            })}
            {...(props as any)}
          >
            {children}
          </div>
        )}
        {href && (
          <>
            {href.startsWith('#') || href.startsWith('mailto') || href.includes('http') ? (
              <a
                ref={ref}
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cx(className, {
                  'block w-fit': wrapChild,
                })}
                {...props}
              >
                {children}
              </a>
            ) : (
              <Link
                ref={ref}
                href={href}
                scroll={false}
                passHref
                {...props}
                className={cx(className, {
                  'block w-fit': wrapChild,
                })}
              >
                {children}
              </Link>
            )}
          </>
        )}
      </>
    )
  }
)

export default PageLink
