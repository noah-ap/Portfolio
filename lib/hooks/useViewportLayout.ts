'use client'

import { useEffect, useState } from 'react'

const SSR_DEFAULT = { width: 1280, height: 800 }

export interface ViewportLayout {
  width: number
  height: number
  isPortrait: boolean
}

export function useViewportLayout(): ViewportLayout {
  const [layout, setLayout] = useState<ViewportLayout>(() => {
    if (typeof window === 'undefined') {
      return {
        width: SSR_DEFAULT.width,
        height: SSR_DEFAULT.height,
        isPortrait: SSR_DEFAULT.height > SSR_DEFAULT.width,
      }
    }
    const { innerWidth, innerHeight } = window
    return {
      width: innerWidth,
      height: innerHeight,
      isPortrait: innerHeight > innerWidth,
    }
  })

  useEffect(() => {
    const update = () => {
      const { innerWidth, innerHeight } = window
      setLayout({
        width: innerWidth,
        height: innerHeight,
        isPortrait: innerHeight > innerWidth,
      })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return layout
}
