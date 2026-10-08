'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

function resetScrollPosition() {
  window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  document.documentElement.scrollLeft = 0
  document.documentElement.scrollTop = 0
  document.body.scrollLeft = 0
  document.body.scrollTop = 0
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    resetScrollPosition()

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    resetScrollPosition()
    setVisible(true)

    let frame1 = 0
    let frame2 = 0

    frame1 = requestAnimationFrame(() => {
      resetScrollPosition()
      frame2 = requestAnimationFrame(() => {
        resetScrollPosition()
      })
    })

    const timeout = window.setTimeout(() => {
      resetScrollPosition()
      setVisible(false)
    }, 350)

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      window.clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <>
      {children}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        9999,
          background:    '#000',
          pointerEvents: 'none',
          opacity:       visible ? 1 : 0,
          filter:        visible ? 'blur(0px)' : 'blur(12px)',
          transition:    'opacity 350ms cubic-bezier(0.22,1,0.36,1), filter 350ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </>
  )
}
