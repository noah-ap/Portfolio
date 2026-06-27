import type { PagesConfig } from '@/lib/types/pages'

export const pages: PagesConfig = {
  transition: {
    animation: 'navFadeIn',
    durationScale: 0.5,
  },
  items: [    {
      id: 'portfolio',
      title: 'Portfolio',
      route: '/portfolio',
      visible: true,
      order: 0,
    },
    {
      id: 'about',
      title: 'About Me',
      route: '/about',
      visible: true,
      order: 1,
    },
    {
      id: 'contact',
      title: 'Contact',
      route: '/contact',
      visible: true,
      order: 2,
    },
  ],
}
