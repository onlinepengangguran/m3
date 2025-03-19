import NodeCache from "node-cache"
import config from "@/config/default/config"

class AGC {
  private cache: NodeCache
  private apiBaseUrl: string
  private fallbackSongs: any[]

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 }) // Cache for 1 hour
    this.apiBaseUrl = config.api_base_url
    this.fallbackSongs = config.fallback_songs
  }

  async getSearch(query: string) {
    const q = encodeURIComponent(query)
    const cacheKey = `search_${this.md5(q)}`
    let items = this.cache.get(cacheKey)

    if (!items) {
      try {
        const searchUrl = `${this.apiBaseUrl}/search?q=${q}`
        const response = await fetch(searchUrl)

        if (response.ok) {
          const text = await response.text()
          // Check if the response is valid JSON before parsing
          try {
            const searchArray = JSON.parse(text)
            items =
              searchArray.result?.map((item: any) => ({
                id: item.file_code,
                title: item.title,
                image: item.single_img,
                duration: item.length,
                views: item.views,
                uploaded: item.uploaded,
                splash_img: item.splash_img,
                canplay: item.canplay,
              })) || []

            this.cache.set(cacheKey, items)
          } catch (parseError) {
            console.error("JSON parse error:", parseError)
            return this.fallbackSongs
          }
        } else {
          console.error("API response not OK:", response.status)
          return this.fallbackSongs
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return this.fallbackSongs
      }
    }

    return items && items.length > 0 ? items : this.fallbackSongs
  }

  async getDownload(id: string) {
    const cacheKey = `download_${id}`
    let data = this.cache.get(cacheKey)

    if (!data) {
      try {
        const infoUrl = `${this.apiBaseUrl}/search?q=${id}`
        const response = await fetch(infoUrl)

        if (response.ok) {
          const text = await response.text()
          // Check if the response is valid JSON before parsing
          try {
            const infoArray = JSON.parse(text)
            if (infoArray.result?.[0]) {
              const result = infoArray.result[0]
              data = {
                id: result.filecode,
                title: result.title,
                image: result.single_img,
                duration: result.length,
                views: result.views,
                uploaded: result.uploaded,
                splash_img: result.splash_img,
                canplay: result.canplay,
                size: result.size,
                protected_embed: result.protected_embed,
              }

              this.cache.set(cacheKey, data)
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError)
            return this.getFallbackSong(id)
          }
        } else {
          console.error("API response not OK:", response.status)
          return this.getFallbackSong(id)
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return this.getFallbackSong(id)
      }
    }

    return data || this.getFallbackSong(id)
  }

  async getRelated(id: string) {
    const cacheKey = `related_${id}`
    let items = this.cache.get(cacheKey)

    if (!items) {
      try {
        const data = await this.getDownload(id)
        if (data) {
          const title = data.title.split(" ").slice(0, 3).join(" ")
          const searchUrl = `${this.apiBaseUrl}/search?q=${encodeURIComponent(title)}`
          const response = await fetch(searchUrl)

          if (response.ok) {
            const text = await response.text()
            // Check if the response is valid JSON before parsing
            try {
              const searchArray = JSON.parse(text)
              items =
                searchArray.result?.map((item: any) => ({
                  id: item.file_code,
                  title: item.title,
                  image: item.single_img,
                  duration: item.length,
                  views: item.views,
                  uploaded: item.uploaded,
                  splash_img: item.splash_img,
                  canplay: item.canplay,
                })) || []

              this.cache.set(cacheKey, items)
            } catch (parseError) {
              console.error("JSON parse error:", parseError)
              return this.fallbackSongs
            }
          } else {
            console.error("API response not OK:", response.status)
            return this.fallbackSongs
          }
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError)
        return this.fallbackSongs
      }
    }

    return items && items.length > 0 ? items : this.fallbackSongs
  }

  // New methods from data.ts
  async getTopSongs() {
    try {
      const songs = await this.getSearch("top songs")
      return songs
    } catch (error) {
      console.error("Error fetching top songs:", error)
      return this.fallbackSongs
    }
  }

  getRecentSearches() {
    return config.recent_searches
  }

  async getPlaylist(slug: string) {
    // Get playlist from config
    const playlistConfig = config.playlists[slug as keyof typeof config.playlists]

    if (playlistConfig) {
      // Get songs for the playlist
      const songs = await this.getTopSongs() // For now, use top songs for all playlists
      return {
        ...playlistConfig,
        songs,
      }
    }

    return null
  }

  getPage(slug: string) {
    // Get page from config
    return config.static_pages[slug as keyof typeof config.static_pages] || null
  }

  private getFallbackSong(id: string) {
    return {
      id,
      title: "Sample Song",
      image: "/placeholder.svg?height=480&width=640",
      duration: "3:45",
      views: "1.2M",
      uploaded: "2 months ago",
      description: "This is a sample song that's shown when the requested song couldn't be found.",
      size: "4.2 MB",
      protected_embed: false,
    }
  }

  private md5(str: string): string {
    // Simple hash function for demonstration purposes
    // In a production environment, use a proper cryptographic hash function
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }
}

export const agc = new AGC()

