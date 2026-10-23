import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Fix default marker icons: Leaflet computes URLs that bundlers can't resolve,
// so point it at the bundled assets instead of its broken defaults.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

/**
 * MapPicker — click anywhere on the OpenStreetMap to place/move a pin.
 * Calls onSelect({ lat, lng, label }) when pin is placed.
 */
export default function MapPicker({ lat, lng, onSelect, t }) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)
    const markerRef = useRef(null)
    // Leaflet handlers are bound once at init; refs keep them from capturing
    // a stale onSelect/t closure.
    const onSelectRef = useRef(onSelect)
    const tRef = useRef(t)
    useEffect(() => {
        onSelectRef.current = onSelect
        tRef.current = t
    })

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
                bindMarkerEvents(markerRef.current, onSelectRef, tRef)
            }

            // Click to place/move pin
            map.on('click', (e) => {
                const { lat, lng } = e.latlng
                markerRef.current = placeMarker(map, lat, lng, onSelectRef, tRef)
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
            bindMarkerEvents(markerRef.current, onSelectRef, tRef)
        }
        mapRef.current.setView([parsedLat, parsedLng], mapRef.current.getZoom())
    }, [lat, lng])

    return (
        <div
            ref={containerRef}
            className="map-picker-container"
            aria-label={t('location.map_aria')}
        />
    )
}

function placeMarker(map, lat, lng, onSelectRef, tRef) {
    // Remove old marker if exists (handled via ref in component)
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) layer.remove()
    })

    const marker = L.marker([lat, lng], { draggable: true }).addTo(map)
        .bindPopup(`<b>${tRef.current('location.pin_selected')}</b><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup()

    bindMarkerEvents(marker, onSelectRef, tRef)
    onSelectRef.current({ lat: lat.toFixed(6), lng: lng.toFixed(6), label: '' })

    return marker
}

function bindMarkerEvents(marker, onSelectRef, tRef) {
    marker.on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng()
        marker.setPopupContent(`<b>${tRef.current('location.pin_selected')}</b><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        onSelectRef.current({ lat: lat.toFixed(6), lng: lng.toFixed(6), label: '' })
    })
}
