export interface AboutSection {
  id: string
  title: string
  content: string
  visible: boolean
  order: number
}

export interface AboutConfig {
  title: string
  subtitle?: string
  sections: AboutSection[]
}
