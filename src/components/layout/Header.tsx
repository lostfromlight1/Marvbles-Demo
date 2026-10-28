import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { site } from "../../content"

const links = [{ label: "Top", to: "/" }, ...site.nav]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle("menued", open)
    return () => document.body.classList.remove("menued")
  }, [open])

  return (
    <header className="site-header">
      <Link to="/" className="wordmark">
        {site.name}
      </Link>
      <nav className="header-nav" aria-label="Primary">
        {links.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls="menu-area"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="menu-area" className="menu-overlay" aria-label="Menu" hidden={!open}>
        {links.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
