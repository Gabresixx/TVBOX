"use client"

import type React from "react"

import { Home, Search, Film, Tv, Heart, Settings } from "lucide-react"

interface NavItem {
  id: number
  name: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 1, name: "Início", icon: <Home className="h-6 w-6" /> },
  { id: 2, name: "Buscar", icon: <Search className="h-6 w-6" /> },
  { id: 3, name: "Filmes", icon: <Film className="h-6 w-6" /> },
  { id: 4, name: "Séries", icon: <Tv className="h-6 w-6" /> },
  { id: 5, name: "Favoritos", icon: <Heart className="h-6 w-6" /> },
  { id: 6, name: "Ajustes", icon: <Settings className="h-6 w-6" /> },
]

interface SideNavigationProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isFocused: boolean
  isExpanded: boolean
  onExpandChange: (expanded: boolean) => void
}

export default function SideNavigation({
  activeIndex,
  setActiveIndex,
  isFocused,
  isExpanded,
  onExpandChange,
}: SideNavigationProps) {
  return (
    <nav
      className={`fixed left-0 top-0 z-50 h-full transition-all duration-300 ${isExpanded ? "w-72" : "w-20"}`}
      onMouseEnter={() => onExpandChange(true)}
      onMouseLeave={() => !isFocused && onExpandChange(false)}
    >
      <div
        className={`absolute inset-0 bg-surface-dark border-r border-border transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-px bg-border transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Logo */}
      <div className="relative flex h-24 items-center justify-center">
        <div
          className={`flex items-center gap-3 transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <span className="text-lg font-black text-white">TV</span>
          </div>
          {isExpanded && <span className="text-xl font-bold text-foreground tracking-tight">Android TV</span>}
        </div>
        {!isExpanded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/50 to-accent/50" />
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="relative mt-8 flex flex-col gap-2 px-3">
        {navItems.map((item, index) => {
          const isActive = isFocused && index === activeIndex
          const isSelected = index === activeIndex

          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`group relative flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isSelected
                    ? "bg-surface-light text-foreground"
                    : "text-muted-foreground hover:bg-surface-medium hover:text-foreground"
              }`}
            >
              {/* Icon - removed scale transform */}
              <div>{item.icon}</div>

              {/* Label */}
              <span
                className={`whitespace-nowrap font-medium transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.name}
              </span>

              {/* Active Indicator */}
              {isSelected && !isExpanded && (
                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* User Profile */}
      <div className="absolute bottom-8 left-0 right-0 px-3">
        <div
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-200 ${
            isExpanded ? "bg-surface-medium" : ""
          }`}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white">U</span>
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">Usuário</span>
              <span className="text-xs text-muted-foreground">Premium</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
