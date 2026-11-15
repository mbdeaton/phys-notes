import { useState } from "react";
import { Link } from "react-router-dom";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link
        className="site-title"
        to="/"
        onClick={() => setMenuOpen(false)}
      >
        Notes to a Young Physicist
      </Link>
      <div className="site-menu">
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenuOpen(false);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className="site-navigation"
          id="site-navigation"
          aria-label="Main navigation"
          hidden={!menuOpen}
        >
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
