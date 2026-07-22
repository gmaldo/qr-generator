export default function SizeSelector({ sizes, activeSize, onSelect, t }) {
  return (
    <div className="size-section">
      <span className="size-label">{t('qr.size')}</span>
      <div className="size-grid">
        {sizes.map(size => (
          <button
            key={size.value}
            className={`size-btn${activeSize === size.value ? ' size-active' : ''}`}
            onClick={() => onSelect(size.value)}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}
