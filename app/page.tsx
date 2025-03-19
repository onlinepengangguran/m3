import ClientPage from "./ClientPage"
import config from "@/config/default/config"

// Server component for metadata
export const metadata = {
  title: config.home_title,
  description: config.home_description,
  robots: config.home_robots,
}

// Set cache control headers using the revalidate property
export const revalidate = 86400 // 24 hours in seconds

export default function Home() {
  return <ClientPage />
}

