'use client'
import { FC } from 'react'
import CircleButton from '~/components/Layout/Button/Circle'
import PageLink from '~/components/Layout/PageLink'

interface MobileNavLinkProps {
  isButton?: boolean
  hasCircleButton?: boolean
  title: string
  href: string
  onClick: () => void
  onClose: () => void
}

const MobileNavLink: FC<MobileNavLinkProps> = ({ title, href, isButton, hasCircleButton = true, onClick, onClose }) => {
  return (
    <li className="border-b border-green pb-[13px]">
      <div className="flex items-center justify-between">
        <PageLink
          href={href}
          onClick={onClose}
          className="text-general-title"
        >
          {title}
        </PageLink>
        {hasCircleButton && (
          <PageLink
            href={!isButton ? href : undefined}
            onClick={!isButton ? onClick : undefined}
          >
            <CircleButton
              tabIndex={isButton ? undefined : -1}
              ariaLabel={isButton ? `Open ${title.toLowerCase()}` : ''}
              variant="white-black"
              onClick={isButton ? onClick : undefined}
            />
          </PageLink>
        )}
      </div>
    </li>
  )
}

export default MobileNavLink
