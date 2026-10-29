import siteJson from "./site.json"
import talentsJson from "./talents.json"
import releasesJson from "./releases.json"
import artworksJson from "./artworks.json"
import animationsJson from "./animations.json"
import type { Animation, Artwork, Release, Site, Talent } from "./types"

export type { ArtworkCategory, ReleaseType } from "./types"

export const site = siteJson as Site
export const talents = talentsJson as Talent[]
export const releases = releasesJson as Release[]
export const artworks = artworksJson as Artwork[]
export const animations = animationsJson as Animation[]

export function talentBySlug(slug: string) {
  return talents.find((talent) => talent.slug === slug)
}

export function releaseBySlug(slug: string) {
  return releases.find((release) => release.slug === slug)
}

export function artworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug)
}

export function animationBySlug(slug: string) {
  return animations.find((piece) => piece.slug === slug)
}
