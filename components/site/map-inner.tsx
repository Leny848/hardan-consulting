'use client'

import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'

/**
 * Self-contained Leaflet map.
 *
 * Leaflet is imported lazily with `await import('leaflet')` inside the effect so
 * it never executes during SSR (Leaflet touches `window` at module load). This
 * avoids `next/dynamic` bailout issues while still being fully client-only.
 */
export default function MapInner({
  lat,
  lng,
  label,
  address,
}: {
  lat: number
  lng: number
  label: string
  address: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<LeafletMarker | null>(null)
  const [ready, setReady] = useState(false)

  // Create the map once, after mount.
  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    async function init() {
      const L = (await import('leaflet')).default
      if (cancelled || !containerRef.current || mapRef.current) return

      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 13,
        scrollWheelZoom: false,
      })
      mapRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      markerRef.current = L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${label}</strong><br/>${address}`)

      const invalidate = () => map.invalidateSize()
      const t = setTimeout(invalidate, 300)
      window.addEventListener('resize', invalidate)

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) invalidate()
        },
        { threshold: 0.1 },
      )
      if (containerRef.current) observer.observe(containerRef.current)

      setReady(true)

      cleanup = () => {
        clearTimeout(t)
        window.removeEventListener('resize', invalidate)
        observer.disconnect()
        map.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }

    init()

    return () => {
      cancelled = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Recenter and move the marker when the location changes (from the admin panel).
  useEffect(() => {
    const map = mapRef.current
    const marker = markerRef.current
    if (!map || !marker) return
    map.setView([lat, lng], map.getZoom(), { animate: true })
    marker.setLatLng([lat, lng])
    marker.setPopupContent(`<strong>${label}</strong><br/>${address}`)
  }, [lat, lng, label, address])

  return (
    <div className="relative size-full">
      {!ready && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-secondary text-sm text-muted-foreground">
          Loading map…
        </div>
      )}
      <div ref={containerRef} className="size-full" />
    </div>
  )
}
