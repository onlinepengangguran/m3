"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import config from "@/config/default/config"

type ViewMode = "grid" | "list"

interface ViewModeContextType {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: ReactNode }) {
  // Initialize with default from config, but will be overridden by localStorage if available
  const [viewMode, setViewMode] = useState<ViewMode>((config.default_view_mode as ViewMode) || "grid")

  useEffect(() => {
    // Load user's preferred view mode from localStorage if available
    if (typeof window !== "undefined") {
      const savedViewMode = localStorage.getItem("preferredViewMode") as ViewMode | null
      if (savedViewMode) {
        setViewMode(savedViewMode)
      }
    }
  }, [])

  const updateViewMode = (mode: ViewMode) => {
    setViewMode(mode)
    // Save to localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredViewMode", mode)
    }
  }

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode: updateViewMode }}>{children}</ViewModeContext.Provider>
  )
}

export function useViewMode() {
  const context = useContext(ViewModeContext)
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider")
  }
  return context
}

