"use client"

import { useState, useEffect } from "react"
import { Sparkles, Cloud, Sun, CloudRain, Snowflake, Wind, X } from "lucide-react"

interface WeatherData {
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy"
  temperature: number
  description: string
}

interface MovieSuggestion {
  title: string
  reason: string
  genre: string
}

const weatherMovieMap: Record<WeatherData["condition"], MovieSuggestion> = {
  sunny: { title: "Mamma Mia!", reason: "Dia ensolarado pede uma comédia musical alegre!", genre: "Comédia Musical" },
  cloudy: {
    title: "Blade Runner 2049",
    reason: "Céu nublado combina com ficção científica contemplativa.",
    genre: "Ficção Científica",
  },
  rainy: {
    title: "Singin' in the Rain",
    reason: "Chuva lá fora? Hora de um clássico aconchegante!",
    genre: "Musical Clássico",
  },
  snowy: { title: "Frozen II", reason: "Neve caindo? Perfeito para uma aventura gelada!", genre: "Animação" },
  windy: { title: "O Mágico de Oz", reason: "Ventos fortes pedem uma aventura mágica!", genre: "Fantasia Clássica" },
}

const weatherIcons = {
  sunny: <Sun className="h-5 w-5 text-yellow-400" />,
  cloudy: <Cloud className="h-5 w-5 text-gray-400" />,
  rainy: <CloudRain className="h-5 w-5 text-blue-400" />,
  snowy: <Snowflake className="h-5 w-5 text-cyan-300" />,
  windy: <Wind className="h-5 w-5 text-teal-400" />,
}

export default function AIWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    condition: "sunny",
    temperature: 24,
    description: "Ensolarado",
  })
  const [suggestion, setSuggestion] = useState<MovieSuggestion>(weatherMovieMap.sunny)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const simulateWeatherFetch = () => {
      setIsLoading(true)
      setTimeout(() => {
        const conditions: WeatherData["condition"][] = ["sunny", "cloudy", "rainy", "snowy", "windy"]
        const descriptions = {
          sunny: "Ensolarado",
          cloudy: "Nublado",
          rainy: "Chuvoso",
          snowy: "Nevando",
          windy: "Ventoso",
        }
        const temps = { sunny: 28, cloudy: 22, rainy: 18, snowy: 2, windy: 15 }

        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
        const newWeather: WeatherData = {
          condition: randomCondition,
          temperature: temps[randomCondition],
          description: descriptions[randomCondition],
        }

        setWeather(newWeather)
        setSuggestion(weatherMovieMap[randomCondition])
        setIsLoading(false)
      }, 1500)
    }

    simulateWeatherFetch()
  }, [])

  return (
    <div className="relative" onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        onFocus={() => setIsExpanded(true)}
        className={`
          surface-elevated flex items-center gap-3 rounded-full px-4 py-3 
          transition-opacity duration-200 hover:bg-surface-light
          ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium text-foreground">Sugestão IA</span>
        {!isLoading && weatherIcons[weather.condition]}
      </button>

      <div
        className={`
          absolute top-0 right-0 surface-elevated w-80 overflow-hidden rounded-3xl
          transition-all duration-200
          ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sugestão de IA</h3>
              <p className="text-xs text-muted-foreground">Baseada no clima</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-light text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Analisando clima...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-surface-light px-4 py-3">
                <div className="flex items-center gap-3">
                  {weatherIcons[weather.condition]}
                  <span className="text-sm font-medium text-foreground">{weather.description}</span>
                </div>
                <span className="text-lg font-bold text-foreground">{weather.temperature}°C</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary">
                    {suggestion.genre}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-foreground">{suggestion.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{suggestion.reason}</p>
              </div>

              <button className="w-full rounded-2xl bg-primary/20 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/30">
                Ver Detalhes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
