"use client"

import { useEffect } from "react"
import { Grid, List } from "lucide-react"
import { useViewMode } from "@/contexts/ViewModeContext"

interface ViewToggleProps {
  onViewChange: (view: "grid" | "list") => void
  initialView?: "grid" | "list"
}

export default function ViewToggle({ onViewChange }: ViewToggleProps) {
  const { viewMode, setViewMode } = useViewMode()

  const toggleView = (newView: "grid" | "list") => {
    setViewMode(newView)
  }

  useEffect(() => {
    // Notify parent of view mode changes
    onViewChange(viewMode)
  }, [onViewChange, viewMode])

  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
        onClick={() => toggleView("grid")}
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
      >
        <Grid size={18} />
      </button>
      <button
        className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
        onClick={() => toggleView("list")}
        aria-label="List view"
        aria-pressed={viewMode === "list"}
      >
        <List size={18} />
      </button>
    </div>
  )
}

