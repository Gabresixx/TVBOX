"use client"

import type React from "react"

import { useState } from "react"
import { Tv, Film, Music, Gamepad2, Settings, Search, ShoppingBag, Cloud } from "lucide-react"

interface App {
  id: number
  name: string
  icon: React.ReactNode
  color: string
  gradient: string
}

const apps: App[] = [
  {
    id: 1,
    name: "TV+",
    icon: <Tv className="h-10 w-10" />,
    color: "#000000",
    gradient: "from-gray-800 to-gray-900",
  },
  {
    id: 2,
    name: "Filmes",
    icon: <Film className="h-10 w-10" />,
    color: "#ef4444",
    gradient: "from-red-500 to-red-700",
  },
  {
    id: 3,
    name: "Música",
    icon: <Music className="h-10 w-10" />,
    color: "#ec4899",
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: 4,
    name: "Games",
    icon: <Gamepad2 className="h-10 w-10" />,
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-700",
  },
  {
    id: 5,
    name: "Busca",
    icon: <Search className="h-10 w-10" />,
    color: "#6b7280",
    gradient: "from-gray-500 to-gray-700",
  },
  {
    id: 6,
    name: "Loja",
    icon: <ShoppingBag className="h-10 w-10" />,
    color: "#0ea5e9",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: 7,
    name: "Cloud",
    icon: <Cloud className="h-10 w-10" />,
    color: "#14b8a6",
    gradient: "from-teal-400 to-cyan-600",
  },
  {
    id: 8,
    name: "Ajustes",
    icon: <Settings className="h-10 w-10" />,
    color: "#71717a",
    gradient: "from-zinc-500 to-zinc-700",
  },
]

interface AppRowProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isFocused: boolean
}

export default function AppRow({ activeIndex, setActiveIndex, isFocused }: AppRowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex justify-center gap-6">
      {apps.map((app, index) => {
        const isActive = isFocused && index === activeIndex
        const isHovered = hoveredIndex === index
        const shouldZoom = isActive || isHovered

        return (
          <button
            key={app.id}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex flex-col items-center gap-3 transition-all duration-300 ${
              shouldZoom ? "scale-125 z-10" : "scale-100"
            }`}
          >
            {/* App Icon */}
            <div
              className={`relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${app.gradient} text-white shadow-2xl transition-all duration-300 ${
                isActive ? "ring-4 ring-primary ring-offset-4 ring-offset-background shadow-primary/30" : ""
              } ${shouldZoom ? "shadow-2xl" : "shadow-lg"}`}
            >
              {app.icon}

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

              {/* Reflection */}
              <div className="absolute -bottom-8 left-1/2 h-16 w-20 -translate-x-1/2 rounded-3xl bg-gradient-to-br from-white/5 to-transparent blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* App Name */}
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                shouldZoom ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {app.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
