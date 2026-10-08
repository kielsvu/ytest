'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let raf: number

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px)`
    }

    function onEnter(e: MouseEvent) {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')
      if (isClickable) {
        dot.classList.add('cursor-hover')
        ring.classList.add('cursor-hover')
      }
    }

    function onLeave() {
      dot.classList.remove('cursor-hover')
      ring.classList.remove('cursor-hover')
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
