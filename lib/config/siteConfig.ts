import {
  animations,
  about,
  breakpoints,
  categories,
  contact,
  contentPages,
  cylinder,
  layout,
  navigation,
  pages,
  projects,
  siteNav,
  spacing,
  tabs,
  theme,
} from '@/config'
import { resolveGlass } from '@/lib/config/resolveGlass'
import { resolveBackground } from '@/lib/config/resolveBackground'
import { resolveScene } from '@/lib/config/resolveScene'
import { resolveScroll } from '@/lib/config/resolveScroll'
import { resolveTheme } from '@/lib/config/resolveTheme'
import { themeToCssVars } from '@/lib/config/themeVars'
import type { ResolvedBackground } from '@/lib/types/background'
import type { ResolvedScene } from '@/lib/types/scene'
import type { ResolvedScroll } from '@/lib/types/scroll'
import type { ResolvedGlass } from '@/lib/types/glass'
import type { ResolvedTheme } from '@/lib/types/theme'

export interface SiteConfig {
  projects: typeof projects
  categories: typeof categories
  tabs: typeof tabs
  layout: typeof layout
  cylinder: typeof cylinder
  scene: ResolvedScene
  theme: typeof theme
  resolvedTheme: ResolvedTheme
  themeVars: Record<string, string>
  animations: typeof animations
  scroll: ResolvedScroll
  background: ResolvedBackground
  navigation: typeof navigation
  pages: typeof pages
  siteNav: typeof siteNav
  about: typeof about
  contact: typeof contact
  contentPages: typeof contentPages
  glass: ResolvedGlass
  spacing: typeof spacing
  breakpoints: typeof breakpoints
}

export function getSiteConfig(themePreset?: ResolvedTheme['presetName']): SiteConfig {
  const resolvedTheme = resolveTheme(themePreset ?? theme.preset)

  return {
    projects,
    categories,
    tabs,
    layout,
    cylinder,
    scene: resolveScene(),
    theme,
    resolvedTheme,
    themeVars: themeToCssVars(resolvedTheme),
    animations,
    scroll: resolveScroll(),
    background: resolveBackground(),
    navigation,
    pages,
    siteNav,
    about,
    contact,
    contentPages,
    glass: resolveGlass(contentPages.glass.preset),
    spacing,
    breakpoints,
  }
}

export function getProjectsForCategory(
  categoryId: string,
  allProjects: typeof projects,
  allCategories: typeof categories
) {
  const category = allCategories.find((c) => c.id === categoryId)
  if (!category) return allProjects
  return category.projectSlugs
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => p !== undefined)
}
