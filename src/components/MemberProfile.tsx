'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Member } from '@/types'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

const EASE = [0.22, 1, 0.36, 1] as const

function IconDiscord({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.102.132 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  )
}

function IconTwitter({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconArrowLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" />
    </svg>
  )
}

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

      {/* Back nav */}
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

      {/* Profile content */}
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
        {/* Avatar */}
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

        {/* Name */}
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

        {/* Hairline */}
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

        {/* Role + join date */}
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

        {/* Bio */}
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
              maxWidth:      500,
              marginBottom:  48,
            }}
          >
            {member.bio}
          </motion.p>
        )}

        {/* Socials */}
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

        {/* Role chip */}
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
