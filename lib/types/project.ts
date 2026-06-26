export interface Project {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  github?: string
  website?: string
  tags?: string[]
  featured?: boolean
}
