import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { usePageTransitionContext } from '~/context/PageTransitionContext'

interface AnimateLayoutProps {
  children: ReactNode
}

const AnimateLayout: FC<AnimateLayoutProps> = ({ children }) => {
  const { pending } = usePageTransitionContext()

  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      {!pending && (
        // @ts-expect-error
        <motion.main
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            ease: 'linear',
            duration: 0.4,
          }}
        >
          {children}
        </motion.main>
      )}
    </AnimatePresence>
  )
}

export default AnimateLayout
