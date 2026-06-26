'use client'

import type { SiteConfig } from '@/lib/config/siteConfig'
import { ProjectTabList } from './ProjectTabList'
import { CylinderPortfolio } from './cylinder/CylinderPortfolio'

interface ProjectViewProps {
  config: SiteConfig
}

export function ProjectView({ config }: ProjectViewProps) {
  if (config.layout.mode === 'cylinder') {
    return <CylinderPortfolio config={config} />
  }

  return (
    <ProjectTabList
      projects={config.projects}
      tabs={config.tabs}
      layout={config.layout}
      navigation={config.navigation}
      theme={config.resolvedTheme}
      spacing={config.spacing}
      breakpoints={config.breakpoints}
    />
  )
}
