'use client'

import { useCallback, useMemo, useState } from 'react'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { resolveTheme } from '@/lib/config/resolveTheme'
import { getProjectsForCategory } from '@/lib/config/siteConfig'
import { themeToCssVars, themeVarsToStyleBlock } from '@/lib/config/themeVars'
import { useConsoleNavigation } from '@/lib/hooks/useConsoleNavigation'
import { useThemePreset } from '@/lib/hooks/useThemePreset'
import type { SiteConfig } from '@/lib/config/siteConfig'
import type { AnimationPresetName } from '@/lib/types/animations'
import { Scene } from '@/components/scene/Scene'
import { CategoryNav } from '@/components/navigation/CategoryNav'
import { ThemeToggle } from '@/components/navigation/ThemeToggle'
import { VerticalIndicators } from '@/components/navigation/VerticalIndicators'
import { CylinderCarousel } from './CylinderCarousel'
import { ExpandedDetail } from './ExpandedDetail'
import { ReflectionLayer } from './ReflectionLayer'

interface CylinderPortfolioProps {
  config: SiteConfig
}

export function CylinderPortfolio({ config }: CylinderPortfolioProps) {
  const [themePreset, setThemePreset] = useThemePreset(config.theme.preset)
  const resolvedTheme = useMemo(
    () => resolveTheme(themePreset),
    [themePreset]
  )

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    config.categories[0]?.id ?? ''
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)

  const categoryProjects = useMemo(
    () =>
      getProjectsForCategory(
        selectedCategoryId,
        config.projects,
        config.categories
      ),
    [selectedCategoryId, config.projects, config.categories]
  )

  const activeProject = categoryProjects[activeIndex]
  const hoverPreset = resolveAnimation(
    config.tabs.hover.animation as AnimationPresetName
  )

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      if (categoryId === selectedCategoryId) return
      setIsExiting(true)
      const spinPreset = resolveAnimation('categorySpin')
      setTimeout(() => {
        setSelectedCategoryId(categoryId)
        setActiveIndex(0)
        setIsExpanded(false)
        setIsExiting(false)
      }, spinPreset.duration)
    },
    [selectedCategoryId]
  )

  const handleRotateNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % categoryProjects.length)
  }, [categoryProjects.length])

  const handleRotatePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + categoryProjects.length) % categoryProjects.length
    )
  }, [categoryProjects.length])

  const handleExpand = useCallback(() => setIsExpanded(true), [])
  const handleCollapse = useCallback(() => setIsExpanded(false), [])

  const handleNextCategory = useCallback(() => {
    const idx = config.categories.findIndex((c) => c.id === selectedCategoryId)
    const next =
      idx < config.categories.length - 1 ? idx + 1 : 0
    handleCategorySelect(config.categories[next].id)
  }, [config.categories, selectedCategoryId, handleCategorySelect])

  const handlePrevCategory = useCallback(() => {
    const idx = config.categories.findIndex((c) => c.id === selectedCategoryId)
    const prev = idx > 0 ? idx - 1 : config.categories.length - 1
    handleCategorySelect(config.categories[prev].id)
  }, [config.categories, selectedCategoryId, handleCategorySelect])

  useConsoleNavigation({
    scroll: config.scroll,
    keyboardEnabled: config.navigation.keyboard.enabled,
    isExpanded,
    onRotateNext: handleRotateNext,
    onRotatePrev: handleRotatePrev,
    onExpand: handleExpand,
    onCollapse: handleCollapse,
    onNextCategory: handleNextCategory,
    onPrevCategory: handlePrevCategory,
  })

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: themeVarsToStyleBlock(themeToCssVars(resolvedTheme)),
        }}
      />
      <div
        className="relative w-full h-screen overflow-visible"
        style={{ backgroundColor: resolvedTheme.colors.background }}
      >
        <Scene
          scene={config.scene}
          cylinder={config.cylinder}
          resolvedTheme={resolvedTheme}
          isExpanded={isExpanded}
        />

        <ReflectionLayer
          projects={categoryProjects}
          activeIndex={activeIndex}
          currentRotation={currentRotation}
          tabs={config.tabs}
          cylinder={config.cylinder}
          breakpoints={config.breakpoints}
          resolvedTheme={resolvedTheme}
          spacing={config.spacing}
          hoverPreset={hoverPreset}
          isExpanded={isExpanded}
          groupKey={selectedCategoryId}
        />

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ top: 0, height: '100%' }}
        >
          <CylinderCarousel
            projects={categoryProjects}
            activeIndex={activeIndex}
            tabs={config.tabs}
            cylinder={config.cylinder}
            breakpoints={config.breakpoints}
            resolvedTheme={resolvedTheme}
            spacing={config.spacing}
            hoverPreset={hoverPreset}
            isExpanded={isExpanded}
            isExiting={isExiting}
            groupKey={selectedCategoryId}
            onSelect={setActiveIndex}
            onSelectActive={handleExpand}
            onRotationChange={setCurrentRotation}
          />
        </div>

        <VerticalIndicators
          projects={categoryProjects}
          activeIndex={activeIndex}
          navigation={config.navigation}
          breakpoints={config.breakpoints}
          resolvedTheme={resolvedTheme}
          onSelect={setActiveIndex}
        />

        <CategoryNav
          categories={config.categories}
          selectedCategoryId={selectedCategoryId}
          navigation={config.navigation}
          breakpoints={config.breakpoints}
          resolvedTheme={resolvedTheme}
          onSelect={handleCategorySelect}
        />

        <ThemeToggle
          navigation={config.navigation}
          breakpoints={config.breakpoints}
          resolvedTheme={resolvedTheme}
          activePreset={themePreset}
          onChange={setThemePreset}
        />

        {activeProject && (
          <ExpandedDetail
            project={activeProject}
            layout={config.layout}
            spacing={config.spacing}
            resolvedTheme={resolvedTheme}
            visible={isExpanded}
          />
        )}
      </div>
    </>
  )
}
