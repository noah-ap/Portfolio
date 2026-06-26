import { getSiteConfig } from '@/lib/config/siteConfig'
import { SiteShell } from '@/components/shell/SiteShell'
import { ProjectView } from '@/components/projects/ProjectView'

export default function ProjectsPage() {
  const config = getSiteConfig()

  return (
    <SiteShell>
      <ProjectView config={config} />
    </SiteShell>
  )
}
