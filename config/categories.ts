import type { Category } from '@/lib/types/category'

export const categories: Category[] = [
  {
    id: 'architecture',
    name: 'Architecture',
    slug: 'architecture',
    projectSlugs: [
      'territory-part-1',
      'territory-part-2',
      'iit-representation',
    ],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    slug: 'graphic-design',
    projectSlugs: ['orbit-bleed-poster'],
  },
  {
    id: 'artwork',
    name: 'Art Work',
    slug: 'artwork',
    projectSlugs: ['a-road-home-charcoal'],
  },
]
