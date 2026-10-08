'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname()
  const prevPath   = useRef(pathname)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    window.scrollTo({ top: 0, behavior: 'instant' })
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 350)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      {children}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:          0,
          zIndex:         9999,
          background:    '#000',
          pointerEvents: 'none',
          opacity:        visible ? 1 : 0,
          filter:         visible ? 'blur(0px)' : 'blur(12px)',
          transition:    'opacity 350ms cubic-bezier(0.22,1,0.36,1), filter 350ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </>
  )
}
