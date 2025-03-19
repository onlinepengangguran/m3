"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Music } from "lucide-react"

interface SearchModalProps {
  onClose: () => void
  onSearch: (query: string) => void
}

export default function SearchModal({ onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load recent searches from localStorage
    try {
      const savedSearches = localStorage.getItem("recentSearches")
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    } catch (error) {
      console.error("Error loading recent searches:", error)
    }

    // Focus the input when modal opens
    inputRef.current?.focus()

    // Close modal on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Save to recent searches
      saveSearch(query)
      onSearch(query)
    }
  }

  const handleRecentSearchClick = (searchTerm: string) => {
    saveSearch(searchTerm)
    onSearch(searchTerm)
  }

  const saveSearch = (searchTerm: string) => {
    try {
      // Add to recent searches (avoid duplicates and limit to 5)
      const updatedSearches = [searchTerm, ...recentSearches.filter((item) => item !== searchTerm)].slice(0, 5)

      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
    } catch (error) {
      console.error("Error saving recent searches:", error)
    }
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="modal-title">Search Music</h2>
        <form onSubmit={handleSubmit} className="search-form mb-4">
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search for songs, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-button">
            <Search size={20} />
          </button>
        </form>

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Music size={16} className="mr-2" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(term)}
                  className="bg-background-card px-3 py-1 rounded-full hover:bg-primary-color hover:text-white transition-colors text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

