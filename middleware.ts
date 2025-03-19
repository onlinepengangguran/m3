import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import appConfig from "@/config/default/config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Check if the request is for an admin route
  if (pathname.startsWith("/admin")) {
    // In a real application, you would verify the session/token here
    // For this demo, we'll just check for the presence of a cookie
    const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"

    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Add cache-control headers based on the route
  if (pathname === "/") {
    // Home page - cache for 24 hours
    response.headers.set(
      "Cache-Control",
      `public, max-age=${appConfig.cache_settings.home_page}, stale-while-revalidate=60`,
    )
  } else if (pathname.startsWith("/f/")) {
    // Search results - cache for 1 year
    response.headers.set(
      "Cache-Control",
      `public, max-age=${appConfig.cache_settings.search_page}, stale-while-revalidate=86400`,
    )
  } else if (pathname.startsWith("/e/")) {
    // Song details - cache forever
    response.headers.set("Cache-Control", `public, max-age=${appConfig.cache_settings.download_page}, immutable`)
  }

  return response
}

// This is the correct way to export middleware configuration
export const config = {
  matcher: ["/admin/:path*", "/", "/f/:path*", "/e/:path*"],
}

