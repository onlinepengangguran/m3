import { RefreshCw } from "lucide-react"

interface LoadingIndicatorProps {
  message?: string
}

export default function LoadingIndicator({ message = "Loading..." }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <RefreshCw size={40} className="animate-spin mx-auto mb-4 text-primary-color" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  )
}

