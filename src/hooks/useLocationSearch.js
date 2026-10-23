import { useState, useRef, useCallback } from 'react'

export default function useLocationSearch(setLocationData) {
  const [locationSearch, setLocationSearch] = useState({ query: '', results: [] })
  const searchTimeoutRef = useRef(null)
  const requestIdRef = useRef(0)

  const handleLocationSearch = useCallback((query) => {
    setLocationSearch(s => ({ ...s, query }))
    clearTimeout(searchTimeoutRef.current)
    if (query.trim().length < 3) {
      setLocationSearch(s => ({ ...s, results: [] }))
      return
    }
    searchTimeoutRef.current = setTimeout(async () => {
      // Stale responses must not overwrite newer results
      const reqId = ++requestIdRef.current
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
          { headers: { 'Accept-Language': navigator.language || 'es' } }
        )
        const data = await res.json()
        if (reqId !== requestIdRef.current) return
        setLocationSearch(s => ({ ...s, results: data }))
      } catch {
        if (reqId !== requestIdRef.current) return
        setLocationSearch(s => ({ ...s, results: [] }))
      }
    }, 400)
  }, [])

  const selectSearchResult = useCallback((result) => {
    setLocationData(d => ({
      ...d,
      lat: result.lat,
      lng: result.lon,
      label: d.label || result.display_name.split(',')[0],
    }))
    setLocationSearch({ query: result.display_name.split(',')[0], results: [] })
  }, [setLocationData])

  const clearSearch = useCallback(() => {
    setLocationSearch(s => ({ ...s, results: [] }))
  }, [])

  return { locationSearch, handleLocationSearch, selectSearchResult, clearSearch }
}
