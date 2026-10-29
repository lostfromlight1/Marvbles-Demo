import { Link, useParams } from "react-router-dom"
import { YoutubePlayer } from "../components/media/YoutubePlayer"
import { animationBySlug, talentBySlug } from "../content"
import { usePageTitle } from "../ui/title"

export function AnimationDetail() {
  const { slug = "" } = useParams()
  const piece = animationBySlug(slug)
  usePageTitle(piece?.title ?? "Not found")

  if (!piece) {
    return (
      <>
        <h1 className="page-title">Not found</h1>
        <p className="lede">That reel is not in the collection.</p>
        <Link className="section-link" to="/animation">
          Back to Animation
        </Link>
      </>
    )
  }

  const names = piece.talentSlugs
    .map((slug) => talentBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name))

  return (
    <article>
      <Link className="section-link piece-back" to="/animation">
        Animation
      </Link>
      {piece.dummy ? <p className="meta">Dummy</p> : null}
      <h1 className="page-title">{piece.dummy ? "[Dummy] " : ""}{piece.title}</h1>
      {piece.poster ? (
        <img
          className="piece-poster"
          src={piece.poster}
          alt={piece.dummy ? "Dummy poster" : piece.title}
          width={1600}
          height={900}
        />
      ) : (
        <div className="still-slot">Poster not added yet.</div>
      )}
      <dl className="piece-credits">
        {piece.credits.map((credit) => (
          <div key={`${credit.role}-${credit.name}`}>
            <dt>{credit.role}</dt>
            <dd>{credit.name}</dd>
          </div>
        ))}
        {names.length > 0 ? (
          <div>
            <dt>Talent</dt>
            <dd>{names.join(", ")}</dd>
          </div>
        ) : null}
      </dl>
      {piece.storyboardFrames.length > 0 ? (
        <section className="piece-frames">
          <h2 className="content-title">Storyboard</h2>
          <ul>
            {piece.storyboardFrames.map((frame) => (
              <li key={frame}>
                <img src={frame} alt="Dummy storyboard frame" width={1600} height={900} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {piece.bts.length > 0 ? (
        <section className="piece-frames">
          <h2 className="content-title">Behind the scenes</h2>
          <ul>
            {piece.bts.map((frame) => (
              <li key={frame}>
                <img src={frame} alt="Dummy behind the scenes still" width={1600} height={900} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {piece.youtubeId ? (
        <YoutubePlayer youtubeId={piece.youtubeId} title={`${piece.title} video`} />
      ) : (
        <p className="empty piece-note">No YouTube id yet.</p>
      )}
    </article>
  )
}
