'use client'

import { motion } from 'framer-motion'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { getNavItemStyle } from '@/lib/styles/navItemStyles'
import {
  getCategoryNavContainerStyle,
  getCategoryNavItemStyle,
} from '@/lib/styles/categoryNavStyles'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { resolveCategoryNavLayout } from '@/lib/layout/resolveCategoryNavLayout'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import { useViewportLayout } from '@/lib/hooks/useViewportLayout'
import type { Category } from '@/lib/types/category'
import type { BreakpointsConfig } from '@/lib/types/breakpoints'
import type { NavigationConfig } from '@/lib/types/navigation'
import type { ResolvedTheme } from '@/lib/types/theme'

interface CategoryNavProps {
  categories: Category[]
  selectedCategoryId: string
  navigation: NavigationConfig
  breakpoints: BreakpointsConfig
  resolvedTheme: ResolvedTheme
  onSelect: (categoryId: string) => void
}

export function CategoryNav({
  categories,
  selectedCategoryId,
  navigation,
  breakpoints,
  resolvedTheme,
  onSelect,
}: CategoryNavProps) {
  const { width, isPortrait } = useViewportLayout()
  const { categoryNav } = navigation
  const navPreset = resolveAnimation('navFadeIn')
  const navTransition = getMotionTransition(navPreset)

  if (!categoryNav.enabled) return null

  const layoutMode = resolveCategoryNavLayout(
    width,
    isPortrait,
    categoryNav,
    breakpoints
  )
  const fontSize = pickResponsive(categoryNav.fontSize, width, breakpoints)
  const isHorizontal = layoutMode === 'horizontal-bottom'

  return (
    <motion.nav
      aria-label="Project categories"
      className={isHorizontal ? 'select-none [&::-webkit-scrollbar]:hidden' : undefined}
      style={getCategoryNavContainerStyle(
        layoutMode,
        categoryNav,
        width,
        breakpoints
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={navTransition}
    >
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId
        return (
          <button
            key={category.id}
            type="button"
            className={getActiveTextGlowClassName(isSelected)}
            onClick={() => onSelect(category.id)}
            style={{
              ...getNavItemStyle(categoryNav, resolvedTheme, isSelected, fontSize),
              ...getCategoryNavItemStyle(
                layoutMode,
                categoryNav,
                width,
                breakpoints
              ),
            }}
          >
            {category.name}
          </button>
        )
      })}
    </motion.nav>
  )
}
