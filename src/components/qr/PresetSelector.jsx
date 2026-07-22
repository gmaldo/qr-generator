import PresetPreview from './PresetPreview'

export default function PresetSelector({ presets, activePreset, onSelect, t }) {
  return (
    <div className="preset-section">
      <span className="preset-label">{t('qr.style')}</span>
      <div className="preset-grid">
        {presets.map(preset => (
          <button
            key={preset.id}
            className={`preset-btn${activePreset === preset.id ? ' preset-active' : ''}`}
            onClick={() => onSelect(preset.id)}
          >
            <PresetPreview preset={preset} />
            <span className="preset-name">{t(`preset.${preset.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
