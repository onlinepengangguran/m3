import { getSongById } from "@/lib/data"
import config from "@/config/default/config"
import type { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const song = await getSongById(params.id)

  if (!song) {
    return {
      title: "Song not found",
      description: "The requested song could not be found.",
    }
  }

  return {
    title: config.download_title.replace("%title%", song.title),
    description: config.download_description.replace(/%title%/g, song.title).replace("%size%", song.size || ""),
    robots: config.download_robots,
  }
}

