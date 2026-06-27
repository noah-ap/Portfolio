import type { ContentPagesConfig } from '@/lib/types/contentPages'

export const contentPages: ContentPagesConfig = {
  pageIds: ['about', 'contact'],
  scene: {
    preset: 'fogOnly',
  },
  content: {
    zIndex: 10,
    backgroundOpacity: 0,
  },
  glass: {
    enabled: true,
    preset: 'liquid',
    animateEntrance: false,
  },
}
