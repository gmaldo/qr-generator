import { useState, useCallback, useMemo, useEffect } from 'react'
import { detectLang, makeT } from './i18n'
import { TABS, PRESETS, FOCUS_CLASSES } from './config/constants'
import useQRCode from './hooks/useQRCode'
import Header from './components/Header'
import Tabs from './components/Tabs'
import FormSwitch from './components/forms'
import QRPreview from './components/qr/QRPreview'
import PresetSelector from './components/qr/PresetSelector'
import DownloadButton from './components/qr/DownloadButton'
import ColorCustomizer from './components/qr/ColorCustomizer'
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
  const [qrStyle, setQrStyle] = useState({ fg: '#000000', bg: '#ffffff', showCustomizer: false })
  const [activePreset, setActivePreset] = useState('classic')

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

      default: return ''
    }
  }, [activeTab, wifiData, websiteData, textData, whatsappData, emailData, phoneData, smsData, vcardData, locationData])

  const { qrContainerRef, downloadQR } = useQRCode({ activeTab, qrStyle, activePreset, getQRValue })
  const qrValue = getQRValue()

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
  }

  const { data: currentFormData, set: setCurrentFormData } = FORM_DATA_MAP[activeTab]

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

            <QRPreview qrContainerRef={qrContainerRef} qrValue={qrValue} t={t} />

            <PresetSelector
              presets={PRESETS}
              activePreset={activePreset}
              onSelect={setActivePreset}
              t={t}
            />

            {qrValue && (
              <DownloadButton onClick={downloadQR} activeTab={activeTab} t={t} />
            )}

            <ColorCustomizer qrStyle={qrStyle} setQrStyle={setQrStyle} t={t} />

          </div>
        </div>
      </main>

      <Footer t={t} />

    </div>
    </>
  )
}

export default App
