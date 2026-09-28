"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Bookmark,
  Search,
  Compass,
  Clapperboard,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const GENRES = [
  [28, "Action"],
  [12, "Adventure"],
  [16, "Animation"],
  [35, "Comedy"],
  [80, "Crime"],
  [99, "Documentary"],
  [18, "Drama"],
  [14, "Fantasy"],
  [27, "Horror"],
  [9648, "Mystery"],
  [10749, "Romance"],
  [878, "Sci-Fi"],
  [53, "Thriller"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState(false);
  const [mobileGenres, setMobileGenres] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setGenres(false);
    setMobileGenres(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className="nav-link" href="/">
            <Compass size={15} />
            <span>Discover</span>
          </Link>

          <Link className="nav-link" href="/web-series">
            <Clapperboard size={15} />
            <span>Series</span>
          </Link>

          <div
            className="genre-wrap"
            onMouseEnter={() => setGenres(true)}
            onMouseLeave={() => setGenres(false)}
          >
            <button
              type="button"
              className="nav-link genre-trigger"
              onClick={() => setGenres((v) => !v)}
              aria-expanded={genres}
            >
              <span>Genres</span>
              <ChevronDown
                size={14}
                className={genres ? "rotate-180" : ""}
              />
            </button>

            {genres && (
              <div className="genre-menu">
                {GENRES.map(([id, name]) => (
                  <Link key={id} href={`/genre/${id}`}>
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link className="nav-link" href="/reading-list">
            <Bookmark size={15} />
            <span>My List</span>
          </Link>
        </nav>

        {/* Desktop / Tablet Actions */}
        <div className="nav-actions">
          <div className="nav-search">
            <SearchBar />
          </div>

          <Link
            href="/search"
            className="icon-btn desktop-icon"
            aria-label="Search"
          >
            <Search size={17} />
          </Link>

          <Link
            href="/reading-list"
            className="icon-btn desktop-icon"
            aria-label="My list"
          >
            <Bookmark size={17} />
          </Link>

          <div className="desktop-theme">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`mobile-menu-btn ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <>
          <div
            className="mobile-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="mobile-panel">
            {/* Mobile Search */}
            <div className="mobile-search">
              <SearchBar />
            </div>

            {/* Main Links */}
            <div className="mobile-section">
              <span className="mobile-section-label">Browse</span>

              <div className="mobile-links">
                <Link href="/">
                  <span className="mobile-link-icon">
                    <Compass size={17} />
                  </span>
                  <span>Discover</span>
                </Link>

                <Link href="/web-series">
                  <span className="mobile-link-icon">
                    <Clapperboard size={17} />
                  </span>
                  <span>Web Series</span>
                </Link>

                {/* Mobile Genres */}
                <button
                  type="button"
                  className="mobile-link mobile-genre-button"
                  onClick={() => setMobileGenres((v) => !v)}
                  aria-expanded={mobileGenres}
                >
                  <span className="mobile-link-left">
                    <span className="mobile-link-icon">
                      <Sparkles size={17} />
                    </span>
                    <span>Genres</span>
                  </span>

                  <ChevronDown
                    size={17}
                    className={mobileGenres ? "rotate-180" : ""}
                  />
                </button>

                {mobileGenres && (
                  <div className="mobile-genre-grid">
                    {GENRES.map(([id, name]) => (
                      <Link key={id} href={`/genre/${id}`}>
                        {name}
                      </Link>
                    ))}
                  </div>
                )}

                <Link href="/reading-list">
                  <span className="mobile-link-icon">
                    <Bookmark size={17} />
                  </span>
                  <span>My List</span>
                </Link>
              </div>
            </div>

            {/* Appearance */}
            <div className="mobile-theme">
              <div>
                <span className="mobile-section-label">Appearance</span>
                <strong>Theme</strong>
              </div>

              <ThemeToggle />
            </div>

            {/* Bottom CTA */}
            <Link
              href="/search"
              className="mobile-search-link"
            >
              <Search size={17} />
              <span>Explore movies & series</span>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}