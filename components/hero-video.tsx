"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Plus, Volume2, VolumeX, Info } from "lucide-react"

interface HeroVideoProps {
  isFocused: boolean
}

const featuredContent = {
  title: "The Last Frontier",
  subtitle: "Série Original",
  description:
    "Uma jornada épica através do desconhecido. Explore os limites da humanidade em uma aventura que desafia o tempo e o espaço.",
  year: "2024",
  rating: "16+",
  duration: "1h 45min",
}

export default function HeroVideo({ isFocused }: HeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div
      className={`relative h-[65vh] w-full overflow-hidden transition-all duration-700 ${
        isFocused ? "scale-[1.02]" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background with animated gradient fallback */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900/50 animate-gradient-shift" />
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-60"
          loop
          muted={isMuted}
          playsInline
          poster="/epic-cinematic-space-landscape.jpg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent h-32" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-12 pb-16">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">N</span>
            <span className="text-lg font-medium tracking-widest text-muted-foreground uppercase">
              {featuredContent.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-black tracking-tight text-foreground text-balance leading-none">
            {featuredContent.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-semibold text-green-400">98% relevante</span>
            <span>{featuredContent.year}</span>
            <span className="rounded border border-muted-foreground/50 px-2 py-0.5 text-xs">
              {featuredContent.rating}
            </span>
            <span>{featuredContent.duration}</span>
            <span className="rounded border border-muted-foreground/50 px-2 py-0.5 text-xs">4K</span>
            <span className="rounded border border-muted-foreground/50 px-2 py-0.5 text-xs">HDR</span>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl text-pretty">
            {featuredContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              className={`flex items-center gap-3 rounded-lg bg-foreground px-8 py-4 font-bold text-background transition-all duration-300 ${
                isFocused || isHovered ? "scale-105 shadow-2xl shadow-white/20" : ""
              }`}
            >
              <Play className="h-6 w-6 fill-current" />
              Assistir
            </button>
            <button className="glass-strong flex items-center gap-3 rounded-lg px-8 py-4 font-semibold text-foreground transition-all hover:bg-white/10">
              <Info className="h-6 w-6" />
              Mais Info
            </button>
            <button className="glass flex h-14 w-14 items-center justify-center rounded-full transition-all hover:bg-white/10">
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-12 right-12 glass flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-white/10"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Progress Bar (decorative) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div className="h-full w-1/3 bg-primary animate-progress" />
      </div>
    </div>
  )
}
