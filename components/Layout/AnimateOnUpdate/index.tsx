import cx from 'classnames'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'

interface AnimateOnUpdateProps extends HTMLMotionProps<'div'> {
  updateKey: string | number | boolean
  isSpan?: boolean
  disableTransition?: boolean
  initialDelay?: number
  animateDelay?: number
  exitDelay?: number
  exitBeforeEnter?: boolean
  duration?: number
  onClick?: () => void
  className?: string
  children: ReactNode
}

const AnimateOnUpdate: ForwardRefRenderFunction<HTMLDivElement, AnimateOnUpdateProps> = (
  {
    updateKey,
    isSpan,
    disableTransition,
    initialDelay,
    animateDelay,
    exitDelay,
    exitBeforeEnter = true,
    duration = 0.3,
    onClick,
    className,
    children,
    ...props
  },
  ref
) => {
  const componentProps = {
    ref,
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration,
        delay: animateDelay || 0,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration,
        delay: exitDelay || 0,
      },
    },
    transition: {
      ease: 'linear',
      duration,
    },
    className: cx(className),
    onClick,
    ...props,
  }

  return disableTransition ? (
    // @ts-expect-error
    <div
      className={cx(className)}
      {...props}
    >
      {children}
    </div>
  ) : (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter}>
      {isSpan ? (
        // @ts-expect-error
        <motion.span
          key={String(updateKey)}
          {...componentProps}
        >
          {children}
        </motion.span>
      ) : (
        // @ts-expect-error
        <motion.div
          key={String(updateKey)}
          {...componentProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default forwardRef(AnimateOnUpdate)
