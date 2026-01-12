"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import MovieCarousel from "./movie-carousel"
import AppRow from "./app-row"
import AIWidget from "./ai-widget"

type FocusSection = "carousel" | "apps"

export default function TVDashboard() {
  const [focusSection, setFocusSection] = useState<FocusSection>("carousel")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [appIndex, setAppIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalMovies = 6
  const totalApps = 8

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          if (focusSection === "apps") {
            setFocusSection("carousel")
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (focusSection === "carousel") {
            setFocusSection("apps")
          }
          break
        case "ArrowLeft":
          e.preventDefault()
          if (focusSection === "carousel") {
            setCarouselIndex((prev) => (prev > 0 ? prev - 1 : totalMovies - 1))
          } else {
            setAppIndex((prev) => (prev > 0 ? prev - 1 : totalApps - 1))
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (focusSection === "carousel") {
            setCarouselIndex((prev) => (prev < totalMovies - 1 ? prev + 1 : 0))
          } else {
            setAppIndex((prev) => (prev < totalApps - 1 ? prev + 1 : 0))
          }
          break
        case "Enter":
          e.preventDefault()
          console.log(`[v0] Selected ${focusSection === "carousel" ? `movie ${carouselIndex}` : `app ${appIndex}`}`)
          break
      }
    },
    [focusSection, carouselIndex, appIndex],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-background" tabIndex={0}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#0a0a0f] to-[#0d0d14]" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />
      </div>

      {/* AI Widget - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <AIWidget />
      </div>

      {/* Main Content */}
      <main className="relative flex flex-col gap-8 px-12 py-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="glass-strong flex h-12 w-12 items-center justify-center rounded-2xl">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-foreground" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-foreground">TV</span>
          </div>

          {/* Time */}
          <div className="glass rounded-2xl px-6 py-3">
            <TimeDisplay />
          </div>
        </header>

        {/* Movie Carousel */}
        <section className="mt-4">
          <MovieCarousel
            activeIndex={carouselIndex}
            setActiveIndex={setCarouselIndex}
            isFocused={focusSection === "carousel"}
          />
        </section>

        {/* App Row */}
        <section className="mt-8">
          <h2 className="mb-6 text-xl font-medium text-muted-foreground">Apps</h2>
          <AppRow activeIndex={appIndex} setActiveIndex={setAppIndex} isFocused={focusSection === "apps"} />
        </section>

        {/* Navigation Hint */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <div className="glass flex items-center gap-6 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <kbd className="rounded-lg bg-white/10 px-2 py-1 text-xs text-muted-foreground">←→</kbd>
              <span className="text-xs text-muted-foreground">Navegar</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <kbd className="rounded-lg bg-white/10 px-2 py-1 text-xs text-muted-foreground">↑↓</kbd>
              <span className="text-xs text-muted-foreground">Seção</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <kbd className="rounded-lg bg-white/10 px-2 py-1 text-xs text-muted-foreground">Enter</kbd>
              <span className="text-xs text-muted-foreground">Selecionar</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-lg font-medium tabular-nums text-foreground">
      {time.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  )
}
