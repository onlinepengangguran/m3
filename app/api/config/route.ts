import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import config from "@/config/default/config"

export async function GET() {
  return NextResponse.json(config)
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated (in a real app, use proper auth)
    // For demo purposes, we'll skip this check

    // Get the updated config from the request
    const updatedConfig = await request.json()

    // Convert to JSON string with pretty formatting
    const configJson = JSON.stringify(updatedConfig, null, 2)

    // Save to Vercel Blob
    const blob = await put("config.json", configJson, {
      contentType: "application/json",
      access: "public",
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error) {
    console.error("Error saving config:", error)
    return NextResponse.json({ error: "Failed to save configuration", details: String(error) }, { status: 500 })
  }
}

