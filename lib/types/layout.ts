export interface LayoutConfig {
  direction: 'column' | 'row'
  maxWidth: number
  centered: boolean
  smoothScrolling: boolean
  mode: 'row' | 'cylinder'
  page: { minHeight: string; padding: number; overflow: 'hidden' | 'auto' | 'visible' }
  cylinder: { centerY: string; zIndex: number }
  sections: {
    projectTabs: { paddingTop: number }
    projectDetail: { paddingTop: number; maxWidth: number }
  }
  projectList: {
    justify: 'center' | 'flex-start' | 'flex-end'
    overflowX: 'auto' | 'hidden' | 'visible'
  }
}
