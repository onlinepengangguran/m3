import Link from "next/link"

interface SongListProps {
  songs: any[]
  downloadPermalink: string
}

export default function SongList({ songs, downloadPermalink }: SongListProps) {
  return (
    <div className="video-list">
      {songs.map((song: any) => (
        <Link key={song.id} href={`/${downloadPermalink.replace("%id%", song.id)}`} className="list-item">
          <div className="list-thumbnail">
            <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
            {song.duration && <div className="video-duration">{song.duration}</div>}
          </div>
          <div className="list-info">
            <h3 className="list-title">{song.title}</h3>
            <div className="list-meta">
              {song.views && <span className="list-views">{song.views} views</span>}
              {song.uploaded && <span className="list-date">{song.uploaded}</span>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

