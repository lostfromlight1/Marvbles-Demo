import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import type { Release } from "../../content/types"
import { ExploreMark } from "../ui/Explore"

const SPEED = 48

function Slide({ release, index }: { release: Release; index: number }) {
  return (
    <article className="jacket-slide">
      <Link to={`/vsinger/release/${release.slug}`}>
        <div className="jacket">
          {release.jacket ? (
            <img src={release.jacket} alt={release.dummy ? "Dummy jacket" : release.title} />
          ) : (
            <>
              {release.dummy ? "Dummy" : release.title}
              <span className="meta">Jacket not added yet.</span>
            </>
          )}
        </div>
        <div className="jacket-meta">
          <span className="index-no">{String(index + 1).padStart(2, "0")}</span>
          <h3>{release.title}</h3>
          <ExploreMark />
        </div>
      </Link>
    </article>
  )
}

function gapOf(track: HTMLElement) {
  return Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
}

export function DiscographyReel({ releases }: { releases: Release[] }) {
  const windowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const offset = useRef(0)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduced = motion.matches
    const onMotion = () => {
      reduced = motion.matches
    }
    motion.addEventListener("change", onMotion)

    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const view = windowRef.current
      const track = trackRef.current
      const set = setRef.current
      if (view && track && set) {
        const gap = gapOf(track)
        const per = view.clientWidth < 760 ? 1 : 3
        const slideW = (view.clientWidth - gap * (per - 1)) / per
        track.querySelectorAll<HTMLElement>(".jacket-slide").forEach((slide) => {
          slide.style.flexBasis = `${slideW}px`
        })
        const loop = set.offsetWidth + gap
        if (!reduced) offset.current -= (dt / 1000) * SPEED
        if (loop > 0) {
          while (offset.current <= -loop) offset.current += loop
          while (offset.current > 0) offset.current -= loop
        }
        track.style.transform = `translate3d(${offset.current}px, 0, 0)`
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(frame)
      motion.removeEventListener("change", onMotion)
    }
  }, [])

  function step(direction: -1 | 1) {
    const track = trackRef.current
    const slide = track?.querySelector<HTMLElement>(".jacket-slide")
    if (!track || !slide) return
    offset.current += direction * (slide.offsetWidth + gapOf(track))
  }

  return (
    <div className="disco">
      <div className="disco-movers">
        <button type="button" aria-label="Previous release" onClick={() => step(1)}>
          ←
        </button>
        <button type="button" aria-label="Next release" onClick={() => step(-1)}>
          →
        </button>
      </div>
      <div className="disco-window" ref={windowRef}>
        <div className="jackets" ref={trackRef}>
          <div className="jacket-set" ref={setRef}>
            {releases.map((release, index) => (
              <Slide key={release.slug} release={release} index={index} />
            ))}
          </div>
          <div className="jacket-set" aria-hidden="true" inert>
            {releases.map((release, index) => (
              <Slide key={`${release.slug}-copy`} release={release} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
