import type { Member, SiteConfig, Track } from '@/types'

export const config: SiteConfig = {
  title: 'Young God Worldwide',
  description: 'Young God Worldwide',
  enterTitle: 'YOUNG GOD WORLDWIDE',
  enterSubtitle: 'ALAM MO NA GAGAWIN MO',
  discordUrl: 'https://discord.gg/eaVEtShPE3',
}

export const members: Member[] = [
  {
    id: 'founder-kiel',
    username: 'kiel',
    displayName: 'kiel',
    avatar: '/assets/h.jpg',
    roleKey: 'founder',
    role: 'Founder',
    bio: 'the founder and the one who started Young God.',
    joinedAt: '2026-09-28',
    socials: { discord: 'kielstfu' },
  },
  {
    id: 'cofounder-day',
    username: 'day',
    displayName: 'day',
    avatar: '/assets/ha.jpg',
    roleKey: 'cofounder',
    role: 'Co-Founder',
    bio: 'helped shape Young God from the start.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'insider-keso',
    username: 'keso',
    displayName: 'keso',
    avatar: '/assets/haha.jpg',
    roleKey: 'insider',
    role: 'Insider',
    bio: 'an insider with a distinct presence in Young God.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'insider-yumi',
    username: 'yumi',
    displayName: 'yumi',
    avatar: '/assets/hah.jpg',
    roleKey: 'insider',
    role: 'Insider',
    bio: 'an insider within Young God.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'younggod-cass',
    username: 'cass',
    displayName: 'cass',
    avatar: '',
    roleKey: 'younggod',
    role: 'Young God',
    bio: 'one of the Young Gods.',
    joinedAt: '2026-09-28',
  },
  {
    id: 'younggod-jake',
    username: 'jake',
    displayName: 'jake',
    avatar: '',
    roleKey: 'younggod',
    role: 'Young God',
    bio: 'one of the Young Gods.',
    joinedAt: '2026-09-28',
  },
]

export const revshitThanks = {
  label: 'inspiration / thanks',
  name: 'RevShit',
  description: 'respect to the people who inspired the culture.',
  imageSrc: '/assets/revshit.jpg',
}

export const playlist: Track[] = []
