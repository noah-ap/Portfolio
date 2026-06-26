import type { Project } from '@/lib/types/project'

export const projects: Project[] = [
  {
    id: 'territory-part-1',
    slug: 'territory-part-1',
    title: 'Territory Part 1',
    subtitle: 'In Progress',
    description:
      'Territory Part 1 explores the formation of spatial boundaries and the relationship between built environment and natural landscape.',
    image: '/images/territory-part-1-thumbnail.png',
    tags: ['architecture', 'territory'],
    featured: true,
  },
  {
    id: 'territory-part-2',
    slug: 'territory-part-2',
    title: 'Territory Part 2',
    subtitle: 'Nov 2024',
    description:
      'Continuing the exploration of territorial boundaries, Part 2 delves deeper into mapping and representation of spatial relationships.',
    image: '/images/territory-part-2-thumbnail.jpg',
    tags: ['architecture', 'territory'],
    featured: true,
  },
  {
    id: 'iit-representation',
    slug: 'iit-representation',
    title: 'IIT Representation',
    subtitle: 'Mar 2024',
    description:
      'A comprehensive architectural representation project focusing on the Illinois Institute of Technology campus.',
    image: '/images/iit-representation-thumbnail.png',
    tags: ['architecture'],
  },
  {
    id: 'orbit-bleed-poster',
    slug: 'orbit-bleed-poster',
    title: 'Orbit Bleed Poster',
    subtitle: 'Aug 2024',
    description:
      'A dynamic poster design featuring orbital motion and bleeding effects.',
    image: '/images/orbit-bleed-poster-thumbnail.png',
    tags: ['graphic-design', 'poster'],
    featured: true,
  },
  {
    id: 'a-road-home-charcoal',
    slug: 'a-road-home-charcoal',
    title: 'A Road Home Charcoal',
    subtitle: 'Nov 2024',
    description:
      'A charcoal drawing that captures the journey home through expressive mark-making and dramatic contrast.',
    image: '/images/a-road-home-charcoal-thumbnail.jpg',
    tags: ['artwork', 'charcoal'],
  },
]
