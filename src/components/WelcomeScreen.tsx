'use client'

import { motion } from 'framer-motion'
import { config } from '@/data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function WelcomeScreen() {
  const words = config.enterTitle.split(' ')

  return (
    <div
      className="scanline-sweep"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Film grain */}
      <div
        className="film-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.85) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Horizontal light streak — single dramatic moment */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 0.6, 0] }}
        transition={{ delay: 0.3, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)',
          transformOrigin: 'left',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '0 24px',
        }}
      >
        {/* Words — blur to focus stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em', justifyContent: 'center' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 48, filter: 'blur(12px)', rotate: -3 },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', rotate: 0 },
              }}
              transition={{ duration: 1.5, ease: EASE }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1,
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.0, ease: EASE }}
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.9, duration: 1.1, ease: EASE }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>

        {/* Discord badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 2.2, duration: 1, ease: EASE }}
          style={{
            marginTop: '0.25rem',
            padding: '5px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}
        >
          discord.gg/ygng
        </motion.div>
      </div>
    </div>
  )
}
