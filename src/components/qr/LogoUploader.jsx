import { useState, useRef } from 'react'

export default function LogoUploader({ logo, setLogo, t }) {
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target.result
      setPreview(dataUrl)
      setLogo({ image: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setPreview(null)
    setLogo({ image: null })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="logo-section">
      <span className="logo-label">{t('qr.logo')}</span>

      <div className="logo-upload-area">
        {preview ? (
          <div className="logo-preview-wrap">
            <img src={preview} alt="Logo" className="logo-preview" />
            <button className="logo-remove-btn" onClick={removeLogo} title={t('qr.logo_remove')}>
              ✕
            </button>
          </div>
        ) : (
          <label className="logo-upload-label" htmlFor="logo-input">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{t('qr.logo_upload')}</span>
          </label>
        )}
        <input
          ref={fileInputRef}
          id="logo-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="logo-file-input"
        />
      </div>

      {preview && (
        <div className="logo-options">
          <label className="logo-option-label">
            <input
              type="range"
              min="10"
              max="40"
              value={logo.size || 25}
              onChange={e => setLogo(l => ({ ...l, size: Number(e.target.value) }))}
              className="logo-size-slider"
            />
            <span>{t('qr.logo_size')}: {logo.size || 25}%</span>
          </label>
          <label className="logo-option-check">
            <input
              type="checkbox"
              checked={logo.hideBackgroundDots !== false}
              onChange={e => setLogo(l => ({ ...l, hideBackgroundDots: e.target.checked }))}
            />
            <span>{t('qr.logo_hide_dots')}</span>
          </label>
        </div>
      )}
    </div>
  )
}
