'use client'

import type { AboutConfig } from '@/lib/types/about'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { ContentPagesConfig } from '@/lib/types/contentPages'
import type { ResolvedGlass } from '@/lib/types/glass'
import type { SpacingConfig } from '@/lib/types/spacing'
import { GlassCard } from '@/components/ui/GlassCard'
import { useSiteTheme } from '@/lib/hooks/themeContext'
import { getContentSectionStyle } from '@/lib/styles/siteNavStyles'
import { getVisibleOrderedItems } from '@/lib/styles/navItemStyles'
import {
  getActiveDescriptionStyle,
  getActiveSubtitleStyle,
  getActiveTitleStyle,
} from '@/lib/styles/layoutStyles'

interface AboutPageProps {
  about: AboutConfig
  contentPages: ContentPagesConfig
  glass: ResolvedGlass
  breakpoints: BreakpointsConfig
  spacing: SpacingConfig
}

export function AboutPage({
  about,
  contentPages,
  glass,
  breakpoints,
  spacing,
}: AboutPageProps) {
  const { resolvedTheme } = useSiteTheme()
  const sections = getVisibleOrderedItems(about.sections)

  const content = (
    <>
      <h1 style={getActiveTitleStyle(resolvedTheme, spacing)}>{about.title}</h1>
      {about.subtitle && (
        <p style={getActiveSubtitleStyle(resolvedTheme, spacing)}>{about.subtitle}</p>
      )}
      {sections.map((section) => (
        <section key={section.id} style={getContentSectionStyle(spacing)}>
          <h2 style={getActiveSubtitleStyle(resolvedTheme, spacing)}>
            {section.title}
          </h2>
          <p style={getActiveDescriptionStyle(resolvedTheme)}>{section.content}</p>
        </section>
      ))}
    </>
  )

  if (!contentPages.glass.enabled) return content

  return (
    <GlassCard
      glass={glass}
      resolvedTheme={resolvedTheme}
      breakpoints={breakpoints}
      animateEntrance={contentPages.glass.animateEntrance}
    >
      {content}
    </GlassCard>
  )
}
