export default function ColorCustomizer({ qrStyle, setQrStyle, t }) {
  return (
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
  )
}
