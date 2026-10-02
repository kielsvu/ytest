'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Member } from '@/types'

const EASE = [0.22, 1, 0.36, 1] as const


function IconDiscord({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.102.132 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>
  )
}

function IconTwitter({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconArrowLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
    </svg>
  )
}


function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
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

    for (let i = 0; i < 45; i++) {
      particles.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.15,
        vy:      (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.2 + 0.03,
        size:    Math.random() * 1.1 + 0.3,
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
    <canvas
      ref={ref}
      style={{
        position:      'fixed',
        inset:          0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:         0,
      }}
    />
  )
}


interface Props { member: Member }

export default function MemberProfile({ member }: Props) {
  const [imgErr, setImgErr] = useState(false)

  const joinedDate = new Date(member.joinedAt).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
  })

  return (
    <main style={{ position: 'relative', background: '#000', minHeight: '100dvh', overflow: 'hidden' }}>
      <ParticleCanvas />

      {}
      <div
        className="film-grain"
        style={{ position: 'fixed', inset: 0, opacity: 0.022, zIndex: 0, pointerEvents: 'none' }}
      />

      {}
      <div style={{
        position:   'fixed',
        inset:       0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)',
        zIndex:      0,
        pointerEvents: 'none',
      }} />

      {}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1,  y: 0   }}
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
          className="profile-back-btn"
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            8,
            fontFamily:    'var(--font-mono)',
            fontSize:       '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.4)',
            textDecoration:'none',
            transition:    'color 0.2s ease',
          }}
        >
          <IconArrowLeft size={13} />
          Back
        </Link>

        <span style={{
          fontFamily:    'var(--font-cormorant)',
          fontWeight:     600,
          fontStyle:     'italic',
          fontSize:      '1.05rem',
          letterSpacing: '0.08em',
          color:         'rgba(255,255,255,0.7)',
        }}>
          YOUNG GOD WORLDWIDE
        </span>

        <div style={{ width: 60 }} /> {}
      </motion.nav>

      {}
      <div style={{
        position:       'relative',
        zIndex:          1,
        minHeight:      '100dvh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        'clamp(100px, 14vw, 140px) clamp(20px, 5vw, 80px) 60px',
        textAlign:      'center',
      }}>

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1,  scale: 1,    y: 0  }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          style={{
            position:     'relative',
            width:        'clamp(140px, 22vw, 200px)',
            height:       'clamp(140px, 22vw, 200px)',
            borderRadius: '50%',
            overflow:     'hidden',
            border:       '1.5px solid rgba(255,255,255,0.1)',
            background:   'rgba(255,255,255,0.04)',
            marginBottom:  40,
            boxShadow:    '0 0 60px rgba(255,255,255,0.05)',
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
            <div style={{
              width:          '100%',
              height:         '100%',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontFamily:     'var(--font-cormorant)',
              fontSize:        72,
              fontWeight:      300,
              color:          'rgba(255,255,255,0.4)',
            }}>
              {member.displayName[0]?.toUpperCase()}
            </div>
          )}
        </motion.div>

        {}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          style={{
            fontFamily:           'var(--font-cormorant)',
            fontWeight:            300,
            fontStyle:            'italic',
            fontSize:             'clamp(2.5rem, 8vw, 5rem)',
            letterSpacing:        '0.06em',
            background:           'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            lineHeight:            1.05,
            marginBottom:          20,
          }}
        >
          {member.displayName}
        </motion.h1>

        {}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          style={{
            width:           60,
            height:           1,
            background:      'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)',
            transformOrigin: 'center',
            marginBottom:     20,
          }}
        />

        {}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.32)',
          }}>
            {member.role}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10 }}>✦</span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.62rem',
            letterSpacing: '0.18em',
            color:         'rgba(255,255,255,0.2)',
          }}>
            {joinedDate}
          </span>
        </motion.div>

        {}
        {member.bio && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
            style={{
              fontFamily:  'var(--font-cormorant)',
              fontStyle:   'italic',
              fontSize:    'clamp(1rem, 2.5vw, 1.3rem)',
              lineHeight:   1.75,
              color:       'rgba(255,255,255,0.42)',
              maxWidth:     520,
              marginBottom: 44,
            }}
          >
            {member.bio}
          </motion.p>
        )}

        {}
        {member.socials && Object.keys(member.socials).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}
          >
            {member.socials.discord && (
              <div style={{
                display:       'flex',
                alignItems:    'center',
                gap:            8,
                padding:       '7px 16px',
                border:        '1px solid rgba(255,255,255,0.08)',
                borderRadius:   999,
                color:         'rgba(255,255,255,0.35)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.62rem',
                letterSpacing: '0.1em',
              }}>
                <IconDiscord size={13} />
                {member.socials.discord}
              </div>
            )}
            {member.socials.twitter && (
              <a
                href={`https://x.com/${member.socials.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:            8,
                  padding:       '7px 16px',
                  border:        '1px solid rgba(255,255,255,0.08)',
                  borderRadius:   999,
                  color:         'rgba(255,255,255,0.35)',
                  textDecoration:'none',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.62rem',
                  letterSpacing: '0.1em',
                  transition:    'border-color 0.2s, color 0.2s',
                }}
              >
                <IconTwitter size={13} />
                {member.socials.twitter}
              </a>
            )}
            {member.socials.instagram && (
              <a
                href={`https://instagram.com/${member.socials.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:            8,
                  padding:       '7px 16px',
                  border:        '1px solid rgba(255,255,255,0.08)',
                  borderRadius:   999,
                  color:         'rgba(255,255,255,0.35)',
                  textDecoration:'none',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.62rem',
                  letterSpacing: '0.1em',
                  transition:    'border-color 0.2s, color 0.2s',
                }}
              >
                <IconInstagram size={13} />
                {member.socials.instagram}
              </a>
            )}
          </motion.div>
        )}


        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1,  y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            6,
            padding:       '5px 14px',
            border:        '1px solid rgba(255,255,255,0.1)',
            borderRadius:   999,
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontSize: 8 }}>✦</span>
          {member.tier === 'hof' ? 'Hall of Fame' : member.tier === 'mvp' ? 'MVP' : 'Member'}
        </motion.div>
      </div>

      {}
      <style>{`
        @media (hover: hover) {
          .profile-back-btn:hover { color: rgba(255,255,255,0.85) !important; }
          .social-link:hover {
            border-color: rgba(255,255,255,0.2) !important;
            color: rgba(255,255,255,0.7) !important;
          }
        }
      `}</style>
    </main>
  )
}
