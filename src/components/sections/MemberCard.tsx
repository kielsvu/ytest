'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Member, MemberRole } from '@/types'

interface Props {
  member: Member
  index: number
}

const ROLE_STYLE: Record<MemberRole, {
  label: string
  color: string
  colorRgb: string
  className: string
  cardClass: string
}> = {
  founder:   { label: 'Founder',    color: '#FFD86A', colorRgb: '255,216,106', className: 'name-wave-founder',   cardClass: 'card-founder'   },
  cofounder: { label: 'Co-Founder', color: '#FFD86A', colorRgb: '255,216,106', className: 'name-wave-cofounder', cardClass: 'card-cofounder' },
  insider:   { label: 'Insider',    color: '#E6E8EB', colorRgb: '230,232,235', className: 'name-wave-insider',   cardClass: 'card-insider'   },
  younggod:  { label: 'Young God',  color: '#D88A45', colorRgb: '216,138,69',  className: 'name-wave-younggod',  cardClass: 'card-younggod'  },
}

const SPRING = { type: 'spring', stiffness: 300, damping: 24, mass: 0.8 } as const

export default function MemberCard({ member, index }: Props) {
  const [imgError, setImgError] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })
  const cardRef = useRef<HTMLDivElement>(null)
  const style = ROLE_STYLE[member.roleKey]

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    // ponytail: capped at ±8deg, no perspective distortion beyond that
    setTilt({ x: dy * -8, y: dx * 8, active: true })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false })
  }, [])

  const cardContent = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX:    tilt.x,
        rotateY:    tilt.y,
        translateY: tilt.active ? -8 : 0,
        scale:      tilt.active ? 1.015 : 1,
      }}
      transition={SPRING}
      style={{
        position:       'relative',
        background:     'rgba(4,4,4,0.97)',
        borderRadius:    20,
        padding:        '32px 20px 22px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:             10,
        overflow:       'hidden',
        width:          '100%',
        height:         '100%',
        minWidth:        0,
        transformStyle: 'preserve-3d',
        cursor:         'pointer',
      }}
      className={`member-card ${style.cardClass}`}
    >
      {/* Inner highlight — Apple card glass top edge */}
      <div
        style={{
          position:   'absolute',
          top:         0,
          left:       '15%',
          right:      '15%',
          height:      '1px',
          background: `linear-gradient(to right, transparent, rgba(${style.colorRgb},0.4), transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Role badge — top right */}
      <div
        style={{
          position:      'absolute',
          top:            12,
          right:          14,
          fontFamily:    'var(--font-mono)',
          fontSize:        7.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:          style.color,
          opacity:         0.85,
        }}
      >
        {style.label}
      </div>

      {/* Avatar */}
      <div
        className="member-avatar"
        style={{
          position:     'relative',
          borderRadius: '50%',
          overflow:     'hidden',
          flexShrink:    0,
          border:       `1px solid rgba(${style.colorRgb},0.15)`,
          background:   'rgba(255,255,255,0.03)',
        }}
      >
        {member.avatar && !imgError ? (
          <Image
            src={member.avatar}
            alt={member.displayName}
            fill
            sizes="90px"
            style={{ objectFit: 'cover' }}
            className="member-avatar-img"
            onError={() => setImgError(true)}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
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
              fontSize:        28,
              fontWeight:      300,
              color:          'rgba(255,255,255,0.35)',
            }}
          >
            {member.displayName[0]?.toUpperCase()}
          </div>
        )}
      </div>

      {/* Name + role */}
      <div style={{ textAlign: 'center' }}>
        <div
          className={style.className}
          style={{
            fontFamily:    'var(--font-cormorant)',
            fontWeight:     500,
            fontSize:       17,
            marginBottom:   3,
          }}
        >
          {member.displayName}
        </div>
        <div
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:       8.5,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:          style.color,
            opacity:         0.75,
            marginBottom:   2,
          }}
        >
          {member.role}
        </div>
      </div>

      {/* Bio */}
      {member.bio && (
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle:  'italic',
            fontSize:    12.5,
            color:      'rgba(255,255,255,0.5)',
            lineHeight:  1.65,
            textAlign:  'center',
            maxWidth:    180,
          }}
        >
          {member.bio}
        </p>
      )}

      {/* Bottom badges */}
      <div
        style={{
          marginTop:     'auto',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:            6,
        }}
      >
        <div
          style={{
            padding:       '3px 10px',
            borderRadius:  '999px',
            border:        `1px solid rgba(${style.colorRgb},0.3)`,
            fontFamily:    'var(--font-mono)',
            fontSize:       7.5,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:          style.color,
            background:    `rgba(${style.colorRgb},0.04)`,
          }}
        >
          {style.label}
        </div>

        <div
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:       7.5,
            letterSpacing: '0.1em',
            color:         'rgba(255,255,255,0.25)',
          }}
        >
          {new Date(member.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay:    index * 0.08,
        ease:     [0.22, 1, 0.36, 1],
      }}
      style={{
        position:        'relative',
        width:           '100%',
        minWidth:         0,
        height:          '100%',
        perspective:     '800px',
      }}
    >
      {member.username
        ? <Link href={`/${member.username}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>{cardContent}</Link>
        : cardContent
      }
    </motion.div>
  )
}
