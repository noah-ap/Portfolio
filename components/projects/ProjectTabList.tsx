'use client'

import { useCallback, useState } from 'react'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { LayoutConfig } from '@/lib/types/layout'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { Project } from '@/lib/types/project'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { TabsConfig } from '@/lib/types/tabs'
import type { ResolvedTheme } from '@/lib/types/theme'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import type { AnimationPresetName } from '@/lib/types/animations'
import { useBreakpointScale } from '@/lib/hooks/useBreakpointScale'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { useWheelNavigation } from '@/lib/hooks/useWheelNavigation'
import {
  getIndicatorListStyle,
  getIndicatorStyle,
  getTabListStyle,
} from '@/lib/styles/tabStyles'
import {
  getActiveDescriptionStyle,
  getActiveSubtitleStyle,
  getActiveTitleStyle,
  getPageContentStyle,
  getTabListWrapperStyle,
} from '@/lib/styles/layoutStyles'
import { ProjectTab } from './ProjectTab'

interface ProjectTabListProps {
  projects: Project[]
  tabs: TabsConfig
  layout: LayoutConfig
  navigation: NavigationConfig
  theme: ResolvedTheme
  spacing: SpacingConfig
  breakpoints: BreakpointsConfig
  onProjectSelect?: (project: Project, index: number) => void
}

export function ProjectTabList({
  projects,
  tabs,
  layout,
  navigation,
  theme,
  spacing,
  breakpoints,
  onProjectSelect,
}: ProjectTabListProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]
  const tabScale = useBreakpointScale(breakpoints)
  const hoverPreset = resolveAnimation(tabs.hover.animation as AnimationPresetName)
  const { ref: detailRef, style: detailRevealStyle } =
    useScrollReveal<HTMLDivElement>()

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index)
      onProjectSelect?.(projects[index], index)
    },
    [onProjectSelect, projects]
  )

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  useWheelNavigation({ onNext: handleNext, onPrev: handlePrev })

  return (
    <section>
      <div style={getTabListWrapperStyle(tabScale)}>
        <div style={getTabListStyle(tabs, layout, spacing)}>
          {projects.map((project, index) => (
            <ProjectTab
              key={project.id}
              project={project}
              isActive={index === activeIndex}
              tabs={tabs}
              theme={theme}
              spacing={spacing}
              hoverPreset={hoverPreset}
              onSelect={() => handleSelect(index)}
            />
          ))}
        </div>
      </div>

      {navigation.indicators.enabled && (
        <div style={getIndicatorListStyle(navigation, spacing)}>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Select ${project.title}`}
              style={getIndicatorStyle(navigation, theme, index === activeIndex)}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>
      )}

      {activeProject && (
        <div
          ref={detailRef}
          style={{ ...getPageContentStyle(layout, spacing), ...detailRevealStyle }}
        >
          <h1 style={getActiveTitleStyle(theme, spacing)}>
            {activeProject.title}
          </h1>
          {activeProject.subtitle && (
            <p style={getActiveSubtitleStyle(theme, spacing)}>
              {activeProject.subtitle}
            </p>
          )}
          {activeProject.description && (
            <p style={getActiveDescriptionStyle(theme)}>
              {activeProject.description}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
