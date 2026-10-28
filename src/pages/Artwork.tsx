import { Link, useParams } from "react-router-dom"
import { artworkBySlug } from "../content"
import { usePageTitle } from "../ui/title"

export function Artwork() {
  const { slug = "" } = useParams()
  const artwork = artworkBySlug(slug)
  usePageTitle(artwork?.title ?? "Not found")

  if (!artwork) {
    return (
      <>
        <h1 className="page-title">Not found</h1>
        <Link className="section-link" to="/illustration">
          Back to Illustration
        </Link>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">{artwork.dummy ? "[Dummy] " : ""}{artwork.title}</h1>
      <p className="lede">{artwork.artist}</p>
      {artwork.image ? (
        <img
          className="artwork-still"
          src={artwork.image}
          alt={artwork.alt || "Dummy illustration"}
          width={artwork.width || 1024}
          height={artwork.height || 1024}
        />
      ) : (
        <div className="still-slot">Image not added yet.</div>
      )}
      {artwork.process.length > 0 ? (
        <p className="meta" style={{ marginTop: "0.8rem" }}>
          {artwork.process.join(" → ")}
        </p>
      ) : null}
    </>
  )
}
