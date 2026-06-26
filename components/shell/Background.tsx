import type { ResolvedBackground } from '@/lib/types/background'
import { getBackgroundLayerStyle } from '@/lib/styles/backgroundStyles'

interface BackgroundProps {
  config: ResolvedBackground
}

export function Background({ config }: BackgroundProps) {
  const style = getBackgroundLayerStyle(config)

  switch (config.type) {
    case 'solid':
    case 'gradient':
    case 'image':
      return <div aria-hidden style={style} />
    case 'video':
      // Extension point: render <video> when src is provided
      return <div aria-hidden style={style} data-background-type="video" />
    case 'particles':
      // Extension point: canvas/WebGL particle renderer
      return <div aria-hidden style={style} data-background-type="particles" />
    case 'canvas':
      // Extension point: custom canvas renderer
      return <div aria-hidden style={style} data-background-type="canvas" />
    default:
      return <div aria-hidden style={style} />
  }
}
