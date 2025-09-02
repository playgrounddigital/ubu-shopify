'use client'
import { FC } from 'react'
import ChevronLeftIcon from '~/public/img/icons/chevron-left.svg'

interface BackButtonProps {
  onClick: () => void
  children?: string
}

const BackButton: FC<BackButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mb-4 flex w-fit -translate-y-2 items-center gap-x-3.5 py-2 text-[13px] font-bold uppercase"
    >
      <ChevronLeftIcon className="h-3 w-1.5" /> {children || 'Back'}
    </button>
  )
}

export default BackButton
