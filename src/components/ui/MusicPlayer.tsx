'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Track } from '@/types'

interface Props {
  playlist: Track[]
}


function IconPlayFill() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2.5 1.5L11.5 6.5L2.5 11.5V1.5Z" fill="currentColor" />
    </svg>
  )
}

function IconPauseFill() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="2"   y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
      <rect x="7.5" y="1.5" width="3.5" height="10" rx="1" fill="currentColor" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 1.5L8 6.5L1.5 11.5V1.5Z" fill="currentColor" />
      <rect x="9" y="1.5" width="2.5" height="10" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function IconShuffle({ active }: { active: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke={active ? 'rgba(255,255,255,0.85)' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
    </svg>
  )
}

function IconPlaylist() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8"    y1="6"  x2="21" y2="6"     />
      <line x1="8"    y1="12" x2="21" y2="12"    />
      <line x1="8"    y1="18" x2="21" y2="18"    />
      <line x1="3"    y1="6"  x2="3.01" y2="6"   />
      <line x1="3"    y1="12" x2="3.01" y2="12"  />
      <line x1="3"    y1="18" x2="3.01" y2="18"  />
    </svg>
  )
}

function IconVolume() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}



function fmt(sec: number): string {
  if (!isFinite(sec) || isNaN(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}


function WaveformFallback() {
  const heights = [5, 9, 6, 13, 8, 11, 6, 9, 5]
  return (
    <div style={{ display: 'flex', gap: 2.5, alignItems: 'flex-end', padding: '0 6px' }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width:      2.5,
            height:     h,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}


const EASE = [0.22, 1, 0.36, 1] as const

export default function MusicPlayer({ playlist }: Props) {
  const [trackIdx, setTrackIdx] = useState(0)
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [curTime,  setCurTime]  = useState(0)
  const [dur,      setDur]      = useState(0)
  const [volume,   setVolume]   = useState(1)
  const [shuffled, setShuffled] = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [coverErr, setCoverErr] = useState(false)
  const [seeking,  setSeeking]  = useState(false)

  const audioRef   = useRef<HTMLAudioElement | null>(null)
  const progRef    = useRef<HTMLDivElement>(null)


  const playingRef = useRef(false)
  useEffect(() => { playingRef.current = playing }, [playing])

  const hasTrack = playlist.length > 0
  const track    = hasTrack ? playlist[trackIdx] : null

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const a = audioRef.current
    if (!a || !track) return

    setProgress(0)
    setCurTime(0)
    setDur(0)
    setCoverErr(false)

    a.src   = track.src
    a.load()

    if (playingRef.current) {
      a.play().catch(() => setPlaying(false))
    }
  }, [trackIdx, track])




  
  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current
    if (!a || !isFinite(a.duration) || isNaN(a.duration)) return
    setCurTime(a.currentTime)
    if (!seeking) setProgress(a.currentTime / a.duration)
  }, [seeking])

  
  const onDurationChange = useCallback(() => {
    const a = audioRef.current
    if (a && isFinite(a.duration) && !isNaN(a.duration)) setDur(a.duration)
  }, [])

  
  const onLoadedMetadata = useCallback(() => {
    const a = audioRef.current
    if (a && isFinite(a.duration) && !isNaN(a.duration)) setDur(a.duration)
  }, [])

  
  const onEnded = useCallback(() => {
    if (!hasTrack) return
    if (shuffled) {

      setTrackIdx((prev) => {
        let next = Math.floor(Math.random() * playlist.length)
        if (playlist.length > 1 && next === prev) next = (next + 1) % playlist.length
        return next
      })
    } else {
      setTrackIdx((prev) => (prev + 1) % playlist.length)
    }
  }, [hasTrack, shuffled, playlist.length])


  const togglePlay = () => {
    if (!hasTrack) return
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const skip = (dir: 'prev' | 'next') => {
    if (!hasTrack) return
    setTrackIdx((prev) => {
      if (shuffled) {
        let next = Math.floor(Math.random() * playlist.length)
        if (playlist.length > 1 && next === prev) next = (next + 1) % playlist.length
        return next
      }
      return dir === 'next'
        ? (prev + 1) % playlist.length
        : (prev - 1 + playlist.length) % playlist.length
    })
  }


  const applySeek = useCallback((clientX: number) => {
    const el = progRef.current
    const a  = audioRef.current
    if (!el || !a || !isFinite(a.duration)) return
    const rect = el.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    a.currentTime = pct * a.duration
    setProgress(pct)
    setCurTime(a.currentTime)
  }, [])

  const onProgMouseDown  = (e: React.MouseEvent<HTMLDivElement>)  => { setSeeking(true);  applySeek(e.clientX) }
  const onProgMouseMove  = (e: React.MouseEvent<HTMLDivElement>)  => { if (seeking) applySeek(e.clientX) }
  const onProgMouseUp    = () => setSeeking(false)
  const onProgTouchStart = (e: React.TouchEvent<HTMLDivElement>)  => { setSeeking(true);  applySeek(e.touches[0].clientX) }
  const onProgTouchMove  = (e: React.TouchEvent<HTMLDivElement>)  => { applySeek(e.touches[0].clientX) }
  const onProgTouchEnd   = () => setSeeking(false)


  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }


  const ctrlStyle = (): React.CSSProperties => ({
    background:  'none',
    border:      'none',
    cursor:       hasTrack ? 'pointer' : 'default',
    color:        hasTrack ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
    padding:      4,
    display:     'flex',
    alignItems:  'center',
    transition:  'color 0.2s',
    flexShrink:   0,
  })


  return (
    <>
      {}
      {hasTrack && (
        <audio
          ref={audioRef}
          loop={playlist.length === 1}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onDurationChange={onDurationChange}
          onEnded={onEnded}
          preload="auto"
        />
      )}

      {}
      <style>{`
        .rev-vol {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .rev-vol::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 13px; height: 13px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
          transition: transform 0.15s;
        }
        .rev-vol::-moz-range-thumb {
          width: 13px; height: 13px;
          border-radius: 50%;
          background: #fff;
          border: none;
          cursor: pointer;
        }
        @media (hover: hover) {
          .rev-vol::-webkit-slider-thumb:hover { transform: scale(1.25); }
          .rev-play-btn:hover  { background: rgba(255,255,255,0.14) !important; }
          .rev-ctrl-btn:hover  { color: rgba(255,255,255,0.8) !important; }
          .rev-prog:hover .rev-thumb { opacity: 1 !important; }
        }
        .rev-thumb { transition: opacity 0.15s; }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: 16, scale: 0.97  }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              position: 'fixed',
              bottom:   20,
              left:     '50%',
              x:        '-50%',
              zIndex:    40,
              width:    'min(540px, calc(100vw - 28px))',
            }}
          >
            <div style={{
              background:           'rgba(7,7,7,0.95)',
              backdropFilter:       'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              border:               '1px solid rgba(255,255,255,0.07)',
              borderRadius:          14,
              padding:              '14px 16px 13px',
              boxShadow:            '0 16px 56px rgba(0,0,0,0.75)',
            }}>

              {}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

                {}
                <div style={{
                  width:     68, height: 68,
                  borderRadius: 8,
                  overflow:  'hidden',
                  background:'rgba(255,255,255,0.04)',
                  border:    '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                  display:   'flex',
                  alignItems:'center',
                  justifyContent: 'center',
                  position:  'relative',
                }}>
                  {track?.cover && !coverErr ? (
                    <Image
                      src={track.cover}
                      alt={track.title}
                      fill
                      sizes="68px"
                      style={{ objectFit: 'cover' }}
                      onError={() => setCoverErr(true)}
                      unoptimized
                    />
                  ) : (
                    <WaveformFallback />
                  )}
                </div>

                {}
                <div style={{ flex: 1, minWidth: 0 }}>

                  {}
                  <p style={{
                    fontFamily:  'var(--font-cormorant)',
                    fontWeight:   700,
                    fontSize:    '1rem',
                    letterSpacing:'0.04em',
                    color:       'rgba(255,255,255,0.9)',
                    whiteSpace:  'nowrap',
                    overflow:    'hidden',
                    textOverflow:'ellipsis',
                    marginBottom: 2,
                    lineHeight:   1.2,
                  }}>
                    {track?.title ?? 'YOUNG GOD OST'}
                  </p>

                  {}
                  <p style={{
                    fontFamily:  'var(--font-mono)',
                    fontSize:    '0.62rem',
                    letterSpacing:'0.12em',
                    color:       'rgba(255,255,255,0.3)',
                    marginBottom: 9,
                    whiteSpace:  'nowrap',
                    overflow:    'hidden',
                    textOverflow:'ellipsis',
                  }}>
                    {track?.artist ?? 'YOUNG GOD'}
                  </p>

                  {}
                  <div style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:         8,
                    marginBottom: 10,
                  }}>
                    {}
                    <span style={{
                      fontFamily:  'var(--font-mono)',
                      fontSize:    '0.58rem',
                      letterSpacing:'0.04em',
                      color:       'rgba(255,255,255,0.3)',
                      flexShrink:   0,
                      minWidth:     28,
                      textAlign:   'right',
                    }}>
                      {fmt(curTime)}
                    </span>

                    {}
                    <div
                      ref={progRef}
                      className="rev-prog"
                      onMouseDown={onProgMouseDown}
                      onMouseMove={onProgMouseMove}
                      onMouseUp={onProgMouseUp}
                      onMouseLeave={onProgMouseUp}
                      onTouchStart={onProgTouchStart}
                      onTouchMove={onProgTouchMove}
                      onTouchEnd={onProgTouchEnd}
                      style={{
                        flex:        1,
                        height:      4,
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius:999,
                        cursor:     'pointer',
                        position:  'relative',
                        userSelect:'none',
                        touchAction:'none',
                      }}
                    >
                      {}
                      <div style={{
                        position:    'absolute',
                        left: 0, top: 0,
                        height:      '100%',
                        width:       `${progress * 100}%`,
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: 999,
                        pointerEvents:'none',
                      }} />
                      {}
                      <div
                        className="rev-thumb"
                        style={{
                          position:   'absolute',
                          top:        '50%',
                          left:       `${progress * 100}%`,
                          transform:  'translate(-50%,-50%)',
                          width:       10,
                          height:      10,
                          borderRadius:'50%',
                          background: '#fff',
                          boxShadow:  '0 1px 4px rgba(0,0,0,0.5)',
                          pointerEvents:'none',
                          opacity:     seeking ? 1 : 0.6,
                        }}
                      />
                    </div>

                    {}
                    <span style={{
                      fontFamily:  'var(--font-mono)',
                      fontSize:    '0.58rem',
                      letterSpacing:'0.04em',
                      color:       'rgba(255,255,255,0.3)',
                      flexShrink:   0,
                      minWidth:     28,
                    }}>
                      {fmt(dur)}
                    </span>
                  </div>

                  {}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                    {}
                    <button
                      onClick={togglePlay}
                      aria-label={playing ? 'Pause' : 'Play'}
                      className="rev-play-btn"
                      style={{
                        background:    'rgba(255,255,255,0.08)',
                        border:        '1px solid rgba(255,255,255,0.1)',
                        borderRadius:   8,
                        width: 36, height: 36,
                        display:       'flex',
                        alignItems:    'center',
                        justifyContent:'center',
                        cursor:         hasTrack ? 'pointer' : 'default',
                        color:         'rgba(255,255,255,0.85)',
                        transition:    'background 0.2s, border-color 0.2s',
                        flexShrink:     0,
                      }}
                    >
                      {playing ? <IconPauseFill /> : <IconPlayFill />}
                    </button>

                    {}
                    <button
                      onClick={() => skip('next')}
                      aria-label="Next track"
                      className="rev-ctrl-btn"
                      style={ctrlStyle()}
                    >
                      <IconNext />
                    </button>

                    {}
                    <button
                      onClick={() => setShuffled((s) => !s)}
                      aria-label="Toggle shuffle"
                      className="rev-ctrl-btn"
                      style={{
                        ...ctrlStyle(),
                        color: shuffled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      <IconShuffle active={shuffled} />
                    </button>

                    <div style={{ flex: 1 }} />

                    {}
                    <button
                      aria-label="Queue"
                      className="rev-ctrl-btn"
                      style={ctrlStyle()}
                    >
                      <IconPlaylist />
                    </button>
                  </div>
                </div>
              </div>

              {}
              <div style={{
                display:    'flex',
                alignItems: 'center',
                gap:         10,
                marginTop:   12,
                paddingTop:  11,
                borderTop:  '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.25)', display: 'flex', flexShrink: 0 }}>
                  <IconVolume />
                </span>

                {}
                <input
                  type="range"
                  min={0} max={1} step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                  className="rev-vol"
                  style={{
                    background: `linear-gradient(to right, #d63255 ${volume * 100}%, rgba(255,255,255,0.08) ${volume * 100}%)`,
                  }}
                />

                <span style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.57rem',
                  letterSpacing:'0.12em',
                  color:       'rgba(255,255,255,0.22)',
                  flexShrink:   0,
                  whiteSpace:  'nowrap',
                }}>
                  VOLUME // {Math.round(volume * 100)}%
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
