'use client'

import { useCallback, useMemo, useState } from 'react'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getProjectsForCategory } from '@/lib/config/siteConfig'
import { getCategoryTransitionDuration } from '@/lib/animations/categoryTransition'
import { useCategoryTabScroll } from '@/lib/hooks/useCategoryTabScroll'
import { useConsoleNavigation } from '@/lib/hooks/useConsoleNavigation'
import { useSiteTheme } from '@/lib/hooks/themeContext'
import type { SiteConfig } from '@/lib/config/siteConfig'
import type { AnimationPresetName } from '@/lib/types/animations'
import { Scene } from '@/components/scene/Scene'
import { CategoryNav } from '@/components/navigation/CategoryNav'
import { VerticalIndicators } from '@/components/navigation/VerticalIndicators'
import { CylinderCarousel } from './CylinderCarousel'
import { ExpandedDetail } from './ExpandedDetail'
import { ReflectionLayer } from './ReflectionLayer'

interface CylinderPortfolioProps {
  config: SiteConfig
}

export function CylinderPortfolio({ config }: CylinderPortfolioProps) {
  const { resolvedTheme } = useSiteTheme()

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
  const categoryTransition = useMemo(
    () =>
      resolveAnimation(
        config.navigation.categoryTransition.animation as AnimationPresetName
      ),
    [config.navigation.categoryTransition.animation]
  )

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      if (categoryId === selectedCategoryId) return
      setIsExiting(true)
      setTimeout(() => {
        setSelectedCategoryId(categoryId)
        setIsExpanded(false)
        setIsExiting(false)
      }, getCategoryTransitionDuration(categoryTransition))
    },
    [selectedCategoryId, categoryTransition]
  )

  useCategoryTabScroll({
    categoryId: selectedCategoryId,
    projectCount: categoryProjects.length,
    tabScroll: config.navigation.categoryTransition.tabScroll,
    setActiveIndex,
  })

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
          isExiting={isExiting}
          groupKey={selectedCategoryId}
          categoryTransition={categoryTransition}
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
            categoryTransition={categoryTransition}
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
          isExiting={isExiting}
          groupKey={selectedCategoryId}
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
  )
}
