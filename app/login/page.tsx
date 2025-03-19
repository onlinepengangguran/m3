"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"
import config from "@/config/default/config"
import { setCookie } from "cookies-next"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simple authentication for demo purposes
    // In a real application, you would validate against a backend
    if (username === "admin" && password === "password") {
      // Set login state
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)

      // Set cookie for middleware
      setCookie("isLoggedIn", "true", { maxAge: 60 * 60 * 24 }) // 24 hours

      // Redirect to admin page
      router.push("/admin/config")
    } else {
      setError("Invalid username or password")
    }

    setLoading(false)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="download-section p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">{config.site_name} Admin</h1>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-secondary">
            <p>Demo credentials: admin / password</p>
          </div>
        </div>
      </div>
    </div>
  )
}

