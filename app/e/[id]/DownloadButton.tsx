"use client"

import type React from "react"

import { Download } from "lucide-react"
import { useState } from "react"

type DownloadButtonProps = {
  link: string
  quality: string
  type: "mp3" | "video"
}

export default function DownloadButton({ link, quality, type }: DownloadButtonProps) {
  const [showLink, setShowLink] = useState(false)

  const handleDownloadClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    setShowLink(true)
  }

  return (
    <div>
      <a
        href={link}
        className={`btn ${type === "mp3" ? "btn-primary" : "btn-secondary"}`}
        download
        onClick={handleDownloadClick}
      >
        <Download size={16} />
        {type === "mp3" ? `Download MP3 (${quality})` : `Download Video (${quality})`}
      </a>
      {showLink && <div className="download-link">{link}</div>}
    </div>
  )
}

