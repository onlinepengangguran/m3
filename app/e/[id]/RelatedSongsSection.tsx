"use client"

import { Music } from "lucide-react"
import { useViewMode } from "@/contexts/ViewModeContext"
import ViewToggle from "@/components/ViewToggle"
import SongGrid from "@/components/SongGrid"
import SongList from "@/components/SongList"
import config from "@/config/default/config"

interface RelatedSongsSectionProps {
  relatedSongs: any[]
}

export default function RelatedSongsSection({ relatedSongs }: RelatedSongsSectionProps) {
  const { viewMode, setViewMode } = useViewMode()

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Music size={20} />
          Related Songs
        </h2>
        <ViewToggle onViewChange={setViewMode} initialView={viewMode} />
      </div>

      {viewMode === "grid" ? (
        <SongGrid songs={relatedSongs} downloadPermalink={config.download_permalink} />
      ) : (
        <SongList songs={relatedSongs} downloadPermalink={config.download_permalink} />
      )}
    </>
  )
}

