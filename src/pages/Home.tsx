import { Link } from "react-router-dom"
import { DiscographyReel } from "../components/media/DiscographyReel"
import { YoutubePlayer } from "../components/media/YoutubePlayer"
import { UnitRoster } from "../components/ui/UnitRoster"
import { releases, site, talents } from "../content"
import { usePageTitle } from "../ui/title"

export function Home() {
  usePageTitle(site.name)

  return (
    <div className="home">
      <section className="visual">
        <h1 className="hero-mark">{site.name}</h1>
        <p className="hero-line">Music, illustration, animation</p>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll down</span>
          <span className="line" />
        </div>
      </section>

      <section className="block mv-block" id="video" aria-label="Demo music video">
        <YoutubePlayer
          youtubeId={site.demoVideo.youtubeId}
          title={`${site.demoVideo.title} by ${site.demoVideo.credit}`}
        />
        <p className="mv-credit">
          Demo.{" "}
          <a href={site.demoVideo.href} target="_blank" rel="noreferrer">
            {site.demoVideo.title}
          </a>{" "}
          by {site.demoVideo.credit}.
        </p>
      </section>

      <section className="block" id="works">
        <div className="content-inner">
          <h2 className="content-title">Works</h2>
          {releases.length === 0 ? (
            <p className="empty">Nothing here yet.</p>
          ) : (
            <DiscographyReel releases={releases} />
          )}
          <Link className="section-link" to="/vsinger">
            All releases
          </Link>
        </div>
      </section>

      <section className="block" id="artists">
        <div className="content-inner">
          <UnitRoster unit="Eonica" talents={talents} />
          <UnitRoster unit="Nox" talents={talents} />
        </div>
      </section>
    </div>
  )
}
