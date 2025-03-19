import { type NextRequest, NextResponse } from "next/server"
import config from "@/config/default/config"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pageType = searchParams.get("type")

  let cacheControl = ""

  switch (pageType) {
    case "home":
      // Home page - cache for 24 hours
      cacheControl = `public, max-age=${config.cache_settings.home_page}, stale-while-revalidate=60`
      break
    case "search":
      // Search results - cache for 1 year
      cacheControl = `public, max-age=${config.cache_settings.search_page}, stale-while-revalidate=86400`
      break
    case "download":
      // Song details - cache forever
      cacheControl = `public, max-age=${config.cache_settings.download_page}, immutable`
      break
    default:
      // Default - no cache
      cacheControl = "no-store, max-age=0"
  }

  const response = NextResponse.json({ success: true, cacheControl })
  response.headers.set("Cache-Control", cacheControl)

  return response
}

