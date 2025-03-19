import { Music } from "lucide-react"
import config from "@/config/default/config"
import { searchSongs } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"
import SearchResults from "./SearchResults"

type Props = {
  params: { query: string }
}

// Set cache control headers using the revalidate property
export const revalidate = 31536000 // 1 year in seconds

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = decodeURIComponent(params.query)
  const songs = await searchSongs(query)

  return {
    title: config.search_title.replace("%query%", query).replace("%size%", songs.length.toString()),
    description: config.search_description.replace(/%query%/g, query).replace("%size%", songs.length.toString()),
    robots: config.search_robots,
  }
}

export default async function SearchPage({ params }: Props) {
  const query = decodeURIComponent(params.query)
  const songs = await searchSongs(query)

  return (
    <div className="container">
      <h1
        className="text-2xl md:text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: config.search_page_title.replace("%query%", query) }}
      />

      {songs.length === 0 ? (
        <div className="text-center py-10">
          <Music size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-secondary">
            We couldn't find any songs matching your search. Please try a different query.
          </p>
        </div>
      ) : (
        <SearchResults songs={songs} />
      )}

      <FloatingMenu />
    </div>
  )
}

