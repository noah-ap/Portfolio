'use client'

import { motion } from 'framer-motion'
import { resolveThemeToken } from '@/lib/config/resolveThemeToken'
import { getActiveTextGlowClassName } from '@/lib/styles/glowStyles'
import { resolveAnimation } from '@/lib/config/resolveAnimation'
import { getMotionTransition } from '@/lib/animations/resolveMotion'
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

function pickResponsive(
  values: { sm: number; md: number; lg: number },
  width: number,
  breakpoints: BreakpointsConfig
) {
  if (width < breakpoints.sm) return values.sm
  if (width < breakpoints.md) return values.md
  return values.lg
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
              fontWeight: isSelected
                ? categoryNav.selectedWeight
                : categoryNav.unselectedWeight,
              fontSize,
              opacity: isSelected
                ? categoryNav.selectedOpacity
                : categoryNav.unselectedOpacity,
              color: resolveThemeToken(
                isSelected ? 'text.secondary' : 'text.muted',
                resolvedTheme
              ),
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              userSelect: 'none',
            }}
          >
            {category.name}
          </button>
        )
      })}
    </motion.div>
  )
}
