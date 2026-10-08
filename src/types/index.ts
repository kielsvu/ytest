export type MemberRole = 'founder' | 'cofounder' | 'insider' | 'younggod'

export interface Member {
  id: string
  username: string
  displayName: string
  avatar: string
  roleKey: MemberRole
  role: string
  bio: string
  joinedAt: string
  socials?: {
    discord?: string
    twitter?: string
    instagram?: string
  }
}

export interface Track {
  title: string
  artist: string
  src: string
  cover?: string
}

export interface SiteConfig {
  title: string
  description: string
  enterTitle: string
  enterSubtitle: string
  discordUrl: string
}
