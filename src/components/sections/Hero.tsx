'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero({ showApp }: { showApp: boolean }) {
  const [started,    setStarted]    = useState(false)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const played = sessionStorage.getItem('younggod_hero')
    if (played) { setStarted(true); return }
    const t = setTimeout(() => {
      setStarted(true)
      sessionStorage.setItem('younggod_hero', 'true')
    }, 3600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; opacity: number; size: number }[] = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 55; i++) {
      particles.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.18,
        vy:      (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.25 + 0.03,
        size:    Math.random() * 1.2 + 0.3,
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
  }, [])

  return (
    <section
      id="home"
      style={{
        position:       'relative',
        minHeight:      '100dvh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
      }}
    >
      {}
      <canvas
        ref={particlesRef}
        style={{
          position:      'absolute',
          inset:          0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          zIndex:         0,
        }}
      />

      {}
      <div
        className="film-grain"
        style={{ position: 'absolute', inset: 0, opacity: 0.025, zIndex: 1, pointerEvents: 'none' }}
      />

      {}
      <div
        style={{
          position:   'absolute',
          inset:       0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.65) 100%)',
          zIndex:      2,
          pointerEvents: 'none',
        }}
      />

      {}
      <div
        style={{
          position:       'relative',
          zIndex:          3,
          textAlign:      'center',
          padding:        '0 24px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '1.5rem',
        }}
      >
        {}
        {showApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={started ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ marginBottom: '1rem' }}
          >
            <div
              style={{
                fontFamily:     'var(--font-cormorant)',
                fontSize:       'clamp(3rem, 12vw, 8rem)',
                fontWeight:      300,
                letterSpacing:  '0.22em',
                color:          'rgba(255,255,255,0.92)',
                lineHeight:      1,
                textTransform:  'uppercase',
                filter:         'drop-shadow(0 0 40px rgba(255,255,255,0.08))',
              }}
            >
              YG
            </div>
          </motion.div>
        )}

        {}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="enter-title-hover"
          style={{
            fontFamily:           'var(--font-cormorant)',
            fontWeight:            300,
            fontStyle:            'italic',
            fontSize:             'clamp(1.4rem, 5vw, 3rem)',
            letterSpacing:        '0.12em',
            background:           'linear-gradient(to right, #fff, #aaa, #777)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            lineHeight:            1.15,
            maxWidth:             '760px',
          }}
        >
          {config.title}
        </motion.h1>

        {}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={started ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          style={{
            width:           48,
            height:           1,
            background:      'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)',
            transformOrigin: 'center',
          }}
        />

        {}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       'clamp(0.6rem, 1.8vw, 0.75rem)',
            letterSpacing:  '0.3em',
            textTransform:  'uppercase',
            color:          'rgba(255,255,255,0.3)',
            maxWidth:        480,
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>
      </div>
    </section>
  )
}
