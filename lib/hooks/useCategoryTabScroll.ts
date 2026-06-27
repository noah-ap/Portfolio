'use client'

import { useEffect, useRef } from 'react'
import type { NavigationConfig } from '@/lib/types/navigation'

interface UseCategoryTabScrollOptions {
  categoryId: string
  projectCount: number
  tabScroll: NavigationConfig['categoryTransition']['tabScroll']
  setActiveIndex: (index: number) => void
}

export function useCategoryTabScroll({
  categoryId,
  projectCount,
  tabScroll,
  setActiveIndex,
}: UseCategoryTabScrollOptions) {
  const isInitialRef = useRef(true)

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false
      return
    }

    if (!tabScroll.enabled || projectCount <= 1) {
      setActiveIndex(0)
      return
    }

    const lastIndex = projectCount - 1
    setActiveIndex(lastIndex)

    const timer = setTimeout(() => {
      setActiveIndex(0)
    }, tabScroll.stepDurationMs)

    return () => clearTimeout(timer)
  }, [categoryId, projectCount, tabScroll, setActiveIndex])
}
