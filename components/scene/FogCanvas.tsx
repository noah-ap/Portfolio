'use client'

import { useEffect, useRef } from 'react'
import type { SceneFogConfig } from '@/lib/types/scene'
import type { ResolvedTheme } from '@/lib/types/theme'

interface FogCanvasProps {
  fog: SceneFogConfig
  resolvedTheme: ResolvedTheme
}

export function FogCanvas({ fog, resolvedTheme }: FogCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeFog = resolvedTheme.fog
  const blendMode =
    resolvedTheme.presetName === 'light' ? 'multiply' : fog.blendMode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const fogLayers = Array.from({ length: fog.layerCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * fog.speed,
      vy: (Math.random() - 0.5) * (fog.speed * 0.67),
      opacity:
        Math.random() * themeFog.fogOpacityRange + themeFog.fogBaseOpacity,
      size: Math.random() * fog.fogSizeRange + fog.fogSizeMin,
    }))

    const particles = Array.from({ length: fog.particleCount }, (_, index) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (fog.speed * 1.67),
      vy: (Math.random() - 0.5) * (fog.speed * 1.67),
      size: Math.random() * 3 + 1,
      opacity:
        Math.random() * themeFog.particleOpacityRange +
        themeFog.particleBaseOpacity,
      life: Math.random() * Math.PI * 2,
      flickerSpeed: 0.008 + (index % 5) * 0.002,
    }))

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      fogLayers.forEach((layer) => {
        layer.x += layer.vx
        layer.y += layer.vy
        if (layer.x > canvas.width + layer.size) layer.x = -layer.size
        if (layer.x < -layer.size) layer.x = canvas.width + layer.size
        if (layer.y > canvas.height + layer.size) layer.y = -layer.size
        if (layer.y < -layer.size) layer.y = canvas.height + layer.size

        const gradient = ctx.createRadialGradient(
          layer.x,
          layer.y,
          0,
          layer.x,
          layer.y,
          layer.size
        )
        gradient.addColorStop(0, `${themeFog.fogColor1}${layer.opacity})`)
        gradient.addColorStop(
          0.5,
          `${themeFog.fogColor2}${layer.opacity * 0.5})`
        )
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(layer.x, layer.y, layer.size, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life += particle.flickerSpeed

        const twinkle1 = Math.sin(particle.life) * 0.5 + 0.5
        const twinkle2 = Math.sin(particle.life * 1.7) * 0.3 + 0.7
        const twinkle3 = Math.sin(particle.life * 0.5) * 0.2 + 0.8
        const twinkle = twinkle1 * twinkle2 * twinkle3

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        )
        gradient.addColorStop(
          0,
          `${themeFog.particleColor}${particle.opacity * twinkle})`
        )
        gradient.addColorStop(
          0.5,
          `${themeFog.particleColor}${particle.opacity * twinkle * 0.5})`
        )
        gradient.addColorStop(1, `${themeFog.particleColor}0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [fog, themeFog])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: blendMode }}
    />
  )
}
