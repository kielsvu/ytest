import type { Member, SiteConfig, Track } from '@/types'

export const config: SiteConfig = {
  title: 'Young God Worldwide',
  description: 'Young God Worldwide',
  enterTitle: 'YOUNG GOD WORLDWIDE',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/ygng',
}

export const members: Member[] = [
  {
    id: 'founder-kiel',
    username: 'kiel',
    displayName: 'kiel',
    avatar: '/assets/h.jpg',
    tier: 'mvp',
    role: 'Founder',
    bio: 'the founder and the one who started Young God.',
    joinedAt: '2026-09-28',
    socials: { discord: 'kielstfu' },
  },
  {
    id: 'cofounder-day',
    username: 'day',
    displayName: 'day',
    avatar: '',
    tier: 'mvp',
    role: 'Co-Founder',
    bio: 'built into the core of the organization from the start.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'core-keso',
    username: 'keso',
    displayName: 'keso',
    avatar: '',
    tier: 'hof',
    role: 'Core Operations',
    bio: 'keeps the people, plans, and day-to-day operation moving.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'insider-yumi',
    username: 'yumi',
    displayName: 'yumi',
    avatar: '',
    tier: 'hof',
    role: 'Insider',
    bio: 'part of the inner circle and close to the core.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'younggod-cass',
    username: 'cass',
    displayName: 'cass',
    avatar: '',
    tier: 'member',
    role: 'Young God',
    bio: 'one of the Young Gods.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'younggod-jake',
    username: 'jake',
    displayName: 'jake',
    avatar: '',
    tier: 'member',
    role: 'Young God',
    bio: 'one of the Young Gods.',
    joinedAt: '2026-09-28',
  },
]

export const playlist: Track[] = []
