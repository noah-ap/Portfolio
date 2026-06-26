import type { LayoutConfig } from '@/lib/types/layout'

export const layout: LayoutConfig = {
  direction: 'column',
  maxWidth: 1200,
  centered: false,
  smoothScrolling: true,
  mode: 'cylinder',
  page: { minHeight: '100vh', padding: 0, overflow: 'hidden' },
  cylinder: { centerY: '50vh', zIndex: 10 },
  sections: {
    projectTabs: { paddingTop: 0 },
    projectDetail: { paddingTop: 48, maxWidth: 768 },
  },
  projectList: { justify: 'center', overflowX: 'auto' },
}
