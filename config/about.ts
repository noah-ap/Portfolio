import type { AboutConfig } from '@/lib/types/about'

export const about: AboutConfig = {
  title: 'About Me',
  subtitle: 'Designer, developer, and creative technologist.',
  sections: [
    {
      id: 'biography',
      title: 'Biography',
      content:
        'Placeholder biography. This section will describe background, interests, and what drives your work.',
      visible: true,
      order: 0,
    },
    {
      id: 'education',
      title: 'Education',
      content:
        'Placeholder education details. Degrees, institutions, and areas of study will appear here.',
      visible: true,
      order: 1,
    },
    {
      id: 'experience',
      title: 'Experience',
      content:
        'Placeholder experience summary. Roles, projects, and professional highlights will be listed here.',
      visible: true,
      order: 2,
    },
    {
      id: 'skills',
      title: 'Skills',
      content:
        'Placeholder skills overview. Tools, technologies, and creative disciplines will be configured here.',
      visible: true,
      order: 3,
    },
    {
      id: 'timeline',
      title: 'Timeline',
      content:
        'Placeholder timeline. Key milestones and career events will be added as structured data.',
      visible: true,
      order: 4,
    },
    {
      id: 'interests',
      title: 'Interests',
      content:
        'Placeholder interests. Personal pursuits and creative explorations outside of work.',
      visible: true,
      order: 5,
    },
  ],
}
