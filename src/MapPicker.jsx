import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons (webpack/vite asset issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/**
 * MapPicker — click anywhere on the OpenStreetMap to place/move a pin.
 * Calls onSelect({ lat, lng, label }) when pin is placed.
 */
export default function MapPicker({ lat, lng, onSelect }) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)
    const markerRef = useRef(null)

    // Initialize map once
    useEffect(() => {
        if (mapRef.current) return // already initialized

        const initMap = (centerLat, centerLng) => {
            const map = L.map(containerRef.current, {
                center: [centerLat, centerLng],
                zoom: 13,
                zoomControl: true,
            })

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map)

            // If we already have valid coords, place a marker
            if (lat && lng) {
                markerRef.current = L.marker([parseFloat(lat), parseFloat(lng)], { draggable: true }).addTo(map)
                bindMarkerEvents(markerRef.current, onSelect)
            }

            // Click to place/move pin
            map.on('click', (e) => {
                const { lat, lng } = e.latlng
                markerRef.current = placeMarker(map, lat, lng, onSelect)
            })

            mapRef.current = map
        }

        const parsedLat = parseFloat(lat)
        const parsedLng = parseFloat(lng)

        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
            initMap(parsedLat, parsedLng)
        } else {
            initMap(-34.6037, -58.3816)
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
                markerRef.current = null
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Sync marker when lat/lng change externally (e.g. manual input)
    useEffect(() => {
        if (!mapRef.current) return
        const parsedLat = parseFloat(lat)
        const parsedLng = parseFloat(lng)
        if (isNaN(parsedLat) || isNaN(parsedLng)) return

        if (markerRef.current) {
            markerRef.current.setLatLng([parsedLat, parsedLng])
        } else {
            markerRef.current = L.marker([parsedLat, parsedLng], { draggable: true }).addTo(mapRef.current)
            bindMarkerEvents(markerRef.current, onSelect)
        }
        mapRef.current.setView([parsedLat, parsedLng], mapRef.current.getZoom())
    }, [lat, lng]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            ref={containerRef}
            className="map-picker-container"
            aria-label="Seleccioná una ubicación en el mapa"
        />
    )
}

function placeMarker(map, lat, lng, onSelect) {
    // Remove old marker if exists (handled via ref in component)
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) layer.remove()
    })

    const marker = L.marker([lat, lng], { draggable: true }).addTo(map)
        .bindPopup(`<b>Pin seleccionado</b><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup()

    bindMarkerEvents(marker, onSelect)
    onSelect({ lat: lat.toFixed(6), lng: lng.toFixed(6), label: '' })

    return marker
}

function bindMarkerEvents(marker, onSelect) {
    marker.on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng()
        marker.setPopupContent(`<b>Pin seleccionado</b><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        onSelect({ lat: lat.toFixed(6), lng: lng.toFixed(6), label: '' })
    })
}
