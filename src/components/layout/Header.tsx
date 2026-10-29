import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { site } from "../../content"

const links = [{ label: "Top", to: "/" }, ...site.nav]

function isCurrent(to: string, pathname: string) {
  if (to === "/") return pathname === "/"
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const close = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", close)
    return () => desktop.removeEventListener("change", close)
  }, [])

  useEffect(() => {
    const main = document.getElementById("content")
    const footer = document.querySelector("footer")
    document.body.classList.toggle("menued", open)
    if (main) main.inert = open
    if (footer instanceof HTMLElement) footer.inert = open

    if (open) {
      menuRef.current?.querySelector<HTMLElement>("a")?.focus()
    } else if (wasOpen.current) {
      buttonRef.current?.focus()
    }
    wasOpen.current = open

    if (!open) {
      return () => {
        document.body.classList.remove("menued")
        if (main) main.inert = false
        if (footer instanceof HTMLElement) footer.inert = false
      }
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== "Tab") return
      const menu = menuRef.current
      const button = buttonRef.current
      if (!menu || !button) return
      const cycle = [...menu.querySelectorAll<HTMLElement>("a"), button]
      const first = cycle[0]
      const last = cycle[cycle.length - 1]
      const active = document.activeElement
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !cycle.includes(active as HTMLElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.classList.remove("menued")
      if (main) main.inert = false
      if (footer instanceof HTMLElement) footer.inert = false
    }
  }, [open])

  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-current={isCurrent("/", location.pathname) ? "page" : undefined}>
        {site.name}
      </Link>
      <nav className="header-nav" aria-label="Primary">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isCurrent(item.to, location.pathname) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        ref={buttonRef}
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
      <nav ref={menuRef} id="menu-area" className="menu-overlay" aria-label="Menu" hidden={!open}>
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isCurrent(item.to, location.pathname) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
