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
  const [scrolled, setScrolled]       = useState(false)
  const [isMobile, setIsMobile]       = useState(false)
  const [open, setOpen]               = useState(false)
  const [activeSection, setActive]    = useState('home')
  const [mounted, setMounted]         = useState(false)
  const [visible, setVisible]         = useState(false)

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
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -32 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: 'fixed',
        top: 20,
        left: isMobile ? 16 : 48,
        right: isMobile ? 16 : 48,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 24px',
          borderRadius: '999px',
          background: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'background 0.4s ease',
        }}
      >
        {}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 15,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.75)',
            textDecoration: 'none',
          }}
        >
          {config.title.toLowerCase()}
        </a>

        {}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    paddingBottom: 4,
                    transition: 'color 0.25s ease',
                  }}
                >
                  {label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      background: 'rgba(255,255,255,0.6)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.28s ease',
                    }}
                  />
                </a>
              )
            })}

            <a
              href={config.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                padding: '5px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                transition: 'border-color 0.25s, color 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
              }}
            >
              Join Discord
            </a>
          </div>
        )}

        {}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 0
                      ? { rotate: 45, y: 7 }
                      : i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.3, ease: EASE }}
                style={{
                  display: 'block',
                  width: 18,
                  height: 1.5,
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '999px',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        )}
      </div>

      {}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              marginTop: 8,
              borderRadius: 16,
              background: 'rgba(0,0,0,0.92)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: activeSection === id ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
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
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                paddingTop: 8,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Join Discord →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
