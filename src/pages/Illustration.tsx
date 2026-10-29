import { useState } from "react"
import { Link } from "react-router-dom"
import { artworks, type ArtworkCategory } from "../content"
import { usePageTitle } from "../ui/title"

const filters: { id: "all" | ArtworkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "talent-design", label: "Talent design" },
  { id: "fan-art", label: "Fan art" },
  { id: "key-visual", label: "Key visual" },
  { id: "sketch", label: "Sketch" },
]

export function Illustration() {
  usePageTitle("Illustration")
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")
  const shown = artworks.filter((artwork) => filter === "all" || artwork.category === filter)

  return (
    <>
      <h1 className="page-title">Illustration</h1>
      <p className="lede">Stills will land here. Dummy entries are not finished work.</p>
      <div className="filters" role="group" aria-label="Artwork category">
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
        <ul className="gallery">
          {shown.map((artwork, index) => (
            <li key={artwork.slug}>
              <Link to={`/illustration/${artwork.slug}`}>
                {artwork.image ? (
                  <img
                    src={artwork.image}
                    alt={artwork.alt || "Dummy illustration"}
                    width={artwork.width || 1024}
                    height={artwork.height || 1024}
                    loading="lazy"
                  />
                ) : (
                  <span className="gallery-empty">Image not added yet.</span>
                )}
                <span className="gallery-meta">
                  <span className="index-no">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    {artwork.dummy ? "[Dummy] " : ""}
                    {artwork.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
