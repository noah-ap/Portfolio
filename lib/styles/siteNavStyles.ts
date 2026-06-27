import type { CSSProperties } from 'react'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { SiteNavConfig } from '@/lib/types/siteNav'
import type { ContentPagesConfig } from '@/lib/types/contentPages'
import type { ResolvedTheme } from '@/lib/types/theme'

export function getSiteNavHeight(
  siteNav: SiteNavConfig,
  width: number,
  breakpoints: BreakpointsConfig
): number {
  return pickResponsive(siteNav.height, width, breakpoints)
}

export function getSiteNavBarStyle(
  siteNav: SiteNavConfig,
  theme: ResolvedTheme,
  width: number,
  breakpoints: BreakpointsConfig
): CSSProperties {
  const height = getSiteNavHeight(siteNav, width, breakpoints)
  const paddingX = pickResponsive(siteNav.padding.x, width, breakpoints)
  const paddingY = pickResponsive(siteNav.padding.y, width, breakpoints)
  const backgroundColor = resolveThemeToken(siteNav.background.color, theme)

  const isOverlay = siteNav.position === 'overlay'

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: siteNav.justify,
    ...(isOverlay
      ? { position: 'fixed', top: 0, left: 0, right: 0 }
      : { flexShrink: 0 }),
    width: '100%',
    height,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    gap: pickResponsive(siteNav.gap, width, breakpoints),
    backgroundColor:
      siteNav.background.opacity <= 0
        ? 'transparent'
        : siteNav.background.opacity < 1
          ? `${backgroundColor}${Math.round(siteNav.background.opacity * 255)
              .toString(16)
              .padStart(2, '0')}`
          : backgroundColor,
    borderBottom:
      siteNav.border.width > 0
        ? `${siteNav.border.width}px solid ${resolveThemeToken(siteNav.border.color, theme)}`
        : undefined,
    borderRadius: siteNav.borderRadius,
    zIndex: 40,
  }
}

export function getSiteNavLinkWrapperStyle(): CSSProperties {
  return {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}

export function getSiteNavActiveIndicatorStyle(
  siteNav: SiteNavConfig,
  theme: ResolvedTheme
): CSSProperties {
  const { activeIndicator } = siteNav
  return {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: activeIndicator.height,
    borderRadius: activeIndicator.borderRadius,
    backgroundColor: resolveThemeToken(activeIndicator.color, theme),
  }
}

export function getContentPageStyle(
  theme: ResolvedTheme,
  spacing: { md: number; xl: number },
  siteNav?: SiteNavConfig,
  contentPages?: ContentPagesConfig
): CSSProperties {
  const backgroundColor =
    contentPages && contentPages.content.backgroundOpacity <= 0
      ? 'transparent'
      : theme.colors.background

  return {
    height: '100%',
    minHeight: '100%',
    overflowY: 'auto',
    padding: spacing.xl,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop:
      siteNav?.position === 'overlay'
        ? `calc(var(--site-nav-height, 0px) + ${spacing.xl}px)`
        : spacing.xl,
    backgroundColor,
  }
}

export function getContentPageInnerStyle(maxWidth: number): CSSProperties {
  return {
    maxWidth,
    margin: '0 auto',
    width: '100%',
  }
}

export function getContentSectionStyle(spacing: { lg: number }): CSSProperties {
  return {
    marginBottom: spacing.lg,
  }
}

export function getContactLinkListStyle(spacing: { sm: number }): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }
}

export function getContactLinkStyle(theme: ResolvedTheme): CSSProperties {
  return {
    color: theme.colors.text.secondary,
    textDecoration: 'none',
    fontSize: theme.typography.pageDescription.fontSize,
    fontWeight: theme.typography.pageDescription.fontWeight,
  }
}
