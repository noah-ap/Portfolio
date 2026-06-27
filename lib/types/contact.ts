export interface ContactLink {
  id: string
  label: string
  url: string
  icon?: string
  visible: boolean
  order: number
}

export interface ContactConfig {
  title: string
  subtitle?: string
  email?: string
  links: ContactLink[]
}
