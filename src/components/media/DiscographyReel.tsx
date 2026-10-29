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
            <img
              src={release.jacket}
              alt={release.dummy ? "Dummy jacket" : release.title}
              width={1024}
              height={1024}
              loading="lazy"
            />
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

  const layoutRef = useRef<(animate: boolean, now: number) => void>(() => {})

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduced = motion.matches
    let visible = false
    let frame = 0
    let last = performance.now()

    const layout = (animate: boolean, now: number) => {
      const view = windowRef.current
      const track = trackRef.current
      const set = setRef.current
      if (!view || !track || !set) return
      const gap = gapOf(track)
      const per = view.clientWidth < 760 ? 1 : 3
      const slideW = (view.clientWidth - gap * (per - 1)) / per
      track.querySelectorAll<HTMLElement>(".jacket-slide").forEach((slide) => {
        slide.style.flexBasis = `${slideW}px`
      })
      const loop = set.offsetWidth + gap
      if (animate && !reduced) {
        const dt = Math.min(32, now - last)
        offset.current -= (dt / 1000) * SPEED
      }
      last = now
      if (loop > 0) {
        while (offset.current <= -loop) offset.current += loop
        while (offset.current > 0) offset.current -= loop
      }
      track.style.transform = `translate3d(${offset.current}px, 0, 0)`
    }
    layoutRef.current = layout

    const stop = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    const tick = (now: number) => {
      layout(true, now)
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame || reduced || !visible) return
      last = performance.now()
      frame = window.requestAnimationFrame(tick)
    }

    const onMotion = () => {
      reduced = motion.matches
      layout(false, performance.now())
      if (reduced) stop()
      else start()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })

    const view = windowRef.current
    if (view) observer.observe(view)
    motion.addEventListener("change", onMotion)
    window.addEventListener("resize", onMotion)
    layout(false, performance.now())

    return () => {
      stop()
      observer.disconnect()
      motion.removeEventListener("change", onMotion)
      window.removeEventListener("resize", onMotion)
    }
  }, [])

  function step(direction: -1 | 1) {
    const track = trackRef.current
    const slide = track?.querySelector<HTMLElement>(".jacket-slide")
    if (!track || !slide) return
    offset.current += direction * (slide.offsetWidth + gapOf(track))
    layoutRef.current(false, performance.now())
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
