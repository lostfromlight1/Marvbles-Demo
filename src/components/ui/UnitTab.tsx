import { useState } from "react"
import { Link } from "react-router-dom"
import type { Talent } from "../../content/types"

export function UnitTab({ unit, talents }: { unit: string; talents: Talent[] }) {
  const [selected, setSelected] = useState(0)
  const [forUnit, setForUnit] = useState(unit)
  if (forUnit !== unit) {
    setForUnit(unit)
    setSelected(0)
  }
  const index = forUnit === unit ? selected : 0
  const people = talents.filter((talent) => talent.unit === unit)
  const current = people[index]

  if (people.length === 0) {
    return (
      <div className="unit-tab">
        <p className="empty">Nothing here yet.</p>
      </div>
    )
  }

  const handlePrev = () => {
    setSelected((prev) => (prev === 0 ? people.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelected((prev) => (prev === people.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="unit-tab">
      <div className="character-carousel">
        <div className="carousel-content" key={current.slug}>
          {current.portrait && (
            <div className="character-image">
              <img src={current.portrait} alt={current.name} width={800} height={800} loading="lazy" />
            </div>
          )}
          <div className="character-info">
            <div className="character-header">
              <span className="character-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="character-name">
                  {current.dummy ? "[Dummy] " : ""}
                  {current.name}
                </p>
                {current.nameJp && <p className="character-name-jp">{current.nameJp}</p>}
              </div>
            </div>

            <p className="character-bio">{current.bio}</p>

            {(current.birthday || current.height || current.debut || current.fanName) && (
              <div className="character-details">
                {current.birthday && (
                  <div className="detail-row">
                    <span className="detail-label">Birthday:</span>
                    <span>{current.birthday}</span>
                  </div>
                )}
                {current.height && (
                  <div className="detail-row">
                    <span className="detail-label">Height:</span>
                    <span>{current.height}</span>
                  </div>
                )}
                {current.debut && (
                  <div className="detail-row">
                    <span className="detail-label">Debut:</span>
                    <span>{current.debut}</span>
                  </div>
                )}
                {current.fanName && (
                  <div className="detail-row">
                    <span className="detail-label">Fan Name:</span>
                    <span>{current.fanName}</span>
                  </div>
                )}
              </div>
            )}

            {(current.socials.youtube ||
              current.socials.twitch ||
              current.socials.x ||
              current.socials.tiktok) && (
              <ul className="character-socials">
                {current.socials.youtube && (
                  <li>
                    <a href={current.socials.youtube} target="_blank" rel="noreferrer">
                      YouTube
                    </a>
                  </li>
                )}
                {current.socials.twitch && (
                  <li>
                    <a href={current.socials.twitch} target="_blank" rel="noreferrer">
                      Twitch
                    </a>
                  </li>
                )}
                {current.socials.x && (
                  <li>
                    <a href={current.socials.x} target="_blank" rel="noreferrer">
                      X
                    </a>
                  </li>
                )}
                {current.socials.tiktok && (
                  <li>
                    <a href={current.socials.tiktok} target="_blank" rel="noreferrer">
                      TikTok
                    </a>
                  </li>
                )}
              </ul>
            )}

            <Link to={`/vsinger/${current.slug}`} className="show-more-btn">
              Show more
            </Link>
          </div>
        </div>

        {people.length > 1 && (
          <div className="carousel-nav">
            <button
              type="button"
              className="carousel-btn"
              onClick={handlePrev}
              aria-label="Previous character"
            >
              ←
            </button>
            <div className="carousel-counter">
              {String(index + 1).padStart(2, "0")} / {String(people.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              className="carousel-btn"
              onClick={handleNext}
              aria-label="Next character"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
