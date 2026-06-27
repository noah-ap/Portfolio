'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
import {
  getVisibleOrderedItems,
  isActiveRoute,
} from '@/lib/styles/navItemStyles'
import { getSiteNavBarStyle } from '@/lib/styles/siteNavStyles'
import type { AnimationPresetName } from '@/lib/types/animations'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { PagesConfig } from '@/lib/types/pages'
import type { SiteNavConfig } from '@/lib/types/siteNav'
import type { ResolvedTheme } from '@/lib/types/theme'
import { SiteNavLink } from './SiteNavLink'

interface SiteNavBarProps {
  pages: PagesConfig
  siteNav: SiteNavConfig
  breakpoints: BreakpointsConfig
  resolvedTheme: ResolvedTheme
}

export function SiteNavBar({
  pages,
  siteNav,
  breakpoints,
  resolvedTheme,
}: SiteNavBarProps) {
  const pathname = usePathname()
  const width = useViewportWidth()
  const navPreset = resolveAnimation(siteNav.animation as AnimationPresetName)
  const navTransition = getMotionTransition(navPreset)

  if (!siteNav.enabled) return null

  const fontSize = pickResponsive(siteNav.fontSize, width, breakpoints)
  const visiblePages = getVisibleOrderedItems(pages.items)

  return (
    <motion.nav
      aria-label="Site navigation"
      style={getSiteNavBarStyle(siteNav, resolvedTheme, width, breakpoints)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={navTransition}
    >
      {visiblePages.map((page) => (
        <SiteNavLink
          key={page.id}
          href={page.route}
          label={page.title}
          isActive={isActiveRoute(pathname, page.route)}
          siteNav={siteNav}
          theme={resolvedTheme}
          fontSize={fontSize}
        />
      ))}
    </motion.nav>
  )
}
