'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hasPlayedNavbar, setNavbarPlayed } from '@/lib/introState'
import { config } from '@/data'

const NAV_ITEMS = [
  { label: 'Home',    id: 'home' },
  { label: 'Members', id: 'members' },
]

const EASE = [0.22, 1, 0.36, 1] as const

function smoothScrollTo(targetId: string, onDone?: () => void) {
  const target = document.querySelector(targetId)
  if (!target) return

  const start = window.scrollY
  const end = target.getBoundingClientRect().top + window.scrollY - 4
  const distance = end - start
  const duration = 1100
  let startTime: number | null = null

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const step = (now: number) => {
    if (!startTime) startTime = now
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo({ top: start + distance * ease(progress) })
    if (elapsed < duration) requestAnimationFrame(step)
    else onDone?.()
  }

  requestAnimationFrame(step)
}

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false)
  const [isMobile, setIsMobile]    = useState(false)
  const [open, setOpen]            = useState(false)
  const [activeSection, setActive] = useState('home')
  const [mounted, setMounted]      = useState(false)
  const [visible, setVisible]      = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)

    const onResize = () => setIsMobile(window.innerWidth < 768)
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActive(id)
          break
        }
      }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (hasPlayedNavbar()) {
      setVisible(true)
    } else {
      const t = setTimeout(() => {
        setVisible(true)
        setNavbarPlayed()
      }, 3600)
      return () => {
        clearTimeout(t)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('scroll', onScroll)
      }
    }

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!mounted) return null

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    smoothScrollTo(`#${id}`, () => setActive(id))
    setOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
      animate={{
        opacity: visible ? 1 : 0,
        y:       visible ? 0 : -24,
        filter:  visible ? 'blur(0px)' : 'blur(8px)',
      }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: 'fixed',
        top:       20,
        left:      isMobile ? 16 : 48,
        right:     isMobile ? 16 : 48,
        zIndex:    50,
      }}
    >
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '11px 22px',
          borderRadius:   '999px',
          background:     scrolled
            ? 'rgba(4, 4, 4, 0.92)'
            : 'rgba(0, 0, 0, 0.5)',
          backdropFilter:       'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border:         scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow:      scrolled
            ? '0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'none',
          transition:     'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          style={{
            fontFamily:    'var(--font-cormorant)',
            fontWeight:     300,
            fontStyle:     'italic',
            fontSize:       15,
            letterSpacing: '0.12em',
            color:         'rgba(255,255,255,0.72)',
            textDecoration:'none',
            transition:    'color 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.95)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}
        >
          {config.title.toLowerCase()}
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  style={{
                    position:      'relative',
                    fontFamily:    'var(--font-mono)',
                    fontSize:       11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color:          isActive ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    paddingBottom:  4,
                    transition:    'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive
                      ? 'rgba(255,255,255,0.88)'
                      : 'rgba(255,255,255,0.4)'
                  }}
                >
                  {label}
                  <span
                    style={{
                      position:        'absolute',
                      bottom:           0,
                      left:             0,
                      width:           '100%',
                      height:          '1px',
                      background:      'rgba(255,255,255,0.55)',
                      transform:        isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition:      'transform 0.3s var(--ease-spring, cubic-bezier(0.22,1,0.36,1))',
                    }}
                  />
                </a>
              )
            })}

            <a
              href={config.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:       10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.42)',
                textDecoration:'none',
                padding:       '5px 14px',
                border:        '1px solid rgba(255,255,255,0.09)',
                borderRadius:  '999px',
                background:    'rgba(255,255,255,0.03)',
              }}
            >
              ygng
            </a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:     6,
              display:    'flex',
              flexDirection:'column',
              gap:          5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 0 ? { rotate: 45,  y: 6.5 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    :            { rotate: -45, y: -6.5 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.28, ease: EASE }}
                style={{
                  display:         'block',
                  width:            18,
                  height:           1.5,
                  background:      'rgba(255,255,255,0.65)',
                  borderRadius:    '999px',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1,  y: 0,   scale: 1 }}
            exit={{ opacity: 0,    y: -10,  scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              marginTop:            8,
              borderRadius:         18,
              background:           'rgba(4,4,4,0.96)',
              border:               '1px solid rgba(255,255,255,0.06)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding:              '18px 24px',
              display:              'flex',
              flexDirection:        'column',
              gap:                   16,
            }}
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:       12,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:          activeSection === id
                    ? 'rgba(255,255,255,0.88)'
                    : 'rgba(255,255,255,0.38)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={config.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:       11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.38)',
                textDecoration:'none',
                paddingTop:     10,
                borderTop:     '1px solid rgba(255,255,255,0.05)',
              }}
            >
              discord.gg/ygng ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
