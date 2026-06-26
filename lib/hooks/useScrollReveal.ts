'use client'

import { useEffect, useRef, useState } from 'react'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { useScrollContext } from '@/lib/hooks/scrollContext'
import {
  getRevealInitialStyle,
  getRevealVisibleStyle,
} from '@/lib/styles/animationStyles'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const { config } = useScrollContext()
  const [isVisible, setIsVisible] = useState(false)
  const preset = resolveAnimation('sectionReveal')

  useEffect(() => {
    if (!config.enabled) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px -${config.reveal.distance / 2}px 0px` }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [config])

  const style = isVisible
    ? getRevealVisibleStyle(config.reveal, preset)
    : getRevealInitialStyle(config.reveal, preset)

  return { ref, style, isVisible }
}
