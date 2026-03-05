import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import QRCodeStyling from 'qr-code-styling'
import MapPicker from './MapPicker'
import { detectLang, makeT, SUPPORTED_LANGS } from './i18n'
import './index.css'

const TABS = [
  { id: 'wifi', icon: '📶' },
  { id: 'website', icon: '🌐' },
  { id: 'text', icon: '📝' },
  { id: 'whatsapp', icon: '💬' },
  { id: 'email', icon: '📧' },
  { id: 'phone', icon: '📞' },
  { id: 'sms', icon: '✉️' },
  { id: 'vcard', icon: '👤' },
  { id: 'location', icon: '📍' },
]

const WIFI_SECURITY = ['WPA', 'WEP', 'nopass']

// Preset style definitions
const PRESETS = [
  {
    id: 'classic',
    label: 'Clásico',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
  },
  {
    id: 'rounded',
    label: 'Redondeado',
    dotsType: 'rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
  {
    id: 'dots',
    label: 'Puntos',
    dotsType: 'dots',
    cornersSquareType: 'dot',
    cornersDotType: 'dot',
  },
  {
    id: 'classy',
    label: 'Elegante',
    dotsType: 'classy',
    cornersSquareType: 'square',
    cornersDotType: 'square',
  },
  {
    id: 'classy-rounded',
    label: 'Mixto',
    dotsType: 'classy-rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
  {
    id: 'extra-rounded',
    label: 'Fluido',
    dotsType: 'extra-rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
  },
]

const QR_SIZE = 220

function App() {
  const [lang, setLang] = useState(detectLang)
  const t = useMemo(() => makeT(lang), [lang])

  useEffect(() => {
    localStorage.setItem('qr-lang', lang)
  }, [lang])

  const [activeTab, setActiveTab] = useState('wifi')
  const [wifiData, setWifiData] = useState({ ssid: '', password: '', security: 'WPA' })
  const [websiteData, setWebsiteData] = useState({ url: '' })
  const [textData, setTextData] = useState({ text: '' })
  const [whatsappData, setWhatsappData] = useState({ phone: '', message: '' })
  const [emailData, setEmailData] = useState({ to: '', subject: '', body: '' })
  const [phoneData, setPhoneData] = useState({ number: '' })
  const [smsData, setSmsData] = useState({ phone: '', message: '' })
  const [vcardData, setVcardData] = useState({ name: '', phone: '', email: '', org: '', url: '' })
  const [locationData, setLocationData] = useState({ lat: '', lng: '', label: '', showMap: false })
  const [qrStyle, setQrStyle] = useState({ fg: '#000000', bg: '#ffffff', showCustomizer: false })
  const [activePreset, setActivePreset] = useState('classic')
  const [formKey, setFormKey] = useState(0)

  const [locationSearch, setLocationSearch] = useState({ query: '', results: [] })
  const searchTimeoutRef = useRef(null)

  const qrContainerRef = useRef(null)
  const qrInstanceRef = useRef(null)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setFormKey(k => k + 1)

    // Auto-detect approximate location via IP when opening the location tab for the first time
    if (tabId === 'location') {
      setLocationData(prev => {
        if (prev.lat || prev.lng) return prev  // already have coords, don't overwrite
        fetch('https://ipapi.co/json/')
          .then(r => r.json())
          .then(data => {
            if (data.latitude && data.longitude) {
              setLocationData(d => ({
                ...d,
                lat: String(data.latitude),
                lng: String(data.longitude),
                label: d.label || data.city || '',
              }))
            }
          })
          .catch(() => { }) // silent fail — map defaults to Buenos Aires
        return prev
      })
    }
  }

  const getQRValue = useCallback(() => {
    switch (activeTab) {
      case 'wifi':
        if (!wifiData.ssid) return ''
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};;`

      case 'website': {
        let url = websiteData.url.trim()
        if (!url) return ''
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url
        return url
      }

      case 'text':
        return textData.text

      case 'whatsapp': {
        if (!whatsappData.phone) return ''
        const phone = whatsappData.phone.replace(/\D/g, '')
        let waUrl = `https://wa.me/${phone}`
        if (whatsappData.message) waUrl += `?text=${encodeURIComponent(whatsappData.message)}`
        return waUrl
      }

      case 'email': {
        if (!emailData.to) return ''
        const params = []
        if (emailData.subject) params.push(`subject=${encodeURIComponent(emailData.subject)}`)
        if (emailData.body) params.push(`body=${encodeURIComponent(emailData.body)}`)
        return `mailto:${emailData.to}${params.length ? '?' + params.join('&') : ''}`
      }

      case 'phone':
        if (!phoneData.number) return ''
        return `tel:${phoneData.number.replace(/\s/g, '')}`

      case 'sms': {
        if (!smsData.phone) return ''
        const num = smsData.phone.replace(/\s/g, '')
        return smsData.message
          ? `sms:${num}?body=${encodeURIComponent(smsData.message)}`
          : `sms:${num}`
      }

      case 'vcard': {
        if (!vcardData.name) return ''
        const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${vcardData.name}`]
        if (vcardData.phone) lines.push(`TEL:${vcardData.phone}`)
        if (vcardData.email) lines.push(`EMAIL:${vcardData.email}`)
        if (vcardData.org) lines.push(`ORG:${vcardData.org}`)
        if (vcardData.url) lines.push(`URL:${vcardData.url}`)
        lines.push('END:VCARD')
        return lines.join('\n')
      }

      case 'location': {
        if (!locationData.lat || !locationData.lng) return ''
        const { lat, lng, label } = locationData
        return label
          ? `https://maps.google.com/?q=${encodeURIComponent(label)}&ll=${lat},${lng}`
          : `geo:${lat},${lng}`
      }

      default: return ''
    }
  }, [activeTab, wifiData, websiteData, textData, whatsappData, emailData, phoneData, smsData, vcardData, locationData])

  const buildQROptions = useCallback((value, preset, fg, bg) => {
    const p = PRESETS.find(p => p.id === preset) || PRESETS[0]
    return {
      width: QR_SIZE,
      height: QR_SIZE,
      type: 'svg',
      data: value || 'https://placeholder.com',
      dotsOptions: {
        type: p.dotsType,
        color: fg,
      },
      cornersSquareOptions: {
        type: p.cornersSquareType,
        color: fg,
      },
      cornersDotOptions: {
        type: p.cornersDotType,
        color: fg,
      },
      backgroundOptions: {
        color: bg,
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    }
  }, [])

  // Initialize QR instance once
  useEffect(() => {
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current = new QRCodeStyling(opts)
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ''
      qrInstanceRef.current.append(qrContainerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR when data changes
  useEffect(() => {
    if (!qrInstanceRef.current) return
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current.update(opts)
  }, [getQRValue, activePreset, qrStyle.fg, qrStyle.bg, buildQROptions])

  const qrValue = getQRValue()

  const handleLocationSearch = (query) => {
    setLocationSearch(s => ({ ...s, query }))
    clearTimeout(searchTimeoutRef.current)
    if (query.trim().length < 3) {
      setLocationSearch(s => ({ ...s, results: [] }))
      return
    }
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
          { headers: { 'Accept-Language': 'es' } }
        )
        const data = await res.json()
        setLocationSearch(s => ({ ...s, results: data }))
      } catch {
        setLocationSearch(s => ({ ...s, results: [] }))
      }
    }, 400)
  }

  const selectSearchResult = (result) => {
    setLocationData(d => ({
      ...d,
      lat: result.lat,
      lng: result.lon,
      label: d.label || result.display_name.split(',')[0],
    }))
    setLocationSearch({ query: result.display_name.split(',')[0], results: [] })
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocationData(d => ({
        ...d,
        lat: String(pos.coords.latitude),
        lng: String(pos.coords.longitude),
      }))
    })
  }

  const downloadQR = async () => {
    if (!qrInstanceRef.current || !qrValue) return
    const fileName = `qr-${activeTab}-${Date.now()}.png`

    // iOS Safari: use Web Share API so the user can "Save Image" to Photos
    if (navigator.canShare) {
      try {
        const blob = await qrInstanceRef.current.getRawData('png')
        const file = new File([blob], fileName, { type: 'image/png' })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Código QR' })
          return
        }
      } catch {
        // user cancelled or share failed — fall through to download
      }
    }

    qrInstanceRef.current.download({ name: `qr-${activeTab}-${Date.now()}`, extension: 'png' })
  }

  const focusClass = {
    wifi: 'focus-cyan',
    website: 'focus-violet',
    text: 'focus-amber',
    whatsapp: 'focus-green',
    email: 'focus-rose',
    phone: 'focus-teal',
    sms: 'focus-violet',
    vcard: 'focus-blue',
    location: 'focus-amber',
  }[activeTab]

  const ic = `field-input ${focusClass}`
  const tc = `field-textarea ${focusClass}`

  const renderForm = () => {
    switch (activeTab) {

      case 'wifi':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('wifi.ssid')}</label>
              <input type="text" value={wifiData.ssid}
                onChange={e => setWifiData({ ...wifiData, ssid: e.target.value })}
                placeholder={t('wifi.ssid_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('wifi.password')}</label>
              <input type="text" value={wifiData.password}
                onChange={e => setWifiData({ ...wifiData, password: e.target.value })}
                placeholder={t('wifi.password_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('wifi.security')}</label>
              <div className="security-group">
                {WIFI_SECURITY.map(sec => (
                  <button key={sec} onClick={() => setWifiData({ ...wifiData, security: sec })}
                    className={`sec-btn${wifiData.security === sec ? ' sec-active' : ''}`}>
                    {sec === 'nopass' ? t('wifi.open') : sec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'website':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('website.url')}</label>
              <input type="text" value={websiteData.url}
                onChange={e => setWebsiteData({ url: e.target.value })}
                placeholder={t('website.url_ph')} className={ic} />
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('text.label')}</label>
              <textarea value={textData.text}
                onChange={e => setTextData({ text: e.target.value })}
                placeholder={t('text.ph')} rows={7} className={tc} />
            </div>
          </div>
        )

      case 'whatsapp':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('whatsapp.phone')}</label>
              <input type="text" value={whatsappData.phone}
                onChange={e => setWhatsappData({ ...whatsappData, phone: e.target.value })}
                placeholder={t('whatsapp.phone_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('whatsapp.message')}</label>
              <textarea value={whatsappData.message}
                onChange={e => setWhatsappData({ ...whatsappData, message: e.target.value })}
                placeholder={t('whatsapp.message_ph')} rows={5} className={tc} />
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('email.to')}</label>
              <input type="email" value={emailData.to}
                onChange={e => setEmailData({ ...emailData, to: e.target.value })}
                placeholder={t('email.to_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('email.subject')}</label>
              <input type="text" value={emailData.subject}
                onChange={e => setEmailData({ ...emailData, subject: e.target.value })}
                placeholder={t('email.subject_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('email.body')}</label>
              <textarea value={emailData.body}
                onChange={e => setEmailData({ ...emailData, body: e.target.value })}
                placeholder={t('email.body_ph')} rows={4} className={tc} />
            </div>
          </div>
        )

      case 'phone':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('phone.number')}</label>
              <input type="tel" value={phoneData.number}
                onChange={e => setPhoneData({ number: e.target.value })}
                placeholder={t('phone.ph')} className={ic} />
            </div>
            <p className="field-hint">{t('phone.hint')}</p>
          </div>
        )

      case 'sms':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('sms.phone')}</label>
              <input type="tel" value={smsData.phone}
                onChange={e => setSmsData({ ...smsData, phone: e.target.value })}
                placeholder={t('sms.phone_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('sms.message')}</label>
              <textarea value={smsData.message}
                onChange={e => setSmsData({ ...smsData, message: e.target.value })}
                placeholder={t('sms.message_ph')} rows={5} className={tc} />
            </div>
          </div>
        )

      case 'vcard':
        return (
          <div className="form-section">
            <div className="field-group">
              <label className="field-label">{t('vcard.name')}</label>
              <input type="text" value={vcardData.name}
                onChange={e => setVcardData({ ...vcardData, name: e.target.value })}
                placeholder={t('vcard.name_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('vcard.phone')}</label>
              <input type="tel" value={vcardData.phone}
                onChange={e => setVcardData({ ...vcardData, phone: e.target.value })}
                placeholder={t('phone.ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('vcard.email')}</label>
              <input type="email" value={vcardData.email}
                onChange={e => setVcardData({ ...vcardData, email: e.target.value })}
                placeholder={t('email.to_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('vcard.org')}</label>
              <input type="text" value={vcardData.org}
                onChange={e => setVcardData({ ...vcardData, org: e.target.value })}
                placeholder={t('vcard.org_ph')} className={ic} />
            </div>
            <div className="field-group">
              <label className="field-label">{t('vcard.url')}</label>
              <input type="text" value={vcardData.url}
                onChange={e => setVcardData({ ...vcardData, url: e.target.value })}
                placeholder={t('vcard.url_ph')} className={ic} />
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="form-section">

            {/* Toggle between manual and map picker */}
            <div className="map-toggle-row">
              <button
                className={`map-toggle-btn${!locationData.showMap ? ' map-toggle-active' : ''}`}
                onClick={() => setLocationData(d => ({ ...d, showMap: false }))}
              >
                {t('location.manual')}
              </button>
              <button
                className={`map-toggle-btn${locationData.showMap ? ' map-toggle-active' : ''}`}
                onClick={() => setLocationData(d => ({ ...d, showMap: true }))}
              >
                {t('location.map')}
              </button>
            </div>

            {locationData.showMap ? (
              <div className="map-section">
                {/* Search + GPS */}
                <div className="location-search-row">
                  <div className="location-search-wrap">
                    <input
                      type="text"
                      value={locationSearch.query}
                      onChange={e => handleLocationSearch(e.target.value)}
                      onBlur={() => setTimeout(() => setLocationSearch(s => ({ ...s, results: [] })), 150)}
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
                  lat={locationData.lat}
                  lng={locationData.lng}
                  onSelect={({ lat, lng }) =>
                    setLocationData(d => ({ ...d, lat, lng }))
                  }
                />
                {locationData.lat && locationData.lng && (
                  <p className="coords-display">
                    📍 {parseFloat(locationData.lat).toFixed(5)}, {parseFloat(locationData.lng).toFixed(5)}
                  </p>
                )}
              </div>
            ) : (
              <div className="field-row-2">
                <div className="field-group">
                  <label className="field-label">{t('location.lat')}</label>
                  <input type="text" value={locationData.lat}
                    onChange={e => setLocationData({ ...locationData, lat: e.target.value })}
                    placeholder="-34.6037" className={ic} />
                </div>
                <div className="field-group">
                  <label className="field-label">{t('location.lng')}</label>
                  <input type="text" value={locationData.lng}
                    onChange={e => setLocationData({ ...locationData, lng: e.target.value })}
                    placeholder="-58.3816" className={ic} />
                </div>
              </div>
            )}

            <div className="field-group">
              <label className="field-label">{t('location.place')}</label>
              <input type="text" value={locationData.label}
                onChange={e => setLocationData({ ...locationData, label: e.target.value })}
                placeholder={t('location.place_ph')} className={ic} />
            </div>
            <p className="field-hint">{t('location.hint')}</p>
          </div>
        )

      default: return null
    }
  }

  return (
    <>
    <div className="bg-blobs" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
    <div className="app-wrapper">

      {/* Header */}
      <header className="header anim-fade-up">
        <div className="logo-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </div>
        <div className="badge">{t('header.badge')}</div>
        <h1 className="app-title">{t('header.title')}</h1>
        <p className="app-subtitle">{t('header.subtitle')}</p>
        <div className="lang-selector">
          {SUPPORTED_LANGS.map(l => (
            <button
              key={l.code}
              className={`lang-btn${lang === l.code ? ' active' : ''}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Card */}
      <main className="main-card anim-fade-up anim-fade-up-d1">

        {/* Tabs */}
        <nav className="tabs-container" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              data-tab={tab.id}
              className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{t(`tab.${tab.id}`)}</span>
            </button>
          ))}
        </nav>

        {/* Two-col layout */}
        <div className="card-inner">

          {/* Left — Form */}
          <div key={formKey} className="anim-form">
            {renderForm()}
          </div>

          {/* Right — QR Preview */}
          <div className="qr-section">
            <span className="qr-label">{t('qr.preview')}</span>

            {/* QR Container */}
            <div className={`qr-frame${qrValue ? ' has-qr' : ' empty'}`}>
              <div
                ref={qrContainerRef}
                className={`qr-render${!qrValue ? ' qr-render--empty' : ''}`}
                style={{ width: QR_SIZE, height: QR_SIZE }}
              />
              {!qrValue && (
                <div className="qr-placeholder-overlay">
                  <span className="qr-placeholder-icon">📱</span>
                  <p className="qr-placeholder-text">{t('qr.fill_fields')}</p>
                </div>
              )}
            </div>

            {/* Preset selector */}
            <div className="preset-section">
              <span className="preset-label">{t('qr.style')}</span>
              <div className="preset-grid">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    className={`preset-btn${activePreset === preset.id ? ' preset-active' : ''}`}
                    onClick={() => setActivePreset(preset.id)}
                  >
                    <PresetPreview preset={preset} />
                    <span className="preset-name">{t(`preset.${preset.id}`)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Download button */}
            {qrValue && (
              <button onClick={downloadQR} className={`download-btn btn-${activeTab}`}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('qr.download')}
              </button>
            )}

            {/* Color customizer */}
            <div className="qr-customizer">
              <button
                className="customizer-toggle"
                onClick={() => setQrStyle(s => ({ ...s, showCustomizer: !s.showCustomizer }))}
              >
                <span>🎨</span>
                <span>{t('custom.title')}</span>
                <span className={`toggle-arrow${qrStyle.showCustomizer ? ' open' : ''}`}>▾</span>
              </button>

              {qrStyle.showCustomizer && (
                <div className="customizer-panel">
                  <div className="color-row">
                    <label className="color-label">
                      <span>{t('custom.qr_color')}</span>
                      <div className="color-swatch-wrap">
                        <div className="color-swatch" style={{ background: qrStyle.fg }} />
                        <input
                          type="color"
                          value={qrStyle.fg}
                          onChange={e => setQrStyle(s => ({ ...s, fg: e.target.value }))}
                          className="color-input"
                        />
                      </div>
                    </label>
                    <label className="color-label">
                      <span>{t('custom.bg_color')}</span>
                      <div className="color-swatch-wrap">
                        <div className="color-swatch" style={{ background: qrStyle.bg }} />
                        <input
                          type="color"
                          value={qrStyle.bg}
                          onChange={e => setQrStyle(s => ({ ...s, bg: e.target.value }))}
                          className="color-input"
                        />
                      </div>
                    </label>
                  </div>
                  <button
                    className="reset-colors-btn"
                    onClick={() => setQrStyle(s => ({ ...s, fg: '#000000', bg: '#ffffff' }))}
                  >
                    {t('custom.reset')}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer anim-fade-up anim-fade-up-d3">
        <span className="footer-text">QR Generator</span>
        <div className="footer-dot" />
        <span className="footer-text">{t('footer.powered')}</span>
      </footer>

    </div>
    </>
  )
}

// Mini SVG preview of each preset style
function PresetPreview({ preset }) {
  const s = 36 // preview size
  const dotR = preset.dotsType === 'dots' || preset.dotsType === 'extra-rounded' ? 2.5
    : preset.dotsType === 'rounded' || preset.dotsType === 'classy-rounded' ? 1.5
      : 0
  const cornerR = preset.cornersSquareType === 'extra-rounded' ? 3
    : preset.cornersSquareType === 'dot' ? 4
      : 0

  // Draw a minimal 3×3 grid of dots + 3 corner squares
  const dots = []
  const gap = 6, dotSize = 4, startX = 10, startY = 10
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      // skip corner positions (handled separately)
      if ((r === 0 && c === 0) || (r === 0 && c === 3) || (r === 3 && c === 0)) continue
      const x = startX + c * gap
      const y = startY + r * gap
      dots.push(
        <rect key={`${r}-${c}`} x={x} y={y} width={dotSize} height={dotSize} rx={dotR} fill="currentColor" />
      )
    }
  }

  // Corner squares
  const corners = [
    { x: startX, y: startY },
    { x: startX + 3 * gap, y: startY },
    { x: startX, y: startY + 3 * gap },
  ]

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" className="preset-svg">
      {/* bg */}
      <rect width={s} height={s} rx="4" fill="transparent" />
      {/* dots */}
      {dots}
      {/* corner squares (outer) */}
      {corners.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 1} y={c.y - 1} width={dotSize + 8} height={dotSize + 8} rx={cornerR} stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x={c.x + 1.5} y={c.y + 1.5} width={dotSize + 3} height={dotSize + 3} rx={Math.max(0, cornerR - 1.5)} fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}

export default App
