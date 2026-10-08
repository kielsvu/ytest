'use client'

import { motion } from 'framer-motion'
import { config } from '@/data'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

const EASE = [0.22, 1, 0.36, 1] as const

export default function WelcomeScreen() {
  const words = config.enterTitle.split(' ')

  return (
    <div
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          9999,
        background:     '#000',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexDirection:  'column',
        gap:            '2rem',
        overflow:       'hidden',
      }}
    >
      <ParticleCanvas count={40} maxOpacity={0.15} speed={0.12} />

      <div
        className="film-grain"
        style={{ position: 'absolute', inset: 0, opacity: 0.032, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position:      'absolute',
          inset:          0,
          background:    'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.85) 100%)',
          zIndex:         1,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          width:         '60vw',
          height:        '60vh',
          background:    'radial-gradient(ellipse at center, rgba(255,255,255,0.022) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:         1,
        }}
      />

      <div
        style={{
          position:       'relative',
          zIndex:          2,
          textAlign:      'center',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            '1.5rem',
        }}
      >
        {/* Word-by-word entrance with blur */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em', justifyContent: 'center' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden:  { opacity: 0, y: 48, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0,  filter: 'blur(0px)' },
              }}
              transition={{ duration: 1.3, ease: EASE }}
              style={{
                fontFamily:    'var(--font-cormorant)',
                fontSize:      'clamp(2rem, 7vw, 4.5rem)',
                fontWeight:     300,
                fontStyle:     'italic',
                letterSpacing: '0.08em',
                color:         'rgba(255,255,255,0.92)',
                lineHeight:     1,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Hairline divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.4, ease: EASE }}
          style={{
            width:           '72px',
            height:           '1px',
            background:      'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.5, duration: 1.2, ease: EASE }}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'clamp(0.55rem, 1.5vw, 0.68rem)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.28)',
          }}
          className="subtitle-breathe"
        >
          {config.enterSubtitle}
        </motion.p>

        {/* Discord tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
          transition={{ delay: 1.9, duration: 1, ease: EASE }}
          style={{
            marginTop:     '0.25rem',
            padding:       '5px 18px',
            borderRadius:  '999px',
            border:        '1px solid rgba(255,255,255,0.07)',
            background:    'rgba(255,255,255,0.025)',
            backdropFilter:'blur(8px)',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.62rem',
            letterSpacing: '0.2em',
            color:         'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          discord.gg/ygng
        </motion.div>
      </div>
    </div>
  )
}
