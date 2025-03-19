"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw, AlertTriangle } from "lucide-react"

export default function ConfigEditor() {
  const [config, setConfig] = useState<any>(null)
  const [originalConfig, setOriginalConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Fetch the current configuration
    fetchConfig()
  }, [router])

  const fetchConfig = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/config")
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`)
      }

      const data = await response.json()
      setConfig(data)
      setOriginalConfig(JSON.parse(JSON.stringify(data))) // Deep copy
    } catch (err) {
      setError(`Error loading configuration: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setConfig({
      ...config,
      [key]: value,
    })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const response = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error(`Failed to save config: ${response.status}`)
      }

      const result = await response.json()
      setSuccess(`Configuration saved successfully! URL: ${result.url}`)
      setOriginalConfig(JSON.parse(JSON.stringify(config))) // Update original after save
    } catch (err) {
      setError(`Error saving configuration: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setConfig(JSON.parse(JSON.stringify(originalConfig))) // Reset to original
    setError("")
    setSuccess("")
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw size={40} className="animate-spin mx-auto mb-4 text-primary-color" />
            <p>Loading configuration...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Configuration Editor</h1>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4 flex items-start">
          <AlertTriangle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="download-section p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config &&
            Object.entries(config).map(([key, value]: [string, any]) => (
              <div key={key} className="mb-4">
                <label htmlFor={key} className="block text-sm font-medium mb-2">
                  {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                {typeof value === "string" ? (
                  <input
                    id={key}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full"
                  />
                ) : typeof value === "boolean" ? (
                  <select
                    id={key}
                    value={value.toString()}
                    onChange={(e) => handleInputChange(key, e.target.value === "true")}
                    className="w-full"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                ) : (
                  <div className="text-sm text-secondary">Complex value type - edit in JSON mode</div>
                )}
              </div>
            ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button type="button" onClick={handleReset} className="btn btn-secondary" disabled={saving}>
            Reset Changes
          </button>

          <button type="button" onClick={handleSave} className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>

      <div className="download-section p-6">
        <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
        <textarea
          value={config ? JSON.stringify(config, null, 2) : ""}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value)
              setConfig(parsed)
              setError("")
            } catch (err) {
              setError("Invalid JSON format")
            }
          }}
          className="w-full h-[400px] font-mono text-sm"
          spellCheck="false"
        />
      </div>
    </div>
  )
}

