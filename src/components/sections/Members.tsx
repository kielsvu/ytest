'use client'

import { motion } from 'framer-motion'
import { members } from '@/data'
import MemberCard from './MemberCard'

const EASE = [0.22, 1, 0.36, 1] as const

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.25)',
      marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-cormorant)',
      fontWeight: 300,
      fontStyle: 'italic',
      fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
      letterSpacing: '0.08em',
      background: 'linear-gradient(to right, #fff, #aaa, #666)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: 48,
    }}>
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <div style={{
      width: '100%',
      maxWidth: 600,
      height: 1,
      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
      margin: '64px auto',
    }} />
  )
}

function MemberGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="member-grid">
      {children}
    </div>
  )
}

export default function Members() {
  const mvp = members.filter((member) => member.tier === 'mvp')
  const hof = members.filter((member) => member.tier === 'hof')
  const standardMembers = members.filter((member) => member.tier === 'member')

  return (
    <section
      id="members"
      style={{
        minHeight: '100dvh',
        padding: 'clamp(80px, 10vw, 120px) clamp(16px, 5vw, 80px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="film-grain" style={{ position: 'absolute', inset: 0, opacity: 0.02, zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        {hof.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <SectionLabel>↑ hall of fame</SectionLabel>
            <SectionTitle>Legends</SectionTitle>
            <MemberGrid>
              {hof.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </MemberGrid>
          </motion.div>
        )}

        {hof.length > 0 && mvp.length > 0 && <Divider />}

        {mvp.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            <SectionLabel>✦ leadership</SectionLabel>
            <SectionTitle>Leadership</SectionTitle>
            <MemberGrid>
              {mvp.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </MemberGrid>
          </motion.div>
        )}

        {mvp.length > 0 && standardMembers.length > 0 && <Divider />}

        {standardMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            style={{ textAlign: 'center' }}
          >
            <SectionLabel>✦ young gods</SectionLabel>
            <SectionTitle>Young Gods</SectionTitle>
            <MemberGrid>
              {standardMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </MemberGrid>
          </motion.div>
        )}
      </div>
    </section>
  )
}
