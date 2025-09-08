import cx from 'classnames'
import { FC, useEffect, useState } from 'react'
import { getVimeoPlayerURL } from '~/components/Shared/AutoplayVimeoVideo/utils'
import useBreakpoints from '~/hooks/useBreakpoints'

const VIMEO_PLAYER_READY_TIMEOUT = 1800

interface AutoplayVimeoVideoProps extends React.HTMLProps<HTMLDivElement> {
  isFullScreen?: boolean
  isFullWidthAndHeight?: boolean
  src: string
  autoplay?: boolean
  loop?: boolean
  hasControls?: boolean
  wrapperClassName?: string
  className?: string
}

const AutoplayVimeoVideo: FC<AutoplayVimeoVideoProps> = ({
  isFullScreen,
  isFullWidthAndHeight,
  src,
  autoplay,
  loop = true,
  hasControls = false,
  wrapperClassName,
  className,
  ...rest
}) => {
  const { isTablet } = useBreakpoints()
  const [isVimeoPlayerReady, setIsVimeoPlayerReady] = useState(false)

  useEffect(() => {
    // Vimeo player is ready after a timeout
    const timeout = setTimeout(() => {
      setIsVimeoPlayerReady(true)
    }, VIMEO_PLAYER_READY_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={cx('relative flex h-full w-full items-center justify-center overflow-hidden', className)}
      {...rest}
    >
      {/* Wrapper */}
      <div
        className={cx('vimeo-container absolute w-full', wrapperClassName, {
          'h-full pb-[56.25%]': !isFullScreen && !isFullWidthAndHeight,
          'inset-0 h-svh overflow-hidden': isFullScreen,
          'inset-0 h-full overflow-hidden': isFullWidthAndHeight,
        })}
      >
        <iframe
          src={getVimeoPlayerURL({
            src,
            loop,
            autoplay,
            hasControls,
          })}
          allow="autoplay; fullscreen"
          className={cx('absolute inset-0 h-full w-full transition-[filter,opacity]', {
            'opacity-0 blur-sm': !isVimeoPlayerReady,
          })}
        />
      </div>
      {(isFullScreen || isFullWidthAndHeight) && (
        <style>{`
          .vimeo-container > iframe {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
          }
      `}</style>
      )}
      {isFullScreen && (
        <style>{`
            .vimeo-container > iframe {
                width: 177.77777778vh;
                height: 56.25vw;
              }
          `}</style>
      )}
      {isFullWidthAndHeight && isTablet && (
        <style>{`
            .vimeo-container > iframe {
                width: 177.77777778vh;
                height: 56.25vw;
              }
          `}</style>
      )}
      <style>
        {`
          .vimeo-container > iframe > div[role='dialog'][class^='ToastBase_module_toast'] {
              display: none;
          }
        `}
      </style>
    </div>
  )
}

export default AutoplayVimeoVideo
