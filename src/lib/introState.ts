export function hasPlayedIntro(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('younggod_intro') === 'true'
}

export function setIntroPlayed(): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('younggod_intro', 'true')
}

export function hasPlayedNavbar(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('younggod_navbar') === 'true'
}

export function setNavbarPlayed(): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('younggod_navbar', 'true')
}
