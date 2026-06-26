import type { CSSProperties } from 'react'
import type { ResolvedBackground } from '@/lib/types/background'

export function getBackgroundLayerStyle(
  config: ResolvedBackground
): CSSProperties {
  const base: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  }

  switch (config.type) {
    case 'solid':
      return { ...base, backgroundColor: config.color }
    case 'gradient':
      return {
        ...base,
        background: `linear-gradient(${config.angle}deg, ${config.from}, ${config.to})`,
      }
    case 'image':
      return {
        ...base,
        backgroundImage: config.src ? `url(${config.src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: config.opacity,
        filter: `blur(${config.blur}px) brightness(${config.brightness})`,
      }
    case 'video':
    case 'particles':
    case 'canvas':
      return base
    default:
      return base
  }
}
