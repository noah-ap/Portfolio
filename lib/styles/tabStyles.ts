import type { CSSProperties } from 'react'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import type { LayoutConfig } from '@/lib/types/layout'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { TabsConfig, ResponsiveSize } from '@/lib/types/tabs'
import type { ResolvedTheme } from '@/lib/types/theme'
import { getActiveGlowStyle } from '@/lib/styles/glowStyles'

function toClamp(size: ResponsiveSize): string {
  return `clamp(${size.min}px, ${size.preferredVw}vw, ${size.max}px)`
}

export function getTabCardStyle(
  tabs: TabsConfig,
  theme: ResolvedTheme,
  isActive: boolean
): CSSProperties {
  const { card, border } = tabs

  return {
    width: toClamp(card.width),
    height: toClamp(card.height),
    maxWidth: `${card.maxWidthVw}vw`,
    maxHeight: `${card.maxHeightVh}vh`,
    borderRadius: card.borderRadius,
    backgroundColor: resolveThemeToken(card.backgroundColor, theme),
    opacity: isActive ? 1 : card.opacity.inactive,
    borderWidth: isActive ? border.activeWidth : border.inactiveWidth,
    borderStyle: 'solid',
    borderColor: resolveThemeToken(
      isActive ? border.activeColor : border.inactiveColor,
      theme
    ),
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    userSelect: 'none',
  }
}

export function getTabInnerStyle(
  tabs: TabsConfig,
  theme: ResolvedTheme,
  isActive: boolean,
  hoverPreset: ResolvedAnimationPreset
): CSSProperties {
  const scale = isActive ? tabs.active.scale : tabs.default.scale
  const { boxShadow } = getActiveGlowStyle(theme, isActive)

  return {
    ['--tab-scale' as string]: scale,
    ['--tab-hover-scale' as string]: tabs.hover.scale,
    ['--tab-hover-lift' as string]: `${tabs.hover.lift}px`,
    ['--tab-transition' as string]: `${hoverPreset.duration}ms ${hoverPreset.easing}`,
    width: '100%',
    height: '100%',
    transform: `scale(${scale})`,
    transition: `transform var(--tab-transition), box-shadow ${theme.glow.transitionMs}ms ease`,
    borderRadius: tabs.card.borderRadius,
    boxShadow,
  }
}

export function getTabImageStyle(
  tabs: TabsConfig,
  isActive: boolean
): CSSProperties {
  return {
    width: '100%',
    height: tabs.card.imageHeight,
    objectFit: tabs.image.objectFit,
    objectPosition: tabs.image.objectPosition,
    filter: isActive ? `brightness(${tabs.image.activeBrightness})` : undefined,
    position: 'absolute',
    inset: 0,
  }
}

export function getTabPlaceholderStyle(
  tabs: TabsConfig,
  theme: ResolvedTheme
): CSSProperties {
  const { placeholder } = tabs
  return {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(to bottom right, ${resolveThemeToken(placeholder.gradientFrom, theme)}, ${resolveThemeToken(placeholder.gradientTo, theme)})`,
    color: resolveThemeToken(placeholder.textColor, theme),
    fontSize: placeholder.fontSize,
    fontWeight: 300,
  }
}

export function getTabTitleOverlayStyle(
  tabs: TabsConfig,
  theme: ResolvedTheme
): CSSProperties {
  const { title } = tabs
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: title.padding,
    background: `linear-gradient(to top, ${resolveThemeToken('overlay.from', theme)}, ${resolveThemeToken('overlay.to', theme)})`,
    color: resolveThemeToken('text.primary', theme),
    fontSize: title.fontSize,
    fontWeight: title.fontWeight,
    userSelect: 'none',
  }
}

export function getTabSubtitleOverlayStyle(
  tabs: TabsConfig,
  theme: ResolvedTheme,
  spacing: { xs: number }
): CSSProperties {
  return {
    color: resolveThemeToken('text.muted', theme),
    fontSize: tabs.subtitle.fontSize,
    fontWeight: tabs.subtitle.fontWeight,
    marginTop: spacing.xs,
  }
}

export function getTabListStyle(
  tabs: TabsConfig,
  layout: LayoutConfig,
  spacing: SpacingConfig
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: tabs.gap,
    padding: spacing.xl,
    justifyContent: layout.projectList.justify,
    overflowX: layout.projectList.overflowX,
    alignItems: 'center',
    width: '100%',
  }
}

export function getIndicatorListStyle(
  navigation: NavigationConfig,
  spacing: SpacingConfig
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: navigation.indicators.gap,
    justifyContent: 'center',
    paddingTop: spacing.xl,
  }
}

export function getIndicatorStyle(
  navigation: NavigationConfig,
  theme: ResolvedTheme,
  isActive: boolean
): CSSProperties {
  const { indicators } = navigation
  return {
    width: indicators.size,
    height: isActive ? indicators.activeHeight : indicators.size,
    borderRadius: indicators.size,
    backgroundColor: resolveThemeToken(
      isActive ? indicators.colors.active : indicators.colors.inactive,
      theme
    ),
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    outline: 'none',
  }
}

export function getTabButtonResetStyle(): CSSProperties {
  return {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
  }
}
