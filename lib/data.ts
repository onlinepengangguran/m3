import { agc } from "./agc"
//import { syairService } from "./syair"

// Fallback data in case the API fails
const fallbackSongs = [
  {
    id: "sample1",
    title: "Sample Song 1",
    image: "/placeholder.svg?height=480&width=640",
    duration: "3:45",
    views: "1.2M",
    uploaded: "2 months ago",
    description: "This is a sample song description.",
  },
  {
    id: "sample2",
    title: "Sample Song 2",
    image: "/placeholder.svg?height=480&width=640",
    duration: "4:20",
    views: "850K",
    uploaded: "1 month ago",
    description: "Another sample song description.",
  },
  {
    id: "sample3",
    title: "Sample Song 3",
    image: "/placeholder.svg?height=480&width=640",
    duration: "3:15",
    views: "2.1M",
    uploaded: "3 months ago",
    description: "Yet another sample song description.",
  },
]

export async function getTopSongs() {
  return agc.getTopSongs()
}

export async function getRecentSearches() {
  return agc.getRecentSearches()
}

export async function searchSongs(query: string) {
  return agc.getSearch(query)
}

export async function getSongById(id: string) {
  return agc.getDownload(id)
}

export async function getRelatedSongs(id: string) {
  return agc.getRelated(id)
}

export async function getPlaylist(slug: string) {
  return agc.getPlaylist(slug)
}

export async function getPage(slug: string) {
  return agc.getPage(slug)
}

export async function getPopularSyair(limit = 10) {
  try {
    //return await syairService.getPopularSyair(limit)
    return []
  } catch (error) {
    console.error(`Error getting popular syair:`, error)
    return []
  }
}

