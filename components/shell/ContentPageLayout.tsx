'use client'

import type { ReactNode } from 'react'
import { Scene } from '@/components/scene/Scene'
import { getContentPageStyle } from '@/lib/styles/siteNavStyles'
import { useSiteTheme } from '@/lib/hooks/themeContext'
import type { ContentPagesConfig } from '@/lib/types/contentPages'
import type { CylinderConfig } from '@/lib/types/cylinder'
import type { ResolvedScene } from '@/lib/types/scene'
import type { SiteNavConfig } from '@/lib/types/siteNav'
import type { SpacingConfig } from '@/lib/types/spacing'

interface ContentPageLayoutProps {
  scene: ResolvedScene
  cylinder: CylinderConfig
  contentPages: ContentPagesConfig
  siteNav: SiteNavConfig
  spacing: SpacingConfig
  children: ReactNode
}

export function ContentPageLayout({
  scene,
  cylinder,
  contentPages,
  siteNav,
  spacing,
  children,
}: ContentPageLayoutProps) {
  const { resolvedTheme } = useSiteTheme()

  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scene
          scene={scene}
          cylinder={cylinder}
          resolvedTheme={resolvedTheme}
          isExpanded={false}
        />
      </div>
      <div
        style={{
          ...getContentPageStyle(resolvedTheme, spacing, siteNav, contentPages),
          position: 'relative',
          zIndex: contentPages.content.zIndex,
          minHeight: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
