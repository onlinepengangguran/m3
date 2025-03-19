"use client"

import { useEffect, useState } from "react"
import { X, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProfileModalProps {
  onClose: () => void
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      setUsername(localStorage.getItem("username") || "User")
    }

    // Close modal on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    onClose()
    router.refresh()
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="modal-title">User Profile</h2>

        {isLoggedIn ? (
          <div>
            <p className="mb-4">
              Welcome, <strong>{username}</strong>!
            </p>
            <div className="flex justify-between">
              <Link href="/admin/config" className="btn btn-secondary" onClick={onClose}>
                Settings
              </Link>
              <button className="btn btn-primary" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4">Sign in to access your personalized content and settings.</p>
            <div className="flex justify-center">
              <Link href="/login" className="btn btn-primary" onClick={onClose}>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

