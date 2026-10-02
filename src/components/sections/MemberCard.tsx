'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Member } from '@/types'

interface Props {
  member: Member
  index: number
}

const TIER_BADGE: Record<string, { label: string; color: string }> = {
  mvp:    { label: 'MVP',          color: 'rgba(255,255,255,0.85)' },
  hof:    { label: 'Hall of Fame', color: 'rgba(212,175,55,0.7)'   },
  member: { label: 'Member',       color: 'rgba(255,255,255,0.3)'  },
}

const NAME_CLASS: Record<string, string> = {
  mvp:    'name-wave-mvp',
  hof:    'name-wave-hof',
  member: 'name-wave-normal',
}

const SPARKLE_CLASS: Record<string, string> = {
  mvp:    'sparkle-mvp',
  hof:    'sparkle-hof',
  member: 'sparkle-normal',
}

function Sparkles({ tier }: { tier: string }) {
  const positions = [
    { top: '12%', left: '10%' },
    { top: '20%', right: '12%' },
    { bottom: '20%', left: '8%' },
    { bottom: '12%', right: '10%' },
  ]
  const cls = SPARKLE_CLASS[tier] ?? SPARKLE_CLASS.member
  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          className={cls}
          style={{
            position: 'absolute',
            fontSize: i % 2 === 0 ? '6px' : '5px',
            pointerEvents: 'none',
            animationDelay: `${i * 0.3}s`,
            ...pos,
          }}
        >
          ✦
        </span>
      ))}
    </>
  )
}

export default function MemberCard({ member, index }: Props) {
  const [imgError, setImgError] = useState(false)
  const badge = TIER_BADGE[member.tier] ?? TIER_BADGE.member
  const nameClass = NAME_CLASS[member.tier] ?? NAME_CLASS.member
  const isMvp   = member.tier === 'mvp'
  const isHof   = member.tier === 'hof'

  const borderColor = isMvp
    ? 'rgba(255,255,255,0.2)'
    : isHof
    ? 'rgba(212,175,55,0.12)'
    : 'rgba(255,255,255,0.04)'

  const avatarBorder = isMvp
    ? '2px solid rgba(255,255,255,0.35)'
    : isHof
    ? '1.5px solid rgba(212,175,55,0.3)'
    : '1px solid rgba(255,255,255,0.06)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', width: '100%', minWidth: 0, height: '100%' }}
    >
      <div
        className={isMvp ? 'card-mvp' : isHof ? 'card-glow' : ''}
        style={{
          position: 'relative',
          background: isMvp ? 'rgba(10,10,10,0.95)' : 'rgba(7,7,7,0.85)',
          border: `1px solid ${borderColor}`,
          borderRadius: 20,
          padding: '32px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          minWidth: 0,
          ...(isMvp ? { boxShadow: '0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)' } : {}),
        }}
      >
        {(isMvp || isHof) && <Sparkles tier={member.tier} />}


        
        {isMvp && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 14,
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            ✦ mvp
          </div>
        )}

        
        <div
          className="member-avatar"
          style={{
            position: 'relative',
            width: 90,
            height: 90,
            borderRadius: '50%',
            border: avatarBorder,
            background: 'rgba(255,255,255,0.04)',
            overflow: 'hidden',
            flexShrink: 0,
            ...(isMvp ? { boxShadow: '0 0 20px rgba(255,255,255,0.08)' } : {}),
          }}
        >
          {member.avatar && !imgError ? (
            <Image
              src={member.avatar}
              alt={member.displayName}
              fill
              sizes="90px"
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-cormorant)',
                fontSize: 28,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {member.displayName[0]?.toUpperCase()}
            </div>
          )}
        </div>

        
        <div style={{ textAlign: 'center' }}>
          <div
            className={nameClass}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 500,
              fontSize: 17,
              marginBottom: 3,
            }}
          >
            {member.displayName}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: badge.color,
              marginBottom: 2,
            }}
          >
            {member.role}
          </div>
        </div>

        
        {member.bio && (
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 12.5,
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
              textAlign: 'center',
              maxWidth: 180,
            }}
          >
            {member.bio}
          </p>
        )}

        
        <div
          style={{
            marginTop: 'auto',
            padding: '3px 10px',
            borderRadius: '999px',
            border: `1px solid ${badge.color}`,
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: badge.color,
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          {badge.label}
        </div>

        
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.18)',
          }}
        >
          {new Date(member.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </div>
      </div>
    </motion.div>
  )
}
