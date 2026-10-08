import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { members } from '@/data'
import MemberProfile from '@/components/MemberProfile'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateStaticParams() {
  return members.map((m) => ({ username: m.username }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const member = members.find((m) => m.username === username)
  if (!member) return { title: 'Not found' }

  const title       = `${member.displayName} — Young God Worldwide`
  const description = member.bio
  const ogImage     = `/api/og?user=${username}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type:   'profile',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:   'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function MemberPage({ params }: Props) {
  const { username } = await params
  const member = members.find((m) => m.username === username)
  if (!member) notFound()
  return <MemberProfile member={member} />
}
