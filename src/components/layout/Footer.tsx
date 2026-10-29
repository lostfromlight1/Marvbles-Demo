import { Link, useLocation } from "react-router-dom"
import { site } from "../../content"

function isCurrent(to: string, pathname: string) {
  if (to === "/") return pathname === "/"
  return pathname === to || pathname.startsWith(`${to}/`)
}

function labelFor(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1)
}

export function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-wordmark">{site.name}</h2>
          <p>{site.footerNote}</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-label">Info</h3>
          <ul className="footer-links">
            {site.nav.map((link) => (
              <li key={link.label}>
                <Link to={link.to} aria-current={isCurrent(link.to, pathname) ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-label">Connect</h3>
          <ul className="footer-links">
            {Object.entries(site.socials).map(([key, href]) => (
              <li key={key}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {labelFor(key)}
                  </a>
                ) : (
                  <span>{labelFor(key)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a className="top-link" href="#content">
          Top
        </a>
      </div>
    </footer>
  )
}
