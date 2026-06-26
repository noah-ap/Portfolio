export function calculateCylinderX(
  index: number,
  total: number,
  radius: number,
  rotation: number
): number {
  const angle = (index * 360) / total - rotation
  const radians = (angle * Math.PI) / 180
  return Math.sin(radians) * radius
}

export function calculateCylinderZ(
  index: number,
  total: number,
  radius: number,
  rotation: number
): number {
  const angle = (index * 360) / total - rotation
  const radians = (angle * Math.PI) / 180
  return Math.cos(radians) * radius
}

export function calculateDepthScale(
  z: number,
  radius: number,
  baseScale: number,
  scaleRange: number
): number {
  const normalized = (z + radius) / (2 * radius)
  return baseScale + normalized * scaleRange
}

export function calculateDepthOpacity(
  z: number,
  radius: number,
  minOpacity: number
): number {
  const normalized = (z + radius) / (2 * radius)
  return minOpacity + (1 - minOpacity) * normalized
}

export function getResponsiveRadius(
  baseRadius: number,
  viewportWidth: number,
  radiusVw: number,
  minRadius: number
): number {
  return Math.max(minRadius, Math.min(baseRadius, viewportWidth * radiusVw))
}

export function getTargetRotation(index: number, total: number): number {
  if (total === 0) return 0
  return (index * 360) / total
}
