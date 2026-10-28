import { useEffect, useState } from "react"

const frames = [
  "/assets/ref/jkt-alt.png",
  "/assets/ref/jkt-orange.png",
  "/assets/ref/jkt-mint.png",
  "/assets/ref/jkt-pause.jpg",
  "/assets/ref/jkt-howmany.jpg",
  "/assets/ref/kv-stills.jpg",
  "/assets/ref/kv-figure.jpg",
  "/assets/ref/kv-stage.jpg",
]

const STEP_MS = 1600

export function VideoCompilation() {
  const [tick, setTick] = useState(0)
  const [shape, setShape] = useState<"square" | "rectangle">("square")
  const [motion, setMotion] = useState<"unknown" | "ok" | "reduce">("unknown")
  const [user, setUser] = useState<"auto" | "play" | "pause">("auto")
  const playing = user === "play" || (user === "auto" && motion === "ok")

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setMotion(query.matches ? "reduce" : "ok")
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setTick((value) => value + 1), STEP_MS)
    return () => window.clearInterval(id)
  }, [playing])

  return (
    <div className="mv-stage">
      <div className="mv-shapes" role="group" aria-label="Frame shape">
        <button type="button" aria-pressed={shape === "square"} onClick={() => setShape("square")}>
          Square
        </button>
        <button
          type="button"
          aria-pressed={shape === "rectangle"}
          onClick={() => setShape("rectangle")}
        >
          Rectangle
        </button>
      </div>
      <div className="mv-frame" data-shape={shape}>
        <div className="mv-grid">
          {[0, 1, 2, 3].map((cell) => (
            <img
              key={`${cell}-${frames[(tick + cell) % frames.length]}`}
              src={frames[(tick + cell) % frames.length]}
              alt=""
            />
          ))}
        </div>
        <p className="mv-label">Dummy</p>
        <button
          type="button"
          className="mv-pause"
          aria-pressed={!playing}
          onClick={() => setUser(playing ? "pause" : "play")}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  )
}
