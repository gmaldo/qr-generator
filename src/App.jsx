import { useState, useCallback, useMemo, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { detectLang, makeT } from './i18n'
import { TABS, PRESETS, QR_SHAPES, QR_SIZE, QR_SIZES, QR_STYLE_DEFAULTS, FOCUS_CLASSES } from './config/constants'
import useQRCode from './hooks/useQRCode'
import Header from './components/Header'
import Tabs from './components/Tabs'
import FormSwitch from './components/forms'
import QRPreview from './components/qr/QRPreview'
import PresetSelector from './components/qr/PresetSelector'
import ShapeSelector from './components/qr/ShapeSelector'
import useHistory from './hooks/useHistory'
import LogoUploader from './components/qr/LogoUploader'
import SizeSelector from './components/qr/SizeSelector'
import DownloadActions from './components/qr/DownloadButton'
import ColorCustomizer from './components/qr/ColorCustomizer'
import HistoryPanel from './components/qr/HistoryPanel'
import Footer from './components/Footer'
import './index.css'

// vCard and iCalendar TEXT values escape \ ; , and newlines — without it a
// comma splits the property and the scanner reads a broken card/event.
const escText = v => v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

// WIFI: payloads (ZXing format) escape \ ; , : " the same way.
const escWifi = v => v.replace(/([\\;,:"])/g, '\\$1')

function App() {
  const [lang, setLang] = useState(detectLang)
  const t = useMemo(() => makeT(lang), [lang])

  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  const toggleTheme = useCallback((e) => {
    const apply = () => {
      setTheme(prev => {
        const next = prev === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('qr-theme', next)
        return next
      })
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion) {
      apply()
      return
    }

    const rect = e?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(apply)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    }).catch(() => {})
  }, [])

  useEffect(() => {
    localStorage.setItem('qr-lang', lang)
  }, [lang])

  const [activeTab, setActiveTab] = useState('website')
  const [formKey, setFormKey] = useState(0)

  const [wifiData, setWifiData] = useState({ ssid: '', password: '', security: 'WPA' })
  const [websiteData, setWebsiteData] = useState({ url: '' })
  const [textData, setTextData] = useState({ text: '' })
  const [whatsappData, setWhatsappData] = useState({ phone: '', message: '' })
  const [emailData, setEmailData] = useState({ to: '', subject: '', body: '' })
  const [phoneData, setPhoneData] = useState({ number: '' })
  const [smsData, setSmsData] = useState({ phone: '', message: '' })
  const [vcardData, setVcardData] = useState({ name: '', phone: '', email: '', org: '', url: '' })
  const [locationData, setLocationData] = useState({ lat: '', lng: '', label: '', showMap: false })
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', location: '', description: '' })
  const [instagramData, setInstagramData] = useState({ username: '' })
  const [twitterData, setTwitterData] = useState({ username: '' })
  const [youtubeData, setYoutubeData] = useState({ type: 'channel', handle: '', videoId: '' })
  const [tiktokData, setTiktokData] = useState({ username: '' })
  const [linkedinData, setLinkedinData] = useState({ type: 'profile', username: '' })
  const [telegramData, setTelegramData] = useState({ username: '' })
  const [qrStyle, setQrStyle] = useState({ ...QR_STYLE_DEFAULTS, showCustomizer: false })
  const [activePreset, setActivePreset] = useState('classic')
  const [qrShape, setQrShape] = useState('square')
  const [qrSize, setQrSize] = useState(QR_SIZE)
  const [logo, setLogo] = useState({ image: null, size: 25, hideBackgroundDots: true })

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setFormKey(k => k + 1)

    if (tabId === 'location' && !locationData.lat && !locationData.lng) {
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
        .catch(() => { })
    }
  }

  const getQRValue = useCallback(() => {
    switch (activeTab) {
      case 'wifi':
        if (!wifiData.ssid) return ''
        return `WIFI:T:${wifiData.security};S:${escWifi(wifiData.ssid)};P:${escWifi(wifiData.password)};;`

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
        const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${escText(vcardData.name)}`]
        if (vcardData.phone) lines.push(`TEL:${vcardData.phone}`)
        if (vcardData.email) lines.push(`EMAIL:${vcardData.email}`)
        if (vcardData.org) lines.push(`ORG:${escText(vcardData.org)}`)
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

      case 'event': {
        if (!eventData.title || !eventData.start) return ''
        // datetime-local may carry seconds; ICS wants HHMMSS, so truncate to
        // minutes then re-append the seconds field as "00".
        const toIcs = dt => dt ? dt.slice(0, 16).replace(/[-:]/g, '') + '00' : ''
        const lines = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//QR Generator//Event//ES',
          'BEGIN:VEVENT',
          `UID:${Date.now()}@qr-generator`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '')}Z`,
          `DTSTART:${toIcs(eventData.start)}`,
        ]
        if (eventData.end) lines.push(`DTEND:${toIcs(eventData.end)}`)
        lines.push(`SUMMARY:${escText(eventData.title)}`)
        if (eventData.location) lines.push(`LOCATION:${escText(eventData.location)}`)
        if (eventData.description) lines.push(`DESCRIPTION:${escText(eventData.description)}`)
        lines.push('END:VEVENT', 'END:VCALENDAR')
        return lines.join('\n')
      }

      case 'instagram': {
        if (!instagramData.username) return ''
        const igUser = instagramData.username.replace(/^@+/, '').trim()
        return `https://instagram.com/${igUser}`
      }

      case 'twitter': {
        if (!twitterData.username) return ''
        const twUser = twitterData.username.replace(/^@+/, '').trim()
        return `https://x.com/${twUser}`
      }

      case 'youtube': {
        if (youtubeData.type === 'video') {
          if (!youtubeData.videoId) return ''
          return `https://youtu.be/${youtubeData.videoId.trim()}`
        }
        if (!youtubeData.handle) return ''
        const ytHandle = youtubeData.handle.replace(/^@+/, '').trim()
        return `https://youtube.com/@${ytHandle}`
      }

      case 'tiktok': {
        if (!tiktokData.username) return ''
        const ttUser = tiktokData.username.replace(/^@+/, '').trim()
        return `https://www.tiktok.com/@${ttUser}`
      }

      case 'linkedin': {
        if (!linkedinData.username) return ''
        const liUser = linkedinData.username.trim()
        return linkedinData.type === 'company'
          ? `https://www.linkedin.com/company/${liUser}`
          : `https://www.linkedin.com/in/${liUser}`
      }

      case 'telegram': {
        if (!telegramData.username) return ''
        const tgUser = telegramData.username.replace(/^@/, '').replace(/^t\.me\//, '').trim()
        return `https://t.me/${tgUser}`
      }

      default: return ''
    }
  }, [activeTab, wifiData, websiteData, textData, whatsappData, emailData, phoneData, smsData, vcardData, locationData, eventData, instagramData, twitterData, youtubeData, tiktokData, linkedinData, telegramData])

  const { qrContainerRef, qrInstanceRef } = useQRCode({ qrStyle, activePreset, getQRValue, qrSize, logo, qrShape })
  const qrValue = getQRValue()
  const { history, addItem: addToHistory, removeItem: removeFromHistory, clearAll: clearHistory } = useHistory()

  const focusClass = FOCUS_CLASSES[activeTab]
  const ic = `field-input ${focusClass}`
  const tc = `field-textarea ${focusClass}`

  const FORM_DATA_MAP = {
    wifi: { data: wifiData, set: setWifiData },
    website: { data: websiteData, set: setWebsiteData },
    text: { data: textData, set: setTextData },
    whatsapp: { data: whatsappData, set: setWhatsappData },
    email: { data: emailData, set: setEmailData },
    phone: { data: phoneData, set: setPhoneData },
    sms: { data: smsData, set: setSmsData },
    vcard: { data: vcardData, set: setVcardData },
    location: { data: locationData, set: setLocationData },
    event: { data: eventData, set: setEventData },
    instagram: { data: instagramData, set: setInstagramData },
    twitter: { data: twitterData, set: setTwitterData },
    youtube: { data: youtubeData, set: setYoutubeData },
    tiktok: { data: tiktokData, set: setTiktokData },
    linkedin: { data: linkedinData, set: setLinkedinData },
    telegram: { data: telegramData, set: setTelegramData },
  }

  const { data: currentFormData, set: setCurrentFormData } = FORM_DATA_MAP[activeTab]

  const saveToHistory = () => {
    if (!qrValue) return
    addToHistory({
      tab: activeTab,
      data: { ...currentFormData },
      preset: activePreset,
      fg: qrStyle.fg,
      bg: qrStyle.bg,
      fg2: qrStyle.fg2,
      gradient: qrStyle.gradient,
      gradientType: qrStyle.gradientType,
      gradientAngle: qrStyle.gradientAngle,
      shape: qrShape,
      size: qrSize,
    })
  }

  const restoreFromHistory = (item) => {
    setActiveTab(item.tab)
    setFormKey(k => k + 1)
    // Write through the item's own tab setter, not the current tab's:
    // `setCurrentFormData` was captured before the tab switch, so it used
    // to land the restored data in the wrong form and corrupt it.
    FORM_DATA_MAP[item.tab]?.set(item.data)
    setActivePreset(item.preset)
    setQrStyle(s => ({
      ...s,
      fg: item.fg,
      bg: item.bg,
      fg2: item.fg2 ?? s.fg2,
      gradient: item.gradient ?? s.gradient,
      gradientType: item.gradientType ?? s.gradientType,
      gradientAngle: item.gradientAngle ?? s.gradientAngle,
    }))
    if (item.shape) setQrShape(item.shape)
    if (item.size) setQrSize(item.size)
  }

  // One escape hatch for the whole look: preset, colours, gradient, shape,
  // size and logo all go back to what a freshly opened code looks like.
  const resetQrStyle = () => {
    setActivePreset('classic')
    setQrShape('square')
    setQrSize(QR_SIZE)
    setLogo({ image: null, size: 25, hideBackgroundDots: true })
    setQrStyle(s => ({ ...QR_STYLE_DEFAULTS, showCustomizer: s.showCustomizer }))
  }

  return (
    <>
    <div className="bg-blobs" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
    <div className="app-wrapper">

      <Header t={t} lang={lang} setLang={setLang} theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-card anim-fade-up anim-fade-up-d1">

        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} t={t} />

        <div className="card-inner">

          <div key={formKey} className="anim-form">
            <FormSwitch
              activeTab={activeTab}
              formData={currentFormData}
              setFormData={setCurrentFormData}
              t={t}
              ic={ic}
              tc={tc}
            />
          </div>

          <div className="qr-section">
            <span className="qr-label">{t('qr.preview')}</span>

             <QRPreview qrContainerRef={qrContainerRef} qrValue={qrValue} t={t} />

            <PresetSelector
              presets={PRESETS}
              activePreset={activePreset}
              onSelect={setActivePreset}
              t={t}
            />

            <ShapeSelector
              shapes={QR_SHAPES}
              activeShape={qrShape}
              onSelect={setQrShape}
              t={t}
            />

            <SizeSelector
              sizes={QR_SIZES}
              activeSize={qrSize}
              onSelect={setQrSize}
              t={t}
            />

            {qrValue && (
              <DownloadActions
                qrInstanceRef={qrInstanceRef}
                activeTab={activeTab}
                qrValue={qrValue}
                t={t}
                onSave={saveToHistory}
              />
            )}

            <ColorCustomizer qrStyle={qrStyle} setQrStyle={setQrStyle} t={t} />

            <LogoUploader logo={logo} setLogo={setLogo} t={t} />

            <button
              type="button"
              className="reset-style-btn"
              onClick={resetQrStyle}
            >
              {t('qr.reset_style')}
            </button>

            <HistoryPanel
              history={history}
              onRestore={restoreFromHistory}
              onRemove={removeFromHistory}
              onClear={clearHistory}
              t={t}
            />

          </div>
        </div>
      </main>

      <Footer t={t} />

    </div>
    </>
  )
}

export default App
