import { site } from "../../content"

export function Footer() {
  return (
    <footer className="site-footer" data-bg="black">
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
                <a href={link.to}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-label">Connect</h3>
          <ul className="footer-links">
            {Object.entries(site.socials).map(([key, href]) => (
              <li key={key}>
                <a href={href} target="_blank" rel="noreferrer">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
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
