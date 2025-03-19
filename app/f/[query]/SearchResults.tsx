"use client"

import { useViewMode } from "@/contexts/ViewModeContext"
import ViewToggle from "@/components/ViewToggle"
import SongGrid from "@/components/SongGrid"
import SongList from "@/components/SongList"
import config from "@/config/default/config"

interface SearchResultsProps {
  songs: any[]
}

export default function SearchResults({ songs }: SearchResultsProps) {
  const { viewMode, setViewMode } = useViewMode()

  return (
    <>
      <div className="section-header mb-4">
        <div className="flex-1"></div>
        <ViewToggle onViewChange={setViewMode} initialView={viewMode} />
      </div>

      {viewMode === "grid" ? (
        <SongGrid songs={songs} downloadPermalink={config.download_permalink} />
      ) : (
        <SongList songs={songs} downloadPermalink={config.download_permalink} />
      )}
    </>
  )
}

