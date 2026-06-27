'use client'

import type { ContactConfig } from '@/lib/types/contact'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { ContentPagesConfig } from '@/lib/types/contentPages'
import type { ResolvedGlass } from '@/lib/types/glass'
import type { SpacingConfig } from '@/lib/types/spacing'
import { GlassCard } from '@/components/ui/GlassCard'
import { useSiteTheme } from '@/lib/hooks/themeContext'
import {
  getContactLinkListStyle,
  getContactLinkStyle,
} from '@/lib/styles/siteNavStyles'
import { getVisibleOrderedItems } from '@/lib/styles/navItemStyles'
import {
  getActiveDescriptionStyle,
  getActiveSubtitleStyle,
  getActiveTitleStyle,
} from '@/lib/styles/layoutStyles'

interface ContactPageProps {
  contact: ContactConfig
  contentPages: ContentPagesConfig
  glass: ResolvedGlass
  breakpoints: BreakpointsConfig
  spacing: SpacingConfig
}

export function ContactPage({
  contact,
  contentPages,
  glass,
  breakpoints,
  spacing,
}: ContactPageProps) {
  const { resolvedTheme } = useSiteTheme()
  const links = getVisibleOrderedItems(contact.links)

  const content = (
    <>
      <h1 style={getActiveTitleStyle(resolvedTheme, spacing)}>{contact.title}</h1>
      {contact.subtitle && (
        <p style={getActiveSubtitleStyle(resolvedTheme, spacing)}>
          {contact.subtitle}
        </p>
      )}
      {contact.email && (
        <p style={getActiveDescriptionStyle(resolvedTheme)}>
          Email:{' '}
          <a
            href={`mailto:${contact.email}`}
            style={getContactLinkStyle(resolvedTheme)}
          >
            {contact.email}
          </a>
        </p>
      )}
      <ul style={getContactLinkListStyle(spacing)}>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={
                link.url.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              style={getContactLinkStyle(resolvedTheme)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
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
