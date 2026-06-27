'use client'

import { motion } from 'framer-motion'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { getNavItemStyle } from '@/lib/styles/navItemStyles'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
import { pickResponsive } from '@/lib/layout/pickResponsive'
import { useViewportWidth } from '@/lib/hooks/useViewportWidth'
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
  const width = useViewportWidth()
  const { categoryNav } = navigation
  const navPreset = resolveAnimation('navFadeIn')
  const navTransition = getMotionTransition(navPreset)

  if (!categoryNav.enabled) return null

  const left = pickResponsive(categoryNav.position.left, width, breakpoints)
  const gap = pickResponsive(categoryNav.gap, width, breakpoints)
  const fontSize = pickResponsive(categoryNav.fontSize, width, breakpoints)

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-30 flex flex-col"
      style={{ left, gap }}
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
              textAlign: 'left',
            }}
          >
            {category.name}
          </button>
        )
      })}
    </motion.div>
  )
}
