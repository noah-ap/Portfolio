'use client'

import type { CSSProperties, ReactNode } from 'react'
import { getSiteConfig } from '@/lib/config/siteConfig'
import { getSiteNavHeight } from '@/lib/styles/siteNavStyles'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import { ThemeProvider, useSiteTheme } from '@/lib/hooks/themeContext'
import { PageTransitionProvider } from '@/lib/hooks/pageTransitionContext'
import { SiteNavBar } from '@/components/navigation/SiteNavBar'
import { ThemeToggle } from '@/components/navigation/ThemeToggle'
import { PageTransitionLayer } from './PageTransitionLayer'
import { ScrollProvider } from './ScrollProvider'

interface AppShellProps {
  children: ReactNode
}

function AppShellInner({ children }: AppShellProps) {
  const config = getSiteConfig()
  const { resolvedTheme, preset, setPreset } = useSiteTheme()
  const width = useViewportWidth()
  const navHeight = getSiteNavHeight(config.siteNav, width, config.breakpoints)

  const shellStyle: CSSProperties = {
    backgroundColor: resolvedTheme.colors.background,
    ['--site-nav-height' as string]: `${navHeight}px`,
  }

  return (
    <PageTransitionProvider pageChildren={children}>
      <div className="relative flex flex-col h-screen w-full" style={shellStyle}>
        <SiteNavBar
          pages={config.pages}
          siteNav={config.siteNav}
          breakpoints={config.breakpoints}
          resolvedTheme={resolvedTheme}
        />
        <ScrollProvider config={config.scroll}>
          <main className="flex-1 min-h-0 w-full relative">
            <PageTransitionLayer animation={config.pages.transition.animation}>
              {config.navigation.themeToggle.enabled && (
                <ThemeToggle
                  navigation={config.navigation}
                  breakpoints={config.breakpoints}
                  resolvedTheme={resolvedTheme}
                  activePreset={preset}
                  onChange={setPreset}
                />
              )}
            </PageTransitionLayer>
          </main>
        </ScrollProvider>
      </div>
    </PageTransitionProvider>
  )
}

export function AppShell({ children }: AppShellProps) {
  const config = getSiteConfig()

  return (
    <ThemeProvider defaultPreset={config.theme.preset}>
      <AppShellInner>{children}</AppShellInner>
    </ThemeProvider>
  )
}
