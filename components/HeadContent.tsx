"use client"

import config from "@/config/default/config"
import { usePathname } from "next/navigation"
import AdsScript from "./AdsScript"

export default function HeadContent() {
  const pathname = usePathname()
  const googleVerify = config.google_verify

  return (
    <>
      {googleVerify && <meta name="google-site-verification" content={googleVerify} />}
      {pathname === "/" && <meta name="robots" content={config.home_robots} />}
      {pathname?.startsWith("/f/") && <meta name="robots" content={config.search_robots} />}
      {pathname?.startsWith("/e/") && <meta name="robots" content={config.download_robots} />}
      {pathname?.startsWith("/page/") && <meta name="robots" content={config.page_robots} />}
      {pathname?.startsWith("/playlist/") && <meta name="robots" content={config.playlist_robots} />}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <meta name="theme-color" content="#0070f3" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <AdsScript />
    </>
  )
}

