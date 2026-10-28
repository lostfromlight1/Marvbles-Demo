import { Link } from "react-router-dom"
import { usePageTitle } from "../ui/title"

export function NotFound() {
  usePageTitle("Not found")

  return (
    <>
      <h1 className="page-title">Not found</h1>
      <p className="lede">That page is not on this site.</p>
      <Link className="section-link" to="/">
        Back home
      </Link>
    </>
  )
}