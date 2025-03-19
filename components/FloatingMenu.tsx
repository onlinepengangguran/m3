"use client"

import { useState, useCallback } from "react"
import { Home, User, Search, Info, Phone, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import SearchModal from "./SearchModal"
import ProfileModal from "./ProfileModal"
import { useMobile } from "@/hooks/use-mobile"
import config from "@/config/default/config"

export default function FloatingMenu() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMobile()

  const openSearchModal = () => {
    setSearchModalOpen(true)
  }

  const closeSearchModal = useCallback(() => {
    setSearchModalOpen(false)
  }, [])

  const openProfileModal = () => {
    setProfileModalOpen(true)
  }

  const closeProfileModal = useCallback(() => {
    setProfileModalOpen(false)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/${config.search_permalink.replace("%query%", encodeURIComponent(query))}`)
      closeSearchModal()
    }
  }

  // Check if user is logged in (for admin link visibility)
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"

  return (
    <>
      {isMobile ? (
        // Mobile floating menu - position based on config
        <div className="fab-menu-container">
          <Link href="/" className="fab-item" aria-label="Home">
            <Home size={20} />
          </Link>
          <button className="fab-item" onClick={openSearchModal} aria-label="Search">
            <Search size={20} />
          </button>
          <Link href="/page/about" className="fab-item" aria-label="About">
            <Info size={20} />
          </Link>
          <Link href="/page/contact" className="fab-item" aria-label="Contact">
            <Phone size={20} />
          </Link>
          <button className="fab-item" onClick={openProfileModal} aria-label="Profile">
            <User size={20} />
          </button>
          {isLoggedIn && (
            <Link href="/admin/config" className="fab-item" aria-label="Settings">
              <Settings size={20} />
            </Link>
          )}
        </div>
      ) : (
        // Desktop floating menu - position based on config
        <div className="desktop-floating-menu">
          <Link href="/" className={`desktop-menu-item ${pathname === "/" ? "active" : ""}`} aria-label="Home">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <button className="desktop-menu-item" onClick={openSearchModal} aria-label="Search">
            <Search size={20} />
            <span>Search</span>
          </button>
          <Link
            href="/page/about"
            className={`desktop-menu-item ${pathname === "/page/about" ? "active" : ""}`}
            aria-label="About"
          >
            <Info size={20} />
            <span>About</span>
          </Link>
          <Link
            href="/page/contact"
            className={`desktop-menu-item ${pathname === "/page/contact" ? "active" : ""}`}
            aria-label="Contact"
          >
            <Phone size={20} />
            <span>Contact</span>
          </Link>
          <button className="desktop-menu-item" onClick={openProfileModal} aria-label="Profile">
            <User size={20} />
            <span>Profile</span>
          </button>
          {isLoggedIn && (
            <Link
              href="/admin/config"
              className={`desktop-menu-item ${pathname === "/admin/config" ? "active" : ""}`}
              aria-label="Settings"
            >
              <Settings size={20} />
              <span>Config</span>
            </Link>
          )}
        </div>
      )}

      {searchModalOpen && <SearchModal onClose={closeSearchModal} onSearch={handleSearch} />}
      {profileModalOpen && <ProfileModal onClose={closeProfileModal} />}
    </>
  )
}

