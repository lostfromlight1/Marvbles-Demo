import { site, talents } from "../content"
import { usePageTitle } from "../ui/title"

export function About() {
  usePageTitle("About")

  return (
    <>
      <h1 className="page-title">About</h1>
      <p className="lede">{site.story}</p>
      <div className="about-units">
        {["Eonica", "Nox"].map((unit) => (
          <p key={unit}>
            {unit}: {talents.filter((talent) => talent.unit === unit && !talent.dummy).map((talent) => talent.name).join(", ")}.
          </p>
        ))}
      </div>
    </>
  )
}
