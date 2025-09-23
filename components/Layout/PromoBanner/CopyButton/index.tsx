import cx from 'classnames'
import copy from 'copy-to-clipboard'
import { FC, useState } from 'react'
import { iconStyles } from '~/constants/iconStyles'
import { TIMEOUT_1S } from '~/constants/timeouts'
import CopyIcon from '~/public/img/icons/copy.svg'
import TickIcon from '~/public/img/icons/tick.svg'

interface CopyButtonProps {
  value: string | number | undefined
}

const CopyButton: FC<CopyButtonProps> = ({ value }) => {
  const [hasCopied, setHasCopied] = useState(false)
  if (!value) return null

  const handleCopy = () => {
    setHasCopied(true)
    if (!value) return
    copy(String(value))
    setTimeout(() => {
      setHasCopied(false)
    }, TIMEOUT_1S)
  }

  return (
    <button
      type="button"
      title="Click to copy"
      onClick={handleCopy}
    >
      {hasCopied ? <TickIcon className={cx(iconStyles[16], 'text-green')} /> : <CopyIcon className={iconStyles[16]} />}
    </button>
  )
}

export default CopyButton
