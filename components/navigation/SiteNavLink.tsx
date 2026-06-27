'use client'

import Link from 'next/link'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { getNavItemStyle } from '@/lib/styles/navItemStyles'
import { usePageTransition } from '@/lib/hooks/pageTransitionContext'
import type { SiteNavConfig } from '@/lib/types/siteNav'
import type { ResolvedTheme } from '@/lib/types/theme'

interface SiteNavLinkProps {
  href: string
  label: string
  isActive: boolean
  siteNav: SiteNavConfig
  theme: ResolvedTheme
  fontSize: number
}

export function SiteNavLink({
  href,
  label,
  isActive,
  siteNav,
  theme,
  fontSize,
}: SiteNavLinkProps) {
  const { navigate, isTransitioning } = usePageTransition()

  return (
    <Link
      href={href}
      aria-disabled={isTransitioning}
      className={getActiveTextGlowClassName(isActive)}
      style={{
        ...getNavItemStyle(siteNav, theme, isActive, fontSize),
        pointerEvents: isTransitioning ? 'none' : undefined,
      }}
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return
        }

        event.preventDefault()
        navigate(href)
      }}
    >
      {label}
    </Link>
  )
}
