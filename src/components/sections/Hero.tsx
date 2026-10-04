'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data'

const EASE = [0.22, 1, 0.36, 1] as const

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
}

function useConstellationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const CONNECTION_DIST = 120
    const COUNT = 70

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        opacity: Math.random() * 0.3 + 0.05,
        size: Math.random() * 1.4 + 0.3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
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
      ro.disconnect()
    }
  }, [])

  return ref
}

export default function Hero({ showApp }: { showApp: boolean }) {
  const [started, setStarted] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const canvasRef = useConstellationCanvas()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const played = sessionStorage.getItem('younggod_hero')
    if (played) { setStarted(true); return }
    const t = setTimeout(() => {
      setStarted(true)
      sessionStorage.setItem('younggod_hero', 'true')
    }, 3600)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax — desktop only
  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return

    let raf: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 18
      targetY = (e.clientY / window.innerHeight - 0.5) * 10
    }

    const lerp = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      setMouse({ x: currentX, y: currentY })
      raf = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(lerp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Constellation canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Film grain */}
      <div
        className="film-grain"
        style={{ position: 'absolute', inset: 0, opacity: 0.025, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content — parallax container */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 clamp(20px, 6vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      >
        {/* Logo */}
        {showApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -24, filter: 'blur(8px)' }}
            animate={started
              ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.9, y: -24, filter: 'blur(8px)' }}
            transition={{ duration: 1.5, ease: EASE }}
            style={{ marginBottom: '0.5rem' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3.5rem, 14vw, 9rem)',
                fontWeight: 300,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1,
                textTransform: 'uppercase',
                filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.07))',
              }}
            >
              YG
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          animate={started
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 32, filter: 'blur(6px)' }}
          transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
          className="enter-title-hover"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 5vw, 3rem)',
            letterSpacing: '0.12em',
            background: 'linear-gradient(to right, #fff, #aaa, #777)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.15,
            maxWidth: '760px',
          }}
        >
          {config.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={started
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          style={{
            width: 48,
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={started
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            maxWidth: 480,
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: EASE }}
          style={{ marginTop: '2rem' }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))',
            }} />
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              scroll
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
