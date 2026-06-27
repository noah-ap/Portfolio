import type { ContentPagesConfig } from '@/lib/types/contentPages'
import type { PagesConfig } from '@/lib/types/pages'

export function isContentPageRoute(
  pathname: string,
  pages: PagesConfig,
  contentPages: ContentPagesConfig
): boolean {
  return contentPages.pageIds.some((id) => {
    const page = pages.items.find((item) => item.id === id && item.visible)
    return page?.route === pathname
  })
}
