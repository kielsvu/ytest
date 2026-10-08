'use client'

import { useEffect, useRef } from 'react'

interface Props {
  count?: number
  maxOpacity?: number
  maxSize?: number
  speed?: number
  fixed?: boolean
}

export default function ParticleCanvas({
  count = 55,
  maxOpacity = 0.22,
  maxSize = 1.2,
  speed = 0.18,
  fixed = false,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      opacity: number; size: number;
    }[] = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * speed,
        vy:      (Math.random() - 0.5) * speed,
        opacity: Math.random() * maxOpacity + 0.03,
        size:    Math.random() * maxSize + 0.3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0)             p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
        if (p.y < 0)             p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count, maxOpacity, maxSize, speed])

  return (
    <canvas
      ref={ref}
      style={{
        position:      fixed ? 'fixed' : 'absolute',
        inset:          0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:         0,
      }}
    />
  )
}
