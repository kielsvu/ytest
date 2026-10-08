import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { members } from '@/data'

export const runtime = 'edge'

const ROLE_COLOR: Record<string, string> = {
  founder:   '#FFD86A',
  cofounder: '#FFD86A',
  insider:   '#E6E8EB',
  younggod:  '#D88A45',
}

export function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const slug   = searchParams.get('user') ?? ''
  const member = members.find(m => m.username === slug)

  if (!member) {
    return new Response('Not found', { status: 404 })
  }

  const color     = ROLE_COLOR[member.roleKey] ?? '#E6E8EB'
  const avatarUrl = member.avatar ? `${origin}${member.avatar}` : null

  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#000000',
          fontFamily:     'Georgia, serif',
        }}
      >
        <div
          style={{
            position:     'absolute',
            inset:         0,
            background:   'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)',
          }}
        />

        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            width={110}
            height={110}
            style={{
              borderRadius: '50%',
              marginBottom:  28,
              objectFit:    'cover',
              border:       `1px solid rgba(255,255,255,0.1)`,
            }}
            alt=""
          />
        )}

        {!avatarUrl && (
          <div
            style={{
              width:          110,
              height:         110,
              borderRadius:  '50%',
              marginBottom:   28,
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              border:        '1px solid rgba(255,255,255,0.1)',
              fontSize:       52,
              color:         'rgba(255,255,255,0.3)',
            }}
          >
            {member.displayName[0]?.toUpperCase()}
          </div>
        )}

        <div
          style={{
            fontSize:      64,
            fontWeight:     300,
            color:         '#ffffff',
            letterSpacing: '0.06em',
            marginBottom:   10,
            fontStyle:     'italic',
          }}
        >
          {member.displayName}
        </div>

        <div
          style={{
            fontSize:      14,
            color,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom:   52,
          }}
        >
          {member.role}
        </div>

        <div
          style={{
            width:        56,
            height:        1,
            background:   'rgba(255,255,255,0.18)',
            marginBottom:  52,
          }}
        />

        <div
          style={{
            fontSize:      12,
            color:        'rgba(255,255,255,0.22)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          YOUNG GOD WORLDWIDE
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
