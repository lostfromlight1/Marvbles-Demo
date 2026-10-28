import { useState } from "react"
import { Link } from "react-router-dom"
import { UnitTab } from "../components/ui/UnitTab"
import { releases, site, talents, type ReleaseType } from "../content"
import { usePageTitle } from "../ui/title"

const filters: { id: "all" | ReleaseType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cover", label: "Cover" },
  { id: "original", label: "Original" },
  { id: "unit", label: "Unit" },
]

export function Vsinger() {
  usePageTitle("Vsinger")
  const [tab, setTab] = useState<"Eonica" | "Nox">("Eonica")
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")
  const shown = releases.filter((release) => filter === "all" || release.type === filter)

  return (
    <>
      <h1 className="page-title">Vsinger</h1>
      <p className="lede">{site.unit}. Songs play from YouTube once an id is added.</p>

      <div className="unit-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "Eonica"}
          onClick={() => setTab("Eonica")}
          className="unit-tab-button"
        >
          Eonica
        </button>
        <button
          role="tab"
          aria-selected={tab === "Nox"}
          onClick={() => setTab("Nox")}
          className="unit-tab-button"
        >
          Nox
        </button>
      </div>

      <UnitTab unit={tab} talents={talents} />

      <h2 className="content-title" style={{ marginTop: "2.4rem" }}>
        Songs
      </h2>
      <div className="filters" role="group" aria-label="Song type">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="page-list">
          {shown.map((release) => (
            <li key={release.slug}>
              <Link to={`/vsinger/release/${release.slug}`}>
                {release.dummy ? "[Dummy] " : ""}
                {release.title}
              </Link>
              <span className="meta">{release.type}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
