'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { config } from '@/data'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero({ showApp }: { showApp: boolean }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const played = sessionStorage.getItem('younggod_hero')
    if (played) { setStarted(true); return }
    const t = setTimeout(() => {
      setStarted(true)
      sessionStorage.setItem('younggod_hero', 'true')
    }, 3600)
    return () => clearTimeout(t)
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
      <ParticleCanvas count={55} maxOpacity={0.22} speed={0.18} />

      <div
        className="film-grain"
        style={{ position: 'absolute', inset: 0, opacity: 0.024, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Vignette */}
      <div
        style={{
          position:      'absolute',
          inset:          0,
          background:    'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)',
          zIndex:         2,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle center glow */}
      <div
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          width:         '50vw',
          height:        '50vh',
          background:    'radial-gradient(ellipse at center, rgba(255,255,255,0.018) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:         2,
        }}
      />

      <div
        style={{
          position:       'relative',
          zIndex:          3,
          textAlign:      'center',
          padding:        '0 24px',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '1.75rem',
        }}
      >
        {/* YG monogram */}
        {showApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            animate={started
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            transition={{ duration: 1.5, ease: EASE }}
            style={{ marginBottom: '0.5rem' }}
          >
            <div
              style={{
                fontFamily:    'var(--font-cormorant)',
                fontSize:      'clamp(3.5rem, 14vw, 9rem)',
                fontWeight:     300,
                letterSpacing: '0.28em',
                color:         'rgba(255,255,255,0.88)',
                lineHeight:     1,
                textTransform: 'uppercase',
                filter:        'drop-shadow(0 0 60px rgba(255,255,255,0.07))',
              }}
            >
              YG
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={started
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 28, filter: 'blur(10px)' }}
          transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
          className="enter-title-hover"
          style={{
            fontFamily:           'var(--font-cormorant)',
            fontWeight:            300,
            fontStyle:            'italic',
            fontSize:             'clamp(1.5rem, 5.5vw, 3.2rem)',
            letterSpacing:        '0.12em',
            background:           'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(200,200,200,0.7) 50%, rgba(140,140,140,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            lineHeight:            1.2,
            maxWidth:             '780px',
          }}
        >
          {config.title}
        </motion.h1>

        {/* Hairline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={started
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          style={{
            width:           '56px',
            height:           '1px',
            background:      'linear-gradient(to right, transparent, rgba(255,255,255,0.32), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={started
            ? { opacity: 1, filter: 'blur(0px)' }
            : { opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 1.1, delay: 0.72, ease: EASE }}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'clamp(0.58rem, 1.8vw, 0.72rem)',
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.26)',
            maxWidth:       480,
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
          style={{
            marginTop:     '2rem',
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:            6,
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
              <rect x="1" y="1" width="14" height="20" rx="7" stroke="currentColor" strokeWidth="1.2" />
              <motion.rect
                x="6.5" y="5" width="3" height="5" rx="1.5"
                fill="currentColor"
                animate={{ y: [0, 4, 0], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
