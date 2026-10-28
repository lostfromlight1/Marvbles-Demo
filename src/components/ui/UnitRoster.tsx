import { useState } from "react"
import { Link } from "react-router-dom"
import type { Socials, Talent } from "../../content/types"
import { Explore } from "./Explore"

const socialLabels: { key: keyof Socials; label: string }[] = [
  { key: "youtube", label: "YouTube" },
  { key: "twitch", label: "Twitch" },
  { key: "x", label: "X" },
  { key: "tiktok", label: "TikTok" },
]

const PREVIEW = 4

export function UnitRoster({ unit, talents }: { unit: string; talents: Talent[] }) {
  const [open, setOpen] = useState(false)
  const people = talents.filter((talent) => talent.unit === unit)
  const shown = open ? people : people.slice(0, PREVIEW)

  return (
    <div className="unit-block">
      <h2 className="content-title">{unit}</h2>
      {people.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="rows">
          {shown.map((talent, index) => (
            <li key={talent.slug} className="talent-row">
              <Link to={`/vsinger/${talent.slug}`}>
                <span className="index-no">{String(index + 1).padStart(2, "0")}</span>
                {talent.dummy ? "[Dummy] " : ""}
                {talent.name}
              </Link>
              <Explore to={`/vsinger/${talent.slug}`} />
              <div className="talent-drop">
                <img
                  src={talent.portrait || "/assets/ref/dummy-portrait.svg"}
                  alt="Dummy portrait"
                  width={280}
                  height={280}
                />
                <p>{talent.bio || "Dummy bio."}</p>
                <ul className="talent-socials">
                  {socialLabels.map(({ key, label }) => {
                    const href = talent.socials[key]
                    return (
                      <li key={key}>
                        {href ? (
                          <a href={href} target="_blank" rel="noreferrer">
                            {label}
                          </a>
                        ) : (
                          <span>{label}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
      {people.length > PREVIEW ? (
        <button
          type="button"
          className="show-more"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Show less" : "Show more"}
        </button>
      ) : null}
    </div>
  )
}
