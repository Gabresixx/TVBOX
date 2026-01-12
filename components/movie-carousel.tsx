"use client"

import { useState, useEffect } from "react"
import { Play, Info, Star } from "lucide-react"

interface Movie {
  id: number
  title: string
  year: string
  rating: string
  genre: string
  description: string
  image: string
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Dune: Parte Dois",
    year: "2024",
    rating: "8.8",
    genre: "Ficção Científica",
    description:
      "Paul Atreides se une aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.",
    image: "/dune-desert-epic-movie-poster-cinematic.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: "2023",
    rating: "8.9",
    genre: "Drama Histórico",
    description: "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
    image: "/oppenheimer-movie-atomic-bomb-dramatic-cinematic.jpg",
  },
  {
    id: 3,
    title: "Interestelar",
    year: "2014",
    rating: "8.7",
    genre: "Ficção Científica",
    description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para salvar a humanidade.",
    image: "/interstellar-space-black-hole-cinematic-epic.jpg",
  },
  {
    id: 4,
    title: "O Senhor dos Anéis",
    year: "2001",
    rating: "9.0",
    genre: "Fantasia Épica",
    description:
      "Um hobbit e seus companheiros embarcam em uma jornada para destruir o Um Anel e salvar a Terra Média.",
    image: "/lord-of-the-rings-fantasy-mountain-epic-cinematic.jpg",
  },
  {
    id: 5,
    title: "Gladiador II",
    year: "2024",
    rating: "8.2",
    genre: "Ação Histórica",
    description: "A continuação épica da saga de honra e vingança no Império Romano.",
    image: "/gladiator-roman-colosseum-epic-action-cinematic.jpg",
  },
  {
    id: 6,
    title: "Avatar: O Caminho da Água",
    year: "2022",
    rating: "7.8",
    genre: "Ficção Científica",
    description: "Jake Sully e sua família enfrentam novos desafios enquanto exploram as regiões aquáticas de Pandora.",
    image: "/avatar-underwater-ocean-alien-world-cinematic-blue.jpg",
  },
]

interface MovieCarouselProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
  isFocused: boolean
}

export default function MovieCarousel({ activeIndex, setActiveIndex, isFocused }: MovieCarouselProps) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || isFocused) return
    const timer = setInterval(() => {
      setActiveIndex((activeIndex + 1) % movies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeIndex, isAutoPlaying, isFocused, setActiveIndex])

  const activeMovie = movies[activeIndex]

  return (
    <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      {/* Main Featured Movie */}
      <div
        className={`relative h-[480px] w-full overflow-hidden rounded-3xl transition-all duration-500 ${
          isFocused ? "ring-4 ring-primary ring-offset-4 ring-offset-background" : ""
        }`}
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${activeMovie.image})`,
            transform: `scale(${isFocused ? 1.02 : 1})`,
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end p-10">
          <div className="max-w-2xl space-y-4">
            {/* Genre & Rating */}
            <div className="flex items-center gap-4">
              <span className="glass rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
                {activeMovie.genre}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-foreground">{activeMovie.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{activeMovie.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold tracking-tight text-foreground text-balance">{activeMovie.title}</h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{activeMovie.description}</p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex items-center gap-2 rounded-2xl bg-foreground px-8 py-4 font-semibold text-background transition-transform hover:scale-105 active:scale-95">
                <Play className="h-5 w-5 fill-current" />
                Assistir
              </button>
              <button className="glass-strong flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold text-foreground transition-transform hover:scale-105 active:scale-95">
                <Info className="h-5 w-5" />
                Mais Informações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-6 flex justify-center gap-3">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-36 overflow-hidden rounded-xl transition-all duration-300 ${
              index === activeIndex
                ? "scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </button>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
