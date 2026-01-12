"use client"

import { useEffect, useState } from "react"

export default function OfflineBanner() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)

    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)

    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  if (online) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        color: "white",
        zIndex: 9999,
        fontSize: 18,
        letterSpacing: 0.2,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520, padding: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Sem conexão</div>
        <div style={{ opacity: 0.9 }}>
          Verifique o Wi‑Fi/cabo de rede da TV Box e tente novamente.
        </div>
      </div>
    </div>
  )
}
