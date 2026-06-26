'use client'

import type { Project } from '@/lib/types/project'
import type { SpacingConfig } from '@/lib/types/spacing'
import type { TabsConfig } from '@/lib/types/tabs'
import type { ResolvedTheme } from '@/lib/types/theme'
import type { ResolvedAnimationPreset } from '@/lib/types/animations'
import {
  getTabButtonResetStyle,
  getTabCardStyle,
  getTabImageStyle,
  getTabInnerStyle,
  getTabPlaceholderStyle,
  getTabSubtitleOverlayStyle,
  getTabTitleOverlayStyle,
} from '@/lib/styles/tabStyles'

interface ProjectTabProps {
  project: Project
  isActive: boolean
  tabs: TabsConfig
  theme: ResolvedTheme
  spacing: SpacingConfig
  hoverPreset: ResolvedAnimationPreset
  onSelect: () => void
}

export function ProjectTab({
  project,
  isActive,
  tabs,
  theme,
  spacing,
  hoverPreset,
  onSelect,
}: ProjectTabProps) {
  return (
    <button
      type="button"
      className="project-tab-button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={project.title}
      style={getTabButtonResetStyle()}
    >
      <div
        className="project-tab-inner"
        style={getTabInnerStyle(tabs, theme, isActive, hoverPreset)}
      >
        <div style={getTabCardStyle(tabs, theme, isActive)}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={getTabImageStyle(tabs, isActive)}
              loading={isActive ? 'eager' : 'lazy'}
            />
          ) : (
            <div style={getTabPlaceholderStyle(tabs, theme)}>
              {project.title}
            </div>
          )}
          <div style={getTabTitleOverlayStyle(tabs, theme)}>
            {project.title}
            {project.subtitle && (
              <div style={getTabSubtitleOverlayStyle(tabs, theme, spacing)}>
                {project.subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
