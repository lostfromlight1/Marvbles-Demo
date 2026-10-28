import { Link } from "react-router-dom"

function Mark() {
  return (
    <>
      Explore
      <span className="ico" aria-hidden="true">
        <span className="out">→</span>
        <span className="in">→</span>
      </span>
    </>
  )
}

export function Explore({ to }: { to: string }) {
  return (
    <Link className="explore" to={to}>
      <Mark />
    </Link>
  )
}

export function ExploreMark() {
  return (
    <span className="explore">
      <Mark />
    </span>
  )
}
