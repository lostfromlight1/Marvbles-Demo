export type Socials = {
  youtube: string
  twitch: string
  x: string
  tiktok: string
}

export type Talent = {
  slug: string
  name: string
  nameJp: string
  unit: string
  themeColor: string
  avatar: string
  portrait: string
  fanName: string
  oshiMark: string
  birthday: string
  height: string
  debut: string
  languages: string[]
  bio: string
  lore: string
  dummy?: boolean
  socials: Socials
}

export type Credit = { role: string; name: string }

export type ReleaseType = "cover" | "original" | "unit"

export type Release = {
  slug: string
  title: string
  talentSlugs: string[]
  type: ReleaseType
  date: string
  jacket: string
  dummy: boolean
  credits: Credit[]
  mvYoutubeId: string
  streamingLinks: { label: string; href: string }[]
}

export type ArtworkCategory = "talent-design" | "fan-art" | "key-visual" | "sketch"

export type Artwork = {
  slug: string
  title: string
  artist: string
  category: ArtworkCategory
  image: string
  width: number
  height: number
  alt: string
  dummy: boolean
  process: ("sketch" | "line" | "color")[]
  tags: string[]
  date: string
  talentSlugs: string[]
}

export type Animation = {
  slug: string
  title: string
  poster: string
  video: string
  youtubeId: string
  dummy: boolean
  credits: Credit[]
  storyboardFrames: string[]
  bts: string[]
  talentSlugs: string[]
}

export type Site = {
  name: string
  unit: string
  tagline: string
  language: string
  story: string
  footerNote: string
  nav: { label: string; to: string }[]
  socials: { email: string; discord: string }
  exhibition: string[]
  demoVideo: { youtubeId: string; title: string; credit: string; href: string }
}
