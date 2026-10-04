import { notFound } from 'next/navigation'
import { members } from '@/data'
import MemberProfile from '@/components/MemberProfile'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateStaticParams() {
  return members.map((m) => ({ username: m.username }))
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params
  const member = members.find((m) => m.username === username)
  if (!member) return { title: 'Not found' }
  return {
    title: `${member.displayName} — Young God Worldwide`,
    description: member.bio,
  }
}

export default async function MemberPage({ params }: Props) {
  const { username } = await params
  const member = members.find((m) => m.username === username)
  if (!member) notFound()
  return <MemberProfile member={member!} />
}
