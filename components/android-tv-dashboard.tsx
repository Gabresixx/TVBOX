"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import HeroVideo from "./hero-video"
import SideNavigation from "./side-navigation"
import ReflectiveAppGrid from "./reflective-app-grid"
import AIWidget from "./ai-widget"

type FocusSection = "nav" | "hero" | "apps"

export default function AndroidTVDashboard() {
  const [focusSection, setFocusSection] = useState<FocusSection>("hero")
  const [navIndex, setNavIndex] = useState(0)
  const [appIndex, setAppIndex] = useState(0)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalNavItems = 6
  const totalApps = 12
  const appsPerRow = 4
  const totalRows = Math.ceil(totalApps / appsPerRow)

  const scrollToFocusedRow = useCallback((row: number) => {
    if (containerRef.current) {
      const heroHeight = window.innerHeight * 0.6
      const rowHeight = 200
      const targetScroll = heroHeight + row * rowHeight - 100

      containerRef.current.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      })
    }
  }, [])

  const scrollToHero = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          if (focusSection === "apps") {
            const currentRowIndex = Math.floor(appIndex / appsPerRow)
            if (currentRowIndex === 0) {
              setFocusSection("hero")
              setCurrentRow(0)
              scrollToHero()
            } else {
              const newIndex = appIndex - appsPerRow
              setAppIndex(newIndex)
              const newRow = Math.floor(newIndex / appsPerRow)
              setCurrentRow(newRow)
              scrollToFocusedRow(newRow)
            }
          } else if (focusSection === "nav") {
            setNavIndex((prev) => (prev > 0 ? prev - 1 : totalNavItems - 1))
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (focusSection === "hero") {
            setFocusSection("apps")
            setAppIndex(0)
            setCurrentRow(0)
            scrollToFocusedRow(0)
          } else if (focusSection === "nav") {
            setNavIndex((prev) => (prev < totalNavItems - 1 ? prev + 1 : 0))
          } else if (focusSection === "apps") {
            const nextIndex = appIndex + appsPerRow
            if (nextIndex < totalApps) {
              setAppIndex(nextIndex)
              const newRow = Math.floor(nextIndex / appsPerRow)
              setCurrentRow(newRow)
              scrollToFocusedRow(newRow)
            }
          }
          break
        case "ArrowLeft":
          e.preventDefault()
          if (focusSection === "hero" || focusSection === "apps") {
            if (focusSection === "apps" && appIndex % appsPerRow > 0) {
              setAppIndex((prev) => prev - 1)
            } else {
              setFocusSection("nav")
              setIsNavExpanded(true)
            }
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (focusSection === "nav") {
            setFocusSection("hero")
            setIsNavExpanded(false)
          } else if (focusSection === "apps") {
            const posInRow = appIndex % appsPerRow
            if (posInRow < appsPerRow - 1 && appIndex < totalApps - 1) {
              setAppIndex((prev) => prev + 1)
            }
          }
          break
        case "Enter":
          e.preventDefault()
          break
      }
    },
    [focusSection, navIndex, appIndex, scrollToFocusedRow, scrollToHero, appsPerRow, totalApps, totalNavItems],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-x-hidden overflow-y-auto bg-background"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      tabIndex={0}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#050508] via-[#0a0a12] to-[#080810]" />

      {/* Side Navigation */}
      <SideNavigation
        activeIndex={navIndex}
        setActiveIndex={setNavIndex}
        isFocused={focusSection === "nav"}
        isExpanded={isNavExpanded}
        onExpandChange={setIsNavExpanded}
      />

      <div className="fixed top-8 right-8 z-50">
        <AIWidget />
      </div>

      {/* Main Content Area */}
      <main className={`relative transition-all duration-300 ${isNavExpanded ? "ml-72" : "ml-20"}`}>
        <section className="relative h-[60vh] min-h-[400px]">
          <HeroVideo isFocused={focusSection === "hero"} />
        </section>

        <section className="px-12 py-8 pb-32">
          <h2 className="mt-8 mb-10 text-2xl font-semibold text-foreground tracking-tight opacity-80">Seus Apps</h2>
          <ReflectiveAppGrid activeIndex={appIndex} setActiveIndex={setAppIndex} isFocused={focusSection === "apps"} />
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="surface-elevated flex items-center gap-4 rounded-2xl px-5 py-3">
          <div className="flex items-center gap-2">
            <kbd className="rounded-lg bg-white/10 px-2 py-1 text-xs text-muted-foreground">←</kbd>
            <span className="text-xs text-muted-foreground">Menu</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <kbd className="rounded-lg bg-white/10 px-2 py-1 text-xs text-muted-foreground">↑↓←→</kbd>
            <span className="text-xs text-muted-foreground">Navegar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
