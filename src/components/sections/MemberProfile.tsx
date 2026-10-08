'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Member } from '@/types'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import { IconDiscord, IconTwitter, IconInstagram, IconArrowLeft } from '@/components/ui/icons'

const EASE = [0.22, 1, 0.36, 1] as const

interface Props { member: Member }

export default function MemberProfile({ member }: Props) {
  const [imgErr, setImgErr] = useState(false)

  const joinedDate = new Date(member.joinedAt).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
  })

  const hasSocials = member.socials && Object.keys(member.socials).length > 0

  return (
    <main style={{ position: 'relative', background: '#000', minHeight: '100dvh', overflow: 'hidden' }}>
      <ParticleCanvas count={45} maxOpacity={0.18} speed={0.14} fixed />

      <div
        className="film-grain"
        style={{ position: 'fixed', inset: 0, opacity: 0.022, zIndex: 0, pointerEvents: 'none' }}
      />

      <div
        style={{
          position:      'fixed',
          inset:          0,
          background:    'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, rgba(0,0,0,0.65) 100%)',
          zIndex:         0,
          pointerEvents: 'none',
        }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
        animate={{ opacity: 1,  y: 0,   filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        style={{
          position:       'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          50,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        'clamp(14px, 3vw, 22px) clamp(20px, 5vw, 56px)',
        }}
      >
        <Link
          href="/"
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            8,
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)',
            textDecoration:'none',
            transition:    'color 0.2s ease',
            padding:       '6px 0',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.82)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
        >
          <IconArrowLeft size={13} />
          Back
        </Link>

        <span
          style={{
            fontFamily:    'var(--font-cormorant)',
            fontWeight:     600,
            fontStyle:     'italic',
            fontSize:      '1rem',
            letterSpacing: '0.08em',
            color:         'rgba(255,255,255,0.6)',
          }}
        >
          YOUNG GOD WORLDWIDE
        </span>

        <div style={{ width: 60 }} />
      </motion.nav>

      <div
        style={{
          position:       'relative',
          zIndex:          1,
          minHeight:      '100dvh',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        'clamp(100px, 14vw, 140px) clamp(20px, 5vw, 80px) 60px',
          textAlign:      'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.84, filter: 'blur(16px)' }}
          animate={{ opacity: 1,  scale: 1,    filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
          style={{
            position:     'relative',
            width:        'clamp(140px, 22vw, 200px)',
            height:       'clamp(140px, 22vw, 200px)',
            borderRadius: '50%',
            overflow:     'hidden',
            border:       '1.5px solid rgba(255,255,255,0.1)',
            background:   'rgba(255,255,255,0.03)',
            marginBottom:  44,
            boxShadow:    '0 0 80px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {!imgErr && member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.displayName}
              fill
              sizes="200px"
              style={{ objectFit: 'cover' }}
              onError={() => setImgErr(true)}
              priority
              draggable={false}
            />
          ) : (
            <div
              style={{
                width:          '100%',
                height:         '100%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontFamily:     'var(--font-cormorant)',
                fontSize:        72,
                fontWeight:      300,
                color:          'rgba(255,255,255,0.3)',
              }}
            >
              {member.displayName[0]?.toUpperCase()}
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1,  y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          style={{
            fontFamily:           'var(--font-cormorant)',
            fontWeight:            300,
            fontStyle:            'italic',
            fontSize:             'clamp(2.5rem, 8vw, 5.5rem)',
            letterSpacing:        '0.06em',
            background:           'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.48) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            lineHeight:            1.05,
            marginBottom:          22,
          }}
        >
          {member.displayName}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          style={{
            width:           '64px',
            height:           '1px',
            background:      'linear-gradient(to right, transparent, rgba(255,255,255,0.28), transparent)',
            transformOrigin: 'center',
            marginBottom:     22,
          }}
        />

        <motion.div
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1,  filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:         16,
            marginBottom: 34,
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.28)',
            }}
          >
            {member.role}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 9 }}>✦</span>
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.18em',
              color:         'rgba(255,255,255,0.18)',
            }}
          >
            {joinedDate}
          </span>
        </motion.div>

        {member.bio && (
          <motion.p
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1,  y: 0,  filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.76 }}
            style={{
              fontFamily:   'var(--font-cormorant)',
              fontStyle:    'italic',
              fontSize:     'clamp(1rem, 2.5vw, 1.3rem)',
              lineHeight:    1.8,
              color:        'rgba(255,255,255,0.38)',
              width:        '100%',
              maxWidth:      500,
              marginBottom:  48,
            }}
          >
            {member.bio}
          </motion.p>
        )}

        {hasSocials && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 44, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {member.socials?.discord && (
              <div
                className="glass-btn"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:            8,
                  padding:       '7px 18px',
                  border:        '1px solid rgba(255,255,255,0.07)',
                  borderRadius:   999,
                  color:         'rgba(255,255,255,0.32)',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.1em',
                  background:    'rgba(255,255,255,0.025)',
                }}
              >
                <IconDiscord size={13} />
                {member.socials.discord}
              </div>
            )}
            {member.socials?.twitter && (
              <a
                href={`https://x.com/${member.socials.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:            8,
                  padding:       '7px 18px',
                  border:        '1px solid rgba(255,255,255,0.07)',
                  borderRadius:   999,
                  color:         'rgba(255,255,255,0.32)',
                  textDecoration:'none',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.1em',
                  background:    'rgba(255,255,255,0.025)',
                }}
              >
                <IconTwitter size={13} />
                {member.socials.twitter}
              </a>
            )}
            {member.socials?.instagram && (
              <a
                href={`https://instagram.com/${member.socials.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:            8,
                  padding:       '7px 18px',
                  border:        '1px solid rgba(255,255,255,0.07)',
                  borderRadius:   999,
                  color:         'rgba(255,255,255,0.32)',
                  textDecoration:'none',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.1em',
                  background:    'rgba(255,255,255,0.025)',
                }}
              >
                <IconInstagram size={13} />
                {member.socials.instagram}
              </a>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1,  scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            6,
            padding:       '5px 16px',
            border:        '1px solid rgba(255,255,255,0.08)',
            borderRadius:   999,
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.22)',
            background:    'rgba(255,255,255,0.02)',
          }}
        >
          <span style={{ fontSize: 7 }}>✦</span>
          {member.role}
        </motion.div>
      </div>
    </main>
  )
}
