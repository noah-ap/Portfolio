import type { ContactConfig } from '@/lib/types/contact'

export const contact: ContactConfig = {
  title: 'Contact & Socials',
  subtitle: 'Reach out or connect through the links below.',
  email: 'hello@example.com',
  links: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
      visible: true,
      order: 0,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin',
      visible: true,
      order: 1,
    },
    {
      id: 'email',
      label: 'Email',
      url: 'mailto:hello@example.com',
      icon: 'email',
      visible: true,
      order: 2,
    },
    {
      id: 'resume',
      label: 'Resume',
      url: '#',
      icon: 'resume',
      visible: true,
      order: 3,
    },
    {
      id: 'discord',
      label: 'Discord',
      url: '#',
      icon: 'discord',
      visible: true,
      order: 4,
    },
  ],
}
