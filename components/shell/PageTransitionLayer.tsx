'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { getPageTransitionVariants } from '@/lib/animations/pageTransitionVariants'
import { usePageTransition } from '@/lib/hooks/pageTransitionContext'
import type { AnimationPresetName } from '@/lib/types/animations'

interface PageTransitionLayerProps {
  animation: AnimationPresetName
  durationScale?: number
  children: ReactNode
}

export function PageTransitionLayer({
  animation,
  durationScale = 1,
  children,
}: PageTransitionLayerProps) {
  const {
    displayChildren,
    displayPathname,
    visible,
    onExitComplete,
    onEnterComplete,
  } = usePageTransition()
  const preset = resolveAnimation(animation)
  const transition = getMotionTransition(preset, false, durationScale)
  const variants = getPageTransitionVariants(preset)
  const notifyEnterRef = useRef(false)

  useEffect(() => {
    notifyEnterRef.current = visible
  }, [visible, displayPathname])

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key={displayPathname}
          className="relative h-full w-full"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={transition}
          onAnimationComplete={() => {
            if (notifyEnterRef.current) {
              onEnterComplete()
            }
          }}
        >
          {children}
          <div className="relative h-full w-full min-h-0">{displayChildren}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
