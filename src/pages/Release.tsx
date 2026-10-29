import { Link, useParams } from "react-router-dom"
import { YoutubePlayer } from "../components/media/YoutubePlayer"
import { releaseBySlug, talentBySlug } from "../content"
import { usePageTitle } from "../ui/title"

export function Release() {
  const { slug = "" } = useParams()
  const release = releaseBySlug(slug)
  usePageTitle(release?.title ?? "Not found")

  if (!release) {
    return (
      <>
        <h1 className="page-title">Not found</h1>
        <Link className="section-link" to="/vsinger">
          Back to Vsinger
        </Link>
      </>
    )
  }

  const names = release.talentSlugs
    .map((item) => talentBySlug(item)?.name)
    .filter((name): name is string => Boolean(name))

  return (
    <>
      <h1 className="page-title">{release.dummy ? "[Dummy] " : ""}{release.title}</h1>
      <p className="lede">{names.join(", ") || "Singer not set."}</p>
      <p className="meta">{release.date || "Date not added yet."}</p>
      {release.jacket ? (
        <img
          className="artwork-still"
          src={release.jacket}
          alt={release.dummy ? "Dummy jacket" : release.title}
          width={1024}
          height={1024}
        />
      ) : null}
      <ul className="page-list">
        {release.credits.map((credit) => (
          <li key={`${credit.role}-${credit.name}`}>
            <span>
              {credit.role}: {credit.name}
            </span>
          </li>
        ))}
      </ul>
      {release.mvYoutubeId ? (
        <YoutubePlayer youtubeId={release.mvYoutubeId} title={`${release.title} music video`} />
      ) : (
        <div className="youtube-slot">No YouTube id yet.</div>
      )}
    </>
  )
}
