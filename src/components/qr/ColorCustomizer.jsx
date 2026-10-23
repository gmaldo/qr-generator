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
          {/* The gradient runs from the ink colour to a second stop the user
              picks. Its controls only exist while it is on — offering a
              swatch or an angle that does nothing would be misleading. */}
          <label className="gradient-toggle">
            <input
              type="checkbox"
              checked={Boolean(qrStyle.gradient)}
              onChange={e => setQrStyle(s => ({ ...s, gradient: e.target.checked }))}
            />
            <span>{t('custom.gradient')}</span>
          </label>

          {qrStyle.gradient && (
            <div className="gradient-options">
              <div className="color-row">
                <label className="color-label">
                  <span>{t('custom.gradient_to')}</span>
                  <div className="color-swatch-wrap">
                    <div className="color-swatch" style={{ background: qrStyle.fg2 }} />
                    <input
                      type="color"
                      value={qrStyle.fg2}
                      onChange={e => setQrStyle(s => ({ ...s, fg2: e.target.value }))}
                      className="color-input"
                    />
                  </div>
                </label>
              </div>
              <div className="size-grid gradient-type-grid">
                {['linear', 'radial'].map(gt => (
                  <button
                    key={gt}
                    type="button"
                    className={`size-btn${(qrStyle.gradientType || 'linear') === gt ? ' size-active' : ''}`}
                    onClick={() => setQrStyle(s => ({ ...s, gradientType: gt }))}
                  >
                    {t(`custom.${gt}`)}
                  </button>
                ))}
              </div>
              {(qrStyle.gradientType || 'linear') === 'linear' && (
                <label className="color-label">
                  <span>{t('custom.angle')}: {qrStyle.gradientAngle ?? 45}°</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={qrStyle.gradientAngle ?? 45}
                    onChange={e => setQrStyle(s => ({ ...s, gradientAngle: Number(e.target.value) }))}
                    className="gradient-angle"
                  />
                </label>
              )}
            </div>
          )}

          <div className="color-actions-row">
            <button
              className="invert-colors-btn"
              onClick={() => setQrStyle(s => ({ ...s, fg: s.bg, bg: s.fg }))}
            >
              {t('custom.invert')}
            </button>
            <button
              className="reset-colors-btn"
              onClick={() => setQrStyle(s => ({ ...s, fg: '#000000', bg: '#ffffff', gradient: false }))}
            >
              {t('custom.reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
