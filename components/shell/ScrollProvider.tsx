'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { ScrollContext } from '@/lib/hooks/scrollContext'
import { getScrollContainerStyle } from '@/lib/styles/layoutStyles'
import type { ResolvedScroll } from '@/lib/types/scroll'

interface ScrollProviderProps {
  config: ResolvedScroll
  children: ReactNode
}

export function ScrollProvider({ config, children }: ScrollProviderProps) {
  useEffect(() => {
    if (config.bodyOverflow === 'hidden') {
      document.body.classList.add('scroll-locked')
      return () => document.body.classList.remove('scroll-locked')
    }
    document.body.classList.remove('scroll-locked')
  }, [config.bodyOverflow])

  return (
    <ScrollContext.Provider value={{ config }}>
      <div style={getScrollContainerStyle(config.smoothScrolling)}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
