'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'

interface GalaxyProps {
  focal?: [number, number]
  rotation?: [number, number]
  starSpeed?: number
  density?: number
  hueShift?: number
  disableAnimation?: boolean
  speed?: number
  mouseInteraction?: boolean
  glowIntensity?: number
  saturation?: number
  mouseRepulsion?: boolean
  twinkleIntensity?: number
  rotationSpeed?: number
  repulsionStrength?: number
  autoCenterRepulsion?: number
  transparent?: boolean
  className?: string
  entranceDuration?: number
}

interface Star {
  // grid-relative position within its layer (in "cell" units, like the shader's uv space)
  cellX: number
  cellY: number
  layer: number // 0..NUM_LAYERS-1
  seed: number
  size: number // 0..1
  hueBase: number // 0..1
  satBase: number // 0..1
  flare: boolean
  twinklePhase: number
  twinkleSpeed: number
}

const NUM_LAYERS = 8

// deterministic hash, mirrors Hash21 from the shader
function hash21(x: number, y: number): number {
  let px = (x * 123.34) % 1
  let py = (y * 456.21) % 1
  if (px < 0) px += 1
  if (py < 0) py += 1
  const dot = px * (px + 45.32) + py * (py + 45.32)
  const v = px * py + dot
  return v - Math.floor(v)
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  let r = 0,
    g = 0,
    b = 0
  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  return [r, g, b]
}

/**
 * Generate a fixed pool of stars per layer, in normalized "cell" coordinates.
 * Each layer's grid is sampled with enough cells to tile comfortably across
 * the visible area at that layer's scale.
 */
function generateStarPool(): Star[] {
  const stars: Star[] = []
  const CELLS_PER_LAYER = 12 // grid resolution sampled per layer

  for (let layer = 0; layer < NUM_LAYERS; layer++) {
    for (let gx = -CELLS_PER_LAYER; gx <= CELLS_PER_LAYER; gx++) {
      for (let gy = -CELLS_PER_LAYER; gy <= CELLS_PER_LAYER; gy++) {
        const seed = hash21(gx + layer * 91.7, gy + layer * 53.1)
        const size = (seed * 345.32) % 1
        const hueBase = hash21(gx + 1.0, gy + 1.0)
        const satBase = hash21(gx + 3.0, gy + 3.0)
        const flareThreshold = 0.9
        const flare = size > flareThreshold

        stars.push({
          cellX: gx,
          cellY: gy,
          layer,
          seed,
          size,
          hueBase,
          satBase,
          flare,
          twinklePhase: seed * 6.2831,
          twinkleSpeed: 1, // multiplied by global speed at draw time
        })
      }
    }
  }
  return stars
}

