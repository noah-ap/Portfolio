import { getSiteConfig } from '@/lib/config/siteConfig'
import { resolveScene } from '@/lib/config/resolveScene'
import { ContactPage } from '@/components/pages/ContactPage'
import { ContentPageLayout } from '@/components/shell/ContentPageLayout'

export default function ContactRoute() {
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
      <ContactPage
        contact={config.contact}
        contentPages={config.contentPages}
        glass={config.glass}
        breakpoints={config.breakpoints}
        spacing={config.spacing}
      />
    </ContentPageLayout>
  )
}
