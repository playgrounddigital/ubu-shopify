import cx from 'classnames'
import { AnchorHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'

interface OutgoingLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  href: string
  wrapChild?: boolean
  className?: string
  children: string | ReactNode
}

const OutgoingLink: FC<OutgoingLinkProps> = ({ href, wrapChild, className, children, ...props }) => (
  <>
    {!href && (
      <div
        className={cx(className, {
          'block w-max': wrapChild,
        })}
        {...(props as any)}
      >
        {children}
      </div>
    )}
    {href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(className, {
          'block w-max': wrapChild,
        })}
        {...props}
      >
        {children}
      </a>
    )}
  </>
)

export default OutgoingLink
