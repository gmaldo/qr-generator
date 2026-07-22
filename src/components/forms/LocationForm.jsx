import MapPicker from '../../MapPicker'
import useLocationSearch from '../../hooks/useLocationSearch'

export default function LocationForm({ data, setData, t, ic }) {
  const { locationSearch, handleLocationSearch, selectSearchResult, clearSearch } = useLocationSearch(setData)

  const useMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setData(d => ({
        ...d,
        lat: String(pos.coords.latitude),
        lng: String(pos.coords.longitude),
      }))
    })
  }

  return (
    <div className="form-section">
      <div className="map-toggle-row">
        <button
          className={`map-toggle-btn${!data.showMap ? ' map-toggle-active' : ''}`}
          onClick={() => setData(d => ({ ...d, showMap: false }))}
        >
          {t('location.manual')}
        </button>
        <button
          className={`map-toggle-btn${data.showMap ? ' map-toggle-active' : ''}`}
          onClick={() => setData(d => ({ ...d, showMap: true }))}
        >
          {t('location.map')}
        </button>
      </div>

      {data.showMap ? (
        <div className="map-section">
          <div className="location-search-row">
            <div className="location-search-wrap">
              <input
                type="text"
                value={locationSearch.query}
                onChange={e => handleLocationSearch(e.target.value)}
                onBlur={() => setTimeout(clearSearch, 150)}
                placeholder={t('location.search_ph')}
                className={ic}
                autoComplete="off"
              />
              {locationSearch.results.length > 0 && (
                <div className="search-results-dropdown">
                  {locationSearch.results.map((r, i) => (
                    <button
                      key={i}
                      className="search-result-item"
                      onMouseDown={() => selectSearchResult(r)}
                    >
                      <span className="search-result-name">{r.display_name.split(',')[0]}</span>
                      <span className="search-result-sub">{r.display_name.split(',').slice(1, 3).join(',').trim()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="gps-btn" onClick={useMyLocation} title={t('location.gps')}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth={2} />
                <path strokeLinecap="round" strokeWidth={2} d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                <circle cx="12" cy="12" r="7" strokeWidth={1.5} strokeDasharray="3 2" />
              </svg>
            </button>
          </div>
          <p className="field-hint" style={{ marginBottom: '0.5rem' }}>
            {t('location.map_hint')}
          </p>
          <MapPicker
            lat={data.lat}
            lng={data.lng}
            onSelect={({ lat, lng }) =>
              setData(d => ({ ...d, lat, lng }))
            }
          />
          {data.lat && data.lng && (
            <p className="coords-display">
              📍 {parseFloat(data.lat).toFixed(5)}, {parseFloat(data.lng).toFixed(5)}
            </p>
          )}
        </div>
      ) : (
        <div className="field-row-2">
          <div className="field-group">
            <label className="field-label">{t('location.lat')}</label>
            <input type="text" value={data.lat}
              onChange={e => setData({ ...data, lat: e.target.value })}
              placeholder="-34.6037" className={ic} />
          </div>
          <div className="field-group">
            <label className="field-label">{t('location.lng')}</label>
            <input type="text" value={data.lng}
              onChange={e => setData({ ...data, lng: e.target.value })}
              placeholder="-58.3816" className={ic} />
          </div>
        </div>
      )}

      <div className="field-group">
        <label className="field-label">{t('location.place')}</label>
        <input type="text" value={data.label}
          onChange={e => setData({ ...data, label: e.target.value })}
          placeholder={t('location.place_ph')} className={ic} />
      </div>
      <p className="field-hint">{t('location.hint')}</p>
    </div>
  )
}
