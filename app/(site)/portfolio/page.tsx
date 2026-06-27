import { getSiteConfig } from '@/lib/config/siteConfig'
import { ProjectView } from '@/components/projects/ProjectView'

export default function PortfolioPage() {
  const config = getSiteConfig()

  return <ProjectView config={config} />
}
