"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Play, Tv, Music, Gamepad2, Youtube, Radio, Film, Podcast, Store, Globe, Camera, Mic } from "lucide-react"

interface App {
  id: number
  name: string
  icon: React.ReactNode
  gradient: string
}

const apps: App[] = [
  { id: 1, name: "Netflix", icon: <Play className="h-8 w-8" />, gradient: "from-red-600 to-red-800" },
  { id: 2, name: "Prime Video", icon: <Tv className="h-8 w-8" />, gradient: "from-sky-500 to-blue-700" },
  { id: 3, name: "Spotify", icon: <Music className="h-8 w-8" />, gradient: "from-green-500 to-green-700" },
  { id: 4, name: "Games", icon: <Gamepad2 className="h-8 w-8" />, gradient: "from-indigo-500 to-indigo-700" },
  { id: 5, name: "YouTube", icon: <Youtube className="h-8 w-8" />, gradient: "from-red-500 to-rose-700" },
  { id: 6, name: "Rádio", icon: <Radio className="h-8 w-8" />, gradient: "from-orange-500 to-amber-600" },
  { id: 7, name: "Disney+", icon: <Film className="h-8 w-8" />, gradient: "from-blue-600 to-indigo-800" },
  { id: 8, name: "Podcasts", icon: <Podcast className="h-8 w-8" />, gradient: "from-purple-500 to-fuchsia-700" },
  { id: 9, name: "Loja", icon: <Store className="h-8 w-8" />, gradient: "from-teal-500 to-cyan-700" },
  { id: 10, name: "Browser", icon: <Globe className="h-8 w-8" />, gradient: "from-slate-500 to-slate-700" },
  { id: 11, name: "Fotos", icon: <Camera className="h-8 w-8" />, gradient: "from-pink-500 to-rose-600" },
  { id: 12, name: "Assistente", icon: <Mic className="h-8 w-8" />, gradient: "from-cyan-400 to-blue-600" },
]

interface ReflectiveAppGridProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isFocused: boolean
}

export default function ReflectiveAppGrid({ activeIndex, setActiveIndex, isFocused }: ReflectiveAppGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const appRefs = useRef<(HTMLButtonElement | null)[]>([])

  return (
    <div className="grid grid-cols-4 gap-8">
      {apps.map((app, index) => {
        const isActive = isFocused && index === activeIndex
        const isHovered = hoveredIndex === index
        const shouldHighlight = isActive || isHovered

        return (
          <button
            key={app.id}
            ref={(el) => {
              appRefs.current[index] = el
            }}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col items-center py-4"
          >
            {/* Card Container */}
            <div
              className={`relative transition-transform duration-200 ${
                shouldHighlight ? "scale-110 -translate-y-2" : "scale-100"
              }`}
            >
              {/* Main Card */}
              <div
                className={`relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br ${app.gradient} text-white shadow-lg`}
              >
                <div className={`transition-transform duration-200 ${shouldHighlight ? "scale-110" : "scale-100"}`}>
                  {app.icon}
                </div>

                {/* Simplified shine effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-black/20" />

                {/* Focus Ring */}
                {isActive && (
                  <div className="absolute -inset-1.5 rounded-[1.75rem] ring-4 ring-white/70 ring-offset-2 ring-offset-background" />
                )}
              </div>

              {/* Simplified reflection */}
              <div
                className={`absolute -bottom-12 left-1/2 h-20 w-24 rounded-3xl bg-gradient-to-b from-white/5 to-transparent -translate-x-1/2 transition-opacity duration-200 ${
                  shouldHighlight ? "opacity-30" : "opacity-10"
                }`}
                style={{ transform: "translateX(-50%) scaleY(-0.3)" }}
              />
            </div>

            {/* App Name */}
            <span
              className={`mt-8 text-sm font-medium transition-colors duration-200 ${
                shouldHighlight ? "text-foreground" : "text-muted-foreground"
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
