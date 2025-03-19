"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  title: string
  thumbnail?: string
  protected_embed: string // Added protected_embed prop
}

export default function VideoPlayer({ videoId, protected_embed, title, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="player-container">
      <div className="player-wrapper">
        {isPlaying ? (
          <iframe
            className="player-iframe"
            src={protected_embed}
            title={title}
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              style={{
                backgroundImage: `url(${thumbnail || "/placeholder.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
            <button onClick={handlePlay} className="play-button" aria-label={`Play ${title}`}>
              <Play size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
