"use client"

import { useEffect } from "react"
import config from "@/config/default/config"

export default function AdsScript() {
  useEffect(() => {
    try {
      // Create a script element
      const scriptElement = document.createElement("script")

      // Set script content to the ads script from config
      scriptElement.innerHTML = config.ads_script

      // Append to document head
      document.head.appendChild(scriptElement)

      // Clean up on unmount
      return () => {
        document.head.removeChild(scriptElement)
      }
    } catch (error) {
      console.error("Error injecting ads script:", error)
    }
  }, [])

  return null
}

