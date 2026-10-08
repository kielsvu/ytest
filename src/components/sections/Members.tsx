'use client'

import { motion } from 'framer-motion'
import { members, revshitThanks } from '@/data'
import type { MemberRole } from '@/types'
import MemberCard from './MemberCard'

const EASE = [0.22, 1, 0.36, 1] as const

type Group = {
  title: string
  label: string
  roles: MemberRole[]
  className: string
}

const groups: Group[] = [
  { title: 'Leadership',   label: 'the ones who built it',         roles: ['founder', 'cofounder'], className: 'org-section-leadership' },
  { title: 'Insiders',     label: 'trusted members of young god',  roles: ['insider'],              className: 'org-section-insider' },
  { title: 'Young Gods',   label: 'young god worldwide',           roles: ['younggod'],             className: 'org-section-younggod' },
]

export default function Members() {
  return (
    <section
      id="members"
      style={{
        minHeight: '100dvh',
        padding:   'clamp(80px, 10vw, 120px) clamp(16px, 5vw, 80px) 100px',
        position:  'relative',
        overflow:  'hidden',
      }}
    >
      <div
        className="film-grain"
        style={{ position: 'absolute', inset: 0, opacity: 0.018, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Subtle top fade from hero */}
      <div
        style={{
          position:      'absolute',
          top:            0,
          left:           0,
          right:          0,
          height:        '200px',
          background:    'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex:         0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ textAlign: 'center' }}
        >
          {/* Section label */}
          <div
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:       8.5,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.2)',
              marginBottom:   14,
            }}
          >
            ✦ organization
          </div>

          {/* Section title */}
          <h2
            style={{
              fontFamily:           'var(--font-cormorant)',
              fontWeight:            300,
              fontStyle:            'italic',
              fontSize:             'clamp(1.7rem, 4.5vw, 3rem)',
              letterSpacing:        '0.08em',
              background:           'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(180,180,180,0.65) 60%, rgba(120,120,120,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
              marginBottom:          40,
            }}
          >
            Young God Worldwide
          </h2>

          <div className="organization-sections">
            {groups.map((group, groupIndex) => {
              const groupMembers = members.filter(m => group.roles.includes(m.roleKey))
              return (
                <section
                  key={group.title}
                  className={`organization-section ${group.className}`}
                >
                  <div className="organization-section-heading">
                    <span>{group.label}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="member-grid">
                    {groupMembers.map((member, index) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        index={index + groupIndex * 2}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* RevShit thanks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div
              className="revshit-thanks"
              aria-label={`${revshitThanks.label}: ${revshitThanks.name}`}
            >
              <div className="revshit-logo-wrap">
                <img
                  src={revshitThanks.imageSrc}
                  alt="RevShit logo"
                  className="revshit-logo"
                  draggable={false}
                />
              </div>
              <div className="revshit-copy">
                <span className="revshit-label">{revshitThanks.label}</span>
                <strong>{revshitThanks.name}</strong>
                <span>{revshitThanks.description}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
