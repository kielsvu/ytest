'use client'

import { motion } from 'framer-motion'
import { config } from '@/data'

const EASE = [0.22, 1, 0.36, 1] as const

export default function WelcomeScreen() {
  const words = config.enterTitle.split(' ')

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
        overflow: 'hidden',
      }}
    >
      {}
      <div
        className="film-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          zIndex: 0,
        }}
      />

      {}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em', justifyContent: 'center' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60, rotate: -4 },
                visible: { opacity: 1, y: 0, rotate: 0 },
              }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 7vw, 4.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE }}
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
            transformOrigin: 'center',
          }}
        />

        {}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.2, ease: EASE }}
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

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 1, ease: EASE }}
          style={{
            marginTop: '0.5rem',
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
