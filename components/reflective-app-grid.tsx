"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Tv, Music, Gamepad2, Youtube, Radio, Film, Podcast, Store, Globe, Camera, Mic } from "lucide-react"

interface App {
  id: number
  name: string
  icon: React.ReactNode
  gradient: string
  shadowColor: string
}

const apps: App[] = [
  {
    id: 1,
    name: "Netflix",
    icon: <Play className="h-8 w-8" />,
    gradient: "from-red-600 to-red-800",
    shadowColor: "rgba(220, 38, 38, 0.4)",
  },
  {
    id: 2,
    name: "Prime Video",
    icon: <Tv className="h-8 w-8" />,
    gradient: "from-sky-500 to-blue-700",
    shadowColor: "rgba(14, 165, 233, 0.4)",
  },
  {
    id: 3,
    name: "Spotify",
    icon: <Music className="h-8 w-8" />,
    gradient: "from-green-500 to-green-700",
    shadowColor: "rgba(34, 197, 94, 0.4)",
  },
  {
    id: 4,
    name: "Games",
    icon: <Gamepad2 className="h-8 w-8" />,
    gradient: "from-indigo-500 to-indigo-700",
    shadowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: 5,
    name: "YouTube",
    icon: <Youtube className="h-8 w-8" />,
    gradient: "from-red-500 to-rose-700",
    shadowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    id: 6,
    name: "Rádio",
    icon: <Radio className="h-8 w-8" />,
    gradient: "from-orange-500 to-amber-600",
    shadowColor: "rgba(249, 115, 22, 0.4)",
  },
  {
    id: 7,
    name: "Disney+",
    icon: <Film className="h-8 w-8" />,
    gradient: "from-blue-600 to-indigo-800",
    shadowColor: "rgba(37, 99, 235, 0.4)",
  },
  {
    id: 8,
    name: "Podcasts",
    icon: <Podcast className="h-8 w-8" />,
    gradient: "from-purple-500 to-fuchsia-700",
    shadowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: 9,
    name: "Loja",
    icon: <Store className="h-8 w-8" />,
    gradient: "from-teal-500 to-cyan-700",
    shadowColor: "rgba(20, 184, 166, 0.4)",
  },
  {
    id: 10,
    name: "Browser",
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-slate-500 to-slate-700",
    shadowColor: "rgba(100, 116, 139, 0.4)",
  },
  {
    id: 11,
    name: "Fotos",
    icon: <Camera className="h-8 w-8" />,
    gradient: "from-pink-500 to-rose-600",
    shadowColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: 12,
    name: "Assistente",
    icon: <Mic className="h-8 w-8" />,
    gradient: "from-cyan-400 to-blue-600",
    shadowColor: "rgba(34, 211, 238, 0.4)",
  },
]

interface ReflectiveAppGridProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isFocused: boolean
}

export default function ReflectiveAppGrid({ activeIndex, setActiveIndex, isFocused }: ReflectiveAppGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const appRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isFocused && appRefs.current[activeIndex]) {
      appRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [activeIndex, isFocused])

  return (
    <div className="grid grid-cols-4 gap-8">
      {apps.map((app, index) => {
        const isActive = isFocused && index === activeIndex
        const isHovered = hoveredIndex === index
        const shouldHighlight = isActive || isHovered
        const row = Math.floor(index / 4)
        const col = index % 4
        const animationDelay = row * 50 + col * 30

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
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay}ms`,
            }}
          >
            {/* Card Container */}
            <div
              className={`relative ${shouldHighlight ? "scale-110 -translate-y-3 z-10" : "scale-100"}`}
              style={{
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Main Card */}
              <div
                className={`relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br ${app.gradient} text-white`}
                style={{
                  boxShadow: shouldHighlight
                    ? `0 20px 40px ${app.shadowColor}, 0 0 60px ${app.shadowColor}`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  className="transition-transform"
                  style={{
                    transform: shouldHighlight ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {app.icon}
                </div>

                {/* Glass Shine Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-white/5 to-transparent" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent" />

                {shouldHighlight && (
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Focus Ring - more subtle animation */}
                {isActive && (
                  <div
                    className="absolute -inset-1.5 rounded-[1.75rem] ring-4 ring-white/70 ring-offset-2 ring-offset-background"
                    style={{
                      animation: "pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                )}
              </div>

              {/* Dynamic Reflection - smoother transition */}
              <div
                className="absolute -bottom-14 left-1/2 h-24 w-28 rounded-3xl"
                style={{
                  background: `linear-gradient(to bottom, ${app.shadowColor}, transparent)`,
                  filter: "blur(16px)",
                  opacity: shouldHighlight ? 0.5 : 0.15,
                  transform: `translateX(-50%) scaleY(-0.4) ${shouldHighlight ? "scaleX(1.1)" : "scaleX(0.85)"}`,
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* App Name - smoother transition */}
            <span
              className="mt-8 text-sm font-medium"
              style={{
                color: shouldHighlight ? "var(--foreground)" : "var(--muted-foreground)",
                transform: shouldHighlight ? "scale(1.05)" : "scale(1)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {app.name}
            </span>
          </button>
        )
      })}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
