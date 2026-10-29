import { Link, useParams } from "react-router-dom"
import { releases, talentBySlug } from "../content"
import { usePageTitle } from "../ui/title"

const socials = [
  { key: "youtube", label: "YouTube" },
  { key: "twitch", label: "Twitch" },
  { key: "x", label: "X" },
  { key: "tiktok", label: "TikTok" },
] as const

export function Talent() {
  const { slug = "" } = useParams()
  const talent = talentBySlug(slug)
  usePageTitle(talent?.name ?? "Not found")

  if (!talent) {
    return (
      <>
        <h1 className="page-title">Not found</h1>
        <p className="lede">That singer is not in the roster.</p>
        <Link className="section-link" to="/vsinger">
          Back to Vsinger
        </Link>
      </>
    )
  }

  const songs = releases.filter((release) => release.talentSlugs.includes(talent.slug))
  const portrait = talent.portrait || "/assets/ref/dummy-portrait.svg"
  const feature = songs.find((release) => release.jacket)

  return (
    <article className="talent-page">
      <header className="talent-hero">
        <p className="talent-kicker">{talent.unit}</p>
        <h1 className="page-title">{talent.dummy ? "[Dummy] " : ""}{talent.name}</h1>
        <div className="talent-hero-grid">
          <div className="talent-facts">
            <div>
              <p className="fact-label">/about</p>
              <p>{talent.bio || "Dummy bio."}</p>
            </div>
            <dl>
              <div>
                <dt className="fact-label">/oshi mark</dt>
                <dd>{talent.oshiMark || "Dummy"}</dd>
              </div>
              <div>
                <dt className="fact-label">/fan name</dt>
                <dd>{talent.fanName || "Dummy"}</dd>
              </div>
              <div>
                <dt className="fact-label">/birthday</dt>
                <dd>{talent.birthday || "Dummy"}</dd>
              </div>
              <div>
                <dt className="fact-label">/height</dt>
                <dd>{talent.height || "Dummy"}</dd>
              </div>
              <div>
                <dt className="fact-label">/color</dt>
                <dd>{talent.themeColor || "Dummy"}</dd>
              </div>
            </dl>
          </div>
          <figure className="talent-cutout">
            <img
              src={portrait}
              alt={talent.dummy && !talent.portrait ? "Dummy portrait" : talent.name}
              width={800}
              height={1000}
            />
            <figcaption>Dummy</figcaption>
          </figure>
        </div>
        <div className="talent-split">
          <div>
            <p className="fact-label">/debut</p>
            <p>{talent.debut || "Dummy"}</p>
            {feature ? (
              <Link className="talent-jacket" to={`/vsinger/release/${feature.slug}`}>
                <img
                  src={feature.jacket}
                  alt={feature.dummy ? "Dummy jacket" : feature.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                />
                <span>{feature.dummy ? "[Dummy] " : ""}{feature.title}</span>
              </Link>
            ) : (
              <p className="empty">Nothing here yet.</p>
            )}
          </div>
          <div>
            <p className="fact-label">/social</p>
            <ul className="talent-socials">
              {socials.map(({ key, label }) => {
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
        </div>
      </header>

      <section className="talent-subject">
        <h2 className="content-title">{talent.unit}</h2>
        <div className="talent-split">
          <div className="talent-facts">
            <div>
              <p className="fact-label">/subject</p>
              <p>{talent.dummy ? "[Dummy] " : ""}{talent.name}</p>
            </div>
            <div>
              <p className="fact-label">/languages</p>
              <p>{talent.languages.length > 0 ? talent.languages.join(", ") : "Dummy"}</p>
            </div>
            <div>
              <p className="fact-label">/profile</p>
              <p>Height: {talent.height || "Dummy"}</p>
              <p>Debut: {talent.debut || "Dummy"}</p>
            </div>
          </div>
          <div>
            {feature ? (
              <Link className="talent-jacket" to={`/vsinger/release/${feature.slug}`}>
                <img
                  src={feature.jacket}
                  alt={feature.dummy ? "Dummy jacket" : feature.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                />
                <span>{feature.dummy ? "[Dummy] " : ""}{feature.title}</span>
              </Link>
            ) : (
              <p className="empty">Nothing here yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="talent-bio">
        <h2 className="content-title">[ Detailed biography ]</h2>
        <p>{talent.lore || "Dummy lore."}</p>
      </section>

      <section className="talent-songs">
        <h2 className="content-title">Songs</h2>
        {songs.length === 0 ? (
          <p className="empty">Nothing here yet.</p>
        ) : (
          <ul className="page-list">
            {songs.map((release) => (
              <li key={release.slug}>
                <Link to={`/vsinger/release/${release.slug}`}>
                  {release.dummy ? "[Dummy] " : ""}
                  {release.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}
