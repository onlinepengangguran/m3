"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { X, ArrowLeft, Search, Menu, Home, Music, Info, Phone } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import config from "@/config/default/config"

export default function Header() {
  const [query, setQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${config.search_permalink.replace("%query%", encodeURIComponent(query))}`)
      setSearchExpanded(false)
    }
  }

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
    setMenuOpen(false)
    // Focus the search input when expanded
    if (!searchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setSearchExpanded(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close search and menu when route changes
    setSearchExpanded(false)
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${searchExpanded ? "search-expanded" : ""}`}>
      <div className="header-content">
        {!searchExpanded && (
          <Link href="/" className="logo">
            {config.site_name}
          </Link>
        )}

        {searchExpanded && (
          <button className="mobile-search-toggle" onClick={toggleSearch} aria-label="Close search">
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for songs..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Search">
              <span className="sr-only">Search</span>
              <Search size={20} />
            </button>
          </form>
        </div>

        {!searchExpanded && (
          <nav className="hidden md:block">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                  <Home size={16} className="mr-1 inline-block" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/playlist/top-hits"
                  className={`nav-link ${pathname === "/playlist/top-hits" ? "active" : ""}`}
                >
                  <Music size={16} className="mr-1 inline-block" />
                  <span>Top Hits</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/page/about" className={`nav-link ${pathname === "/page/about" ? "active" : ""}`}>
                  <Info size={16} className="mr-1 inline-block" />
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/page/contact" className={`nav-link ${pathname === "/page/contact" ? "active" : ""}`}>
                  <Phone size={16} className="mr-1 inline-block" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex items-center">
          <button
            className="search-toggle-mobile md:hidden"
            onClick={toggleSearch}
            aria-label={searchExpanded ? "Close search" : "Open search"}
          >
            {searchExpanded ? <X size={24} /> : <Search size={24} />}
          </button>

          <button
            className="menu-toggle md:hidden ml-2"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden">
          <nav>
            <ul className="flex flex-col p-4 bg-background-card border-t border-border-color">
              <li className="py-2">
                <Link href="/" className={`flex items-center ${pathname === "/" ? "text-primary" : "text-secondary"}`}>
                  <Home size={20} className="mr-2" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  href="/playlist/top-hits"
                  className={`flex items-center ${pathname === "/playlist/top-hits" ? "text-primary" : "text-secondary"}`}
                >
                  <Music size={20} className="mr-2" />
                  <span>Top Hits</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  href="/page/about"
                  className={`flex items-center ${pathname === "/page/about" ? "text-primary" : "text-secondary"}`}
                >
                  <Info size={20} className="mr-2" />
                  <span>About</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  href="/page/contact"
                  className={`flex items-center ${pathname === "/page/contact" ? "text-primary" : "text-secondary"}`}
                >
                  <Phone size={20} className="mr-2" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

