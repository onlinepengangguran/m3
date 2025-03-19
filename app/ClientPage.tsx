"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Music, Headphones, TrendingUp, Search } from "lucide-react"
import config from "@/config/default/config"
import { getTopSongs, getRecentSearches } from "@/lib/data"
import FloatingMenu from "@/components/FloatingMenu"
import ViewToggle from "@/components/ViewToggle"
import { useViewMode } from "@/contexts/ViewModeContext"
import SongGrid from "@/components/SongGrid"
import SongList from "@/components/SongList"

export default function ClientPage() {
  const { viewMode, setViewMode } = useViewMode()
  const [topSongs, setTopSongs] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Fetch data on client side
  useEffect(() => {
    async function fetchData() {
      const songs = await getTopSongs()
      const searches = await getRecentSearches()
      setTopSongs(songs)
      setRecentSearches(searches)
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <section className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{config.home_title}</h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-secondary">{config.home_description}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="feature-card">
          <div className="feature-icon">
            <Music size={36} />
          </div>
          <h2 className="feature-title">Huge Collection</h2>
          <p className="feature-description">Access thousands of songs and videos from various artists and genres.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Headphones size={36} />
          </div>
          <h2 className="feature-title">High Quality</h2>
          <p className="feature-description">Download MP3 files with the best audio quality available.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <TrendingUp size={36} />
          </div>
          <h2 className="feature-title">Latest Releases</h2>
          <p className="feature-description">Stay updated with the newest music releases and trending songs.</p>
        </div>
      </section>

      <section className="mb-8">
        <div className="section-header">
          <h2 className="section-title">
            <TrendingUp size={20} />
            Top Songs
          </h2>
          <ViewToggle onViewChange={setViewMode} initialView={viewMode} />
        </div>

        {viewMode === "grid" ? (
          <SongGrid songs={topSongs} downloadPermalink={config.download_permalink} />
        ) : (
          <SongList songs={topSongs} downloadPermalink={config.download_permalink} />
        )}
      </section>

      {recentSearches.length > 0 && (
        <section>
          <h2 className="section-title">
            <Search size={20} />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search: string, index: number) => (
              <Link
                key={index}
                href={`/${config.search_permalink.replace("%query%", encodeURIComponent(search))}`}
                className="search-tag"
              >
                {search}
              </Link>
            ))}
          </div>
        </section>
      )}

      <FloatingMenu />
    </div>
  )
}

