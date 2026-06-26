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

export function calculateAngularDistanceOpacity(
  index: number,
  total: number,
  rotation: number,
  activeOpacity: number,
  minOpacity: number,
  falloffPerStep: number
): number {
  if (total <= 1) return activeOpacity

  const angleDeg = (index * 360) / total - rotation
  const wrapped = ((angleDeg % 360) + 360) % 360
  const angularDist = Math.min(wrapped, 360 - wrapped)
  const stepDistance = (angularDist * total) / 360

  return Math.max(minOpacity, activeOpacity - falloffPerStep * stepDistance)
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