export default function GalaxyCanvas({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  entranceDuration = 1.2,
  className,
  ...rest
}: GalaxyProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const targetMousePos = useRef({ x: 0.5, y: 0.5 })
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 })
  const targetMouseActive = useRef(0)
  const smoothMouseActive = useRef(0)

  // ── Framer Motion: smooth prop transitions ──────────────────────────────
  const hueMV = useMotionValue(hueShift)
  const densityMV = useMotionValue(density)
  const glowMV = useMotionValue(glowIntensity)
  const satMV = useMotionValue(saturation)
  const twinkleMV = useMotionValue(twinkleIntensity)

  const hueSpring = useSpring(hueMV, { stiffness: 60, damping: 20 })
  const densitySpring = useSpring(densityMV, { stiffness: 60, damping: 20 })
  const glowSpring = useSpring(glowMV, { stiffness: 60, damping: 20 })
  const satSpring = useSpring(satMV, { stiffness: 60, damping: 20 })
  const twinkleSpring = useSpring(twinkleMV, { stiffness: 60, damping: 20 })

  useEffect(() => {
    hueMV.set(hueShift)
  }, [hueShift, hueMV])
  useEffect(() => {
    densityMV.set(density)
  }, [density, densityMV])
  useEffect(() => {
    glowMV.set(glowIntensity)
  }, [glowIntensity, glowMV])
  useEffect(() => {
    satMV.set(saturation)
  }, [saturation, satMV])
  useEffect(() => {
    twinkleMV.set(twinkleIntensity)
  }, [twinkleIntensity, twinkleMV])

  const isInView = useInView(wrapperRef, { once: true, margin: '-10% 0px' })

  // Generated once — geometry is static, only visual params animate
  const starPool = useMemo(() => generateStarPool(), [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d', { alpha: transparent })
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const freezeFrame = disableAnimation || reducedMotion

    let dpr = 1
    let width = 0
    let height = 0

    function resize() {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
      width = wrapper!.offsetWidth
      height = wrapper!.offsetHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    window.addEventListener('resize', resize)
    resize()

    let animateId = 0
    let isVisible = false
    let staticDrawn = false

    function drawFlareRay(
      c: CanvasRenderingContext2D,
      length: number,
      width: number,
      r: number,
      g: number,
      b: number,
      alpha: number
    ) {
      // draws a ray pointing in +x and -x from origin, tapering to a point
      for (const dir of [1, -1]) {
        const grad = c.createLinearGradient(0, 0, dir * length, 0)
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        c.fillStyle = grad
        c.beginPath()
        c.moveTo(0, -width)
        c.lineTo(dir * length, 0)
        c.lineTo(0, width)
        c.closePath()
        c.fill()
      }
    }

    function drawStarLayer(
      time: number,
      layerIndex: number,
      depth: number,
      fade: number,
      scale: number,
      uHueShift: number,
      uSaturation: number,
      uGlowIntensity: number,
      uTwinkleIntensity: number,
      mouseUV: { x: number; y: number },
      mouseActive: number
    ) {
      const minDim = Math.min(width, height)

      for (const star of starPool) {
        if (star.layer !== layerIndex) continue

        // base position in "uv" space, scaled by this layer's scale + global rotation/focal/repulsion
        // approximate: place each cell center, jittered by the shader's "pad" drift
        const padX = Math.sin(star.seed * 34 + (time * speed) / 10) * 0.5 - 0.25
        const padY = Math.sin(star.seed * 38 + (time * speed) / 30) * 0.5 - 0.25

        const u = (star.cellX + 0.5 + padX) / scale
        const v = (star.cellY + 0.5 + padY) / scale

        // global rotation (auto + prop rotation)
        const autoAngle = time * rotationSpeed
        const cosA = Math.cos(autoAngle)
        const sinA = Math.sin(autoAngle)
        let ru = u * cosA - v * sinA
        let rv = u * sinA + v * cosA

        const [rx, ry] = rotation
        const ru2 = ru * rx - rv * ry
        const rv2 = ru * ry + rv * rx
        ru = ru2
        rv = rv2

        // mouse repulsion / parallax offset
        if (mouseRepulsion) {
          const mx = mouseUV.x - 0.5
          const my = mouseUV.y - 0.5
          const dist = Math.sqrt((ru - mx) ** 2 + (rv - my) ** 2) + 0.1
          const repel = repulsionStrength / dist
          const nx = (ru - mx) / dist
          const ny = (rv - my) / dist
          ru += nx * repel * 0.05 * mouseActive
          rv += ny * repel * 0.05 * mouseActive
        } else {
          ru += (mouseUV.x - 0.5) * 0.1 * mouseActive
          rv += (mouseUV.y - 0.5) * 0.1 * mouseActive
        }

        if (autoCenterRepulsion > 0) {
          const dist = Math.sqrt(ru * ru + rv * rv) + 0.1
          const repel = autoCenterRepulsion / dist
          ru += (ru / dist) * repel * 0.05
          rv += (rv / dist) * repel * 0.05
        }

        // map uv -> screen px (focal-relative)
        const focalPxX = focal[0] * width
        const focalPxY = (1 - focal[1]) * height // flip y: shader uv.y grows up, canvas grows down
        const px = focalPxX + ru * minDim
        const py = focalPxY - rv * minDim

        // cull offscreen with margin
        const margin = 40
        if (px < -margin || px > width + margin || py < -margin || py > height + margin) continue

        // color: hue from base + shift, value from size, saturation scaled
        const hue = (star.hueBase + uHueShift / 360) % 1
        const value = Math.max(0.3, star.size)
        const [r, g, b] = hsvToRgb(hue, Math.min(1, uSaturation), value)
        const rr = Math.round(r * 255)
        const gg = Math.round(g * 255)
        const bb = Math.round(b * 255)

        // twinkle
        const twinkleRaw = Math.sin(time * speed + star.twinklePhase) * 0.5 + 1
        const twinkle = 1 + (twinkleRaw - 1) * uTwinkleIntensity

        const baseRadius = (0.5 + star.size * 1.5) * (0.4 + depth * 1.6) * fade
        const radius = Math.max(0.2, baseRadius * twinkle)
        const alpha = Math.min(1, fade * (0.5 + star.size * 0.5) * twinkle)

        if (alpha <= 0.01 || radius <= 0.05) continue

        // glow
        if (uGlowIntensity > 0 && (star.flare || star.size > 0.6)) {
          const glowRadius = radius * (3 + uGlowIntensity * 8)
          const gradient = ctx!.createRadialGradient(px, py, 0, px, py, glowRadius)
          gradient.addColorStop(0, `rgba(${rr},${gg},${bb},${alpha * 0.5})`)
          gradient.addColorStop(1, `rgba(${rr},${gg},${bb},0)`)
          ctx!.fillStyle = gradient
          ctx!.beginPath()
          ctx!.arc(px, py, glowRadius, 0, Math.PI * 2)
          ctx!.fill()
        }

        // core
        ctx!.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`
        ctx!.beginPath()
        ctx!.arc(px, py, radius, 0, Math.PI * 2)
        ctx!.fill()

        // ── 4-pointed flare (diamond/star glint) ──────────────────────────
        if (star.flare) {
          const flareLen = radius * (4 + uGlowIntensity * 10) * twinkle
          const flareAlpha = alpha * 0.8

          ctx!.save()
          ctx!.translate(px, py)
          ctx!.globalCompositeOperation = 'lighter'

          // horizontal + vertical rays
          drawFlareRay(ctx!, flareLen, radius * 0.4, rr, gg, bb, flareAlpha)
          ctx!.rotate(Math.PI / 2)
          drawFlareRay(ctx!, flareLen, radius * 0.4, rr, gg, bb, flareAlpha)

          // diagonal rays (shorter, dimmer — matches MAT45 in the shader)
          ctx!.rotate(Math.PI / 4)
          drawFlareRay(ctx!, flareLen * 0.5, radius * 0.3, rr, gg, bb, flareAlpha * 0.5)
          ctx!.rotate(Math.PI / 2)
          drawFlareRay(ctx!, flareLen * 0.5, radius * 0.3, rr, gg, bb, flareAlpha * 0.5)

          ctx!.restore()
        }
      }
    }

    function render(time: number) {
      ctx!.clearRect(0, 0, width, height)

      if (!transparent) {
        ctx!.fillStyle = '#000000'
        ctx!.fillRect(0, 0, width, height)
      }

      const t = freezeFrame ? 0 : time * 0.001
      const starSpeedVal = freezeFrame ? 0 : (t * starSpeed) / 10

      const uHueShift = hueSpring.get()
      const uDensity = Math.max(0.1, densitySpring.get())
      const uGlow = glowSpring.get()
      const uSat = satSpring.get()
      const uTwinkle = twinkleSpring.get()

      const mouseUV = { x: smoothMousePos.current.x, y: smoothMousePos.current.y }
      const mouseActive = smoothMouseActive.current

      ctx!.globalCompositeOperation = transparent ? 'lighter' : 'source-over'

      for (let i = 0; i < NUM_LAYER_COUNT; i++) {
        const iFrac = i / NUM_LAYER_COUNT
        const depth = (((iFrac + starSpeedVal * speed) % 1) + 1) % 1
        const scale = mix(20 * uDensity, 0.5 * uDensity, depth)
        const fade = depth * smoothstep(1, 0.9, depth)
        if (fade <= 0.001) continue

        drawStarLayer(
          t,
          i,
          depth,
          fade,
          scale,
          uHueShift,
          uSat,
          uGlow,
          uTwinkle,
          mouseUV,
          mouseActive
        )
      }
    }

    const NUM_LAYER_COUNT = NUM_LAYERS

    function mix(a: number, b: number, t: number) {
      return a * (1 - t) + b * t
    }

    function smoothstep(edge0: number, edge1: number, x: number) {
      const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
      return t * t * (3 - 2 * t)
    }

    function update(t: number) {
      if (!isVisible) return
      animateId = requestAnimationFrame(update)

      const lerp = 0.05
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerp
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerp
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerp

      render(t)
    }

    function startLoop() {
      if (animateId === 0) animateId = requestAnimationFrame(update)
    }

    function stopLoop() {
      if (animateId !== 0) {
        cancelAnimationFrame(animateId)
        animateId = 0
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          if (freezeFrame) {
            if (!staticDrawn) {
              render(0)
              staticDrawn = true
            }
          } else {
            startLoop()
          }
        } else {
          stopLoop()
        }
      },
      { threshold: 0 }
    )
    observer.observe(wrapper)

    function handleMouseMove(e: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect()
      targetMousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      }
      targetMouseActive.current = 1
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0
    }

    if (mouseInteraction) {
      wrapper.addEventListener('mousemove', handleMouseMove)
      wrapper.addEventListener('mouseleave', handleMouseLeave)
    }

    // initial paint for frozen state before observer fires
    if (freezeFrame) {
      render(0)
      staticDrawn = true
    }

    return () => {
      observer.disconnect()
      stopLoop()
      window.removeEventListener('resize', resize)
      if (mouseInteraction) {
        wrapper.removeEventListener('mousemove', handleMouseMove)
        wrapper.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [
    starPool,
    focal,
    rotation,
    starSpeed,
    speed,
    mouseInteraction,
    mouseRepulsion,
    repulsionStrength,
    rotationSpeed,
    autoCenterRepulsion,
    transparent,
    disableAnimation,
    hueSpring,
    densitySpring,
    glowSpring,
    satSpring,
    twinkleSpring,
  ])

  return (
    <motion.div
      ref={wrapperRef}
      className={`w-full h-full relative ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: entranceDuration, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </motion.div>
  )
}
