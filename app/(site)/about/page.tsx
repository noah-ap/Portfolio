import { getSiteConfig } from '@/lib/config/siteConfig'
import { resolveScene } from '@/lib/config/resolveScene'
import { AboutPage } from '@/components/pages/AboutPage'
import { ContentPageLayout } from '@/components/shell/ContentPageLayout'

export default function AboutRoute() {
  const config = getSiteConfig()
  const contentScene = resolveScene(config.contentPages.scene.preset)

  return (
    <ContentPageLayout
      scene={contentScene}
      cylinder={config.cylinder}
      contentPages={config.contentPages}
      siteNav={config.siteNav}
      spacing={config.spacing}
    >
      <AboutPage
        about={config.about}
        contentPages={config.contentPages}
        glass={config.glass}
        breakpoints={config.breakpoints}
        spacing={config.spacing}
      />
    </ContentPageLayout>
  )
}
