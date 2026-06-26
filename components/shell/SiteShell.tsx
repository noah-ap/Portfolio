'use client'

import type { ReactNode } from 'react'
import { getSiteConfig } from '@/lib/config/siteConfig'
import { themeVarsToStyleBlock } from '@/lib/config/themeVars'
import { getMainStyle } from '@/lib/styles/layoutStyles'
import { Background } from './Background'
import { ScrollProvider } from './ScrollProvider'

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const config = getSiteConfig()
  const isCylinder = config.layout.mode === 'cylinder'

  if (isCylinder) {
    return (
      <ScrollProvider config={config.scroll}>
        {children}
      </ScrollProvider>
    )
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: themeVarsToStyleBlock(config.themeVars),
        }}
      />
      <Background config={config.background} />
      <ScrollProvider config={config.scroll}>
        <main style={getMainStyle(config.layout)}>{children}</main>
      </ScrollProvider>
    </>
  )
}
