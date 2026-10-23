export default function ShapeSelector({ shapes = [], activeShape, onSelect, t }) {
  return (
    <div className="size-section">
      <span className="size-label">{t('shape.label')}</span>
      <div className="size-grid" role="radiogroup" aria-label={t('shape.label')}>
        {shapes.map(shape => {
          const isActive = activeShape === shape.id
          return (
            <button
              key={shape.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`size-btn${isActive ? ' size-active' : ''}`}
              onClick={() => onSelect(shape.id)}
            >
              {t(`shape.${shape.id}`)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
