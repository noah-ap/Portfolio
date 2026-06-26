'use client'

import { useEffect } from 'react'
import type { ResolvedScroll } from '@/lib/types/scroll'

interface ConsoleNavigationHandlers {
  onRotateNext: () => void
  onRotatePrev: () => void
  onExpand: () => void
  onCollapse: () => void
  onNextCategory: () => void
  onPrevCategory: () => void
}

interface UseConsoleNavigationOptions extends ConsoleNavigationHandlers {
  scroll: ResolvedScroll
  keyboardEnabled: boolean
  isExpanded: boolean
}

export function useConsoleNavigation({
  scroll,
  keyboardEnabled,
  isExpanded,
  onRotateNext,
  onRotatePrev,
  onExpand,
  onCollapse,
  onNextCategory,
  onPrevCategory,
}: UseConsoleNavigationOptions) {
  useEffect(() => {
    if (!scroll.enabled || !keyboardEnabled) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (scroll.arrowHorizontal === 'rotateTabs') onRotatePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (scroll.arrowHorizontal === 'rotateTabs') onRotateNext()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (isExpanded) return
        if (scroll.arrowVertical === 'categoryNav') onExpand()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (isExpanded) onCollapse()
        else if (scroll.arrowVertical === 'categoryNav') onPrevCategory()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!isExpanded && scroll.enterKey === 'expand') onExpand()
      }
    }

    function handleWheel(e: WheelEvent) {
      if (!scroll.wheelNavigation) return
      e.preventDefault()

      if (e.deltaY > 0) {
        if (!isExpanded && scroll.wheelDown === 'expand') onExpand()
        else if (scroll.wheelDown === 'rotateNext') onRotateNext()
      } else if (e.deltaY < 0) {
        if (isExpanded && scroll.wheelUp === 'collapse') onCollapse()
        else if (!isExpanded && scroll.wheelUp === 'collapse') onPrevCategory()
        else if (scroll.wheelUp === 'rotatePrev') onRotatePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [
    scroll,
    keyboardEnabled,
    isExpanded,
    onRotateNext,
    onRotatePrev,
    onExpand,
    onCollapse,
    onNextCategory,
    onPrevCategory,
  ])
}
