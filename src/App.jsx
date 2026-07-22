import { useState, useCallback, useMemo, useEffect } from 'react'
import { detectLang, makeT } from './i18n'
import { TABS, PRESETS, QR_SIZES, FOCUS_CLASSES } from './config/constants'
import useQRCode from './hooks/useQRCode'
import Header from './components/Header'
import Tabs from './components/Tabs'
import FormSwitch from './components/forms'
import QRPreview from './components/qr/QRPreview'
import PresetSelector from './components/qr/PresetSelector'
import useHistory from './hooks/useHistory'
import LogoUploader from './components/qr/LogoUploader'
import SizeSelector from './components/qr/SizeSelector'
import DownloadActions from './components/qr/DownloadButton'
import ColorCustomizer from './components/qr/ColorCustomizer'
import HistoryPanel from './components/qr/HistoryPanel'
import Footer from './components/Footer'
import './index.css'

function App() {
  const [lang, setLang] = useState(detectLang)
  const t = useMemo(() => makeT(lang), [lang])

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
  const [instagramData, setInstagramData] = useState({ username: '' })
  const [twitterData, setTwitterData] = useState({ username: '' })
  const [youtubeData, setYoutubeData] = useState({ type: 'channel', handle: '', videoId: '' })
  const [qrStyle, setQrStyle] = useState({ fg: '#000000', bg: '#ffffff', showCustomizer: false })
  const [activePreset, setActivePreset] = useState('classic')
  const [qrSize, setQrSize] = useState(220)
  const [logo, setLogo] = useState({ image: null, size: 25, hideBackgroundDots: true })

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setFormKey(k => k + 1)

    if (tabId === 'location') {
      setLocationData(prev => {
        if (prev.lat || prev.lng) return prev
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

      case 'instagram': {
        if (!instagramData.username) return ''
        const igUser = instagramData.username.replace('@', '').trim()
        return `https://instagram.com/${igUser}`
      }

      case 'twitter': {
        if (!twitterData.username) return ''
        const twUser = twitterData.username.replace('@', '').trim()
        return `https://x.com/${twUser}`
      }

      case 'youtube': {
        if (youtubeData.type === 'video') {
          if (!youtubeData.videoId) return ''
          return `https://youtu.be/${youtubeData.videoId.trim()}`
        }
        if (!youtubeData.handle) return ''
        const ytHandle = youtubeData.handle.replace('@', '').trim()
        return `https://youtube.com/@${ytHandle}`
      }

      default: return ''
    }
  }, [activeTab, wifiData, websiteData, textData, whatsappData, emailData, phoneData, smsData, vcardData, locationData, instagramData, twitterData, youtubeData])

  const { qrContainerRef, qrInstanceRef } = useQRCode({ qrStyle, activePreset, getQRValue, qrSize, logo })
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
    instagram: { data: instagramData, set: setInstagramData },
    twitter: { data: twitterData, set: setTwitterData },
    youtube: { data: youtubeData, set: setYoutubeData },
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
      size: qrSize,
    })
  }

  const restoreFromHistory = (item) => {
    setActiveTab(item.tab)
    setFormKey(k => k + 1)
    setCurrentFormData(item.data)
    setActivePreset(item.preset)
    setQrStyle(s => ({ ...s, fg: item.fg, bg: item.bg }))
    if (item.size) setQrSize(item.size)
  }

  return (
    <>
    <div className="bg-blobs" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
    <div className="app-wrapper">

      <Header t={t} lang={lang} setLang={setLang} />

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

            <QRPreview qrContainerRef={qrContainerRef} qrValue={qrValue} t={t} qrSize={qrSize} />

            <PresetSelector
              presets={PRESETS}
              activePreset={activePreset}
              onSelect={setActivePreset}
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
