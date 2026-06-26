import type { CSSProperties } from 'react'
import type { LayoutConfig } from '@/lib/types/layout'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { ResolvedTheme } from '@/lib/types/theme'

export function getMainStyle(layout: LayoutConfig): CSSProperties {
  return {
    position: 'relative',
    minHeight: layout.page.minHeight,
    padding: layout.page.padding,
    maxWidth: layout.centered ? layout.maxWidth : undefined,
    margin: layout.centered ? '0 auto' : undefined,
    display: 'flex',
    flexDirection: layout.direction,
    width: '100%',
    zIndex: 1,
  }
}

export function getPageContentStyle(
  layout: LayoutConfig,
  spacing: SpacingConfig
): CSSProperties {
  const section = layout.sections.projectDetail
  return {
    maxWidth: section.maxWidth,
    margin: '0 auto',
    paddingTop: section.paddingTop,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    textAlign: 'center',
  }
}

export function getActiveTitleStyle(resolvedTheme: ResolvedTheme, spacing: SpacingConfig): CSSProperties {
  return {
    color: resolvedTheme.colors.text.primary,
    fontSize: resolvedTheme.typography.pageTitle.fontSize,
    fontWeight: resolvedTheme.typography.pageTitle.fontWeight,
    marginBottom: spacing.sm,
  }
}

export function getActiveSubtitleStyle(resolvedTheme: ResolvedTheme, spacing: SpacingConfig): CSSProperties {
  return {
    color: resolvedTheme.colors.text.muted,
    fontSize: resolvedTheme.typography.pageSubtitle.fontSize,
    fontWeight: resolvedTheme.typography.pageSubtitle.fontWeight,
    marginBottom: spacing.md,
  }
}

export function getActiveDescriptionStyle(resolvedTheme: ResolvedTheme): CSSProperties {
  return {
    color: resolvedTheme.colors.text.secondary,
    fontSize: resolvedTheme.typography.pageDescription.fontSize,
    fontWeight: resolvedTheme.typography.pageDescription.fontWeight,
    lineHeight: resolvedTheme.typography.pageDescription.lineHeight,
  }
}

export function getScrollContainerStyle(smoothScrolling: boolean): CSSProperties {
  return {
    scrollBehavior: smoothScrolling ? 'smooth' : 'auto',
    width: '100%',
    flex: 1,
  }
}

export function getTabListWrapperStyle(scale: number): CSSProperties {
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    width: '100%',
  }
}
