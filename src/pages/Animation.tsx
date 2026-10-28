import { Link } from "react-router-dom"
import { animations } from "../content"
import { usePageTitle } from "../ui/title"

export function Animation() {
  usePageTitle("Animation")

  return (
    <>
      <h1 className="page-title">Animation</h1>
      <p className="lede">Reels stay silent until a YouTube id is added. Dummy entries are not finished work.</p>
      {animations.length === 0 ? (
        <p className="empty">Nothing here yet.</p>
      ) : (
        <ul className="reel-grid">
          {animations.map((piece, index) => (
            <li key={piece.slug}>
              <Link to={`/animation/${piece.slug}`}>
                <span className="reel-poster">
                  {piece.poster ? (
                    <img src={piece.poster} alt={piece.dummy ? "Dummy poster" : piece.title} />
                  ) : (
                    <span className="gallery-empty">Poster not added yet.</span>
                  )}
                </span>
                <span className="reel-copy">
                  <span className="reel-title">
                    <span className="index-no">{String(index + 1).padStart(2, "0")}</span>
                    {piece.dummy ? "[Dummy] " : ""}
                    {piece.title}
                  </span>
                  <span className="meta">
                    {piece.credits.map((credit) => credit.role).join(" · ")}
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
