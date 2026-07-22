import { useState } from 'react'

const TAB_ICONS = {
  wifi: '📶',
  website: '🌐',
  text: '📝',
  whatsapp: '💬',
  email: '📧',
  phone: '📞',
  sms: '✉️',
  vcard: '👤',
  location: '📍',
}

function formatTime(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return 'Ahora'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`
  return date.toLocaleDateString()
}

function getDataPreview(item) {
  switch (item.tab) {
    case 'wifi': return item.data.ssid || 'WiFi'
    case 'website': return item.data.url || 'URL'
    case 'text': return (item.data.text || '').slice(0, 30)
    case 'whatsapp': return item.data.phone || 'WhatsApp'
    case 'email': return item.data.to || 'Email'
    case 'phone': return item.data.number || 'Tel'
    case 'sms': return item.data.phone || 'SMS'
    case 'vcard': return item.data.name || 'Contacto'
    case 'location': return item.data.label || `${item.data.lat}, ${item.data.lng}`
    default: return ''
  }
}

export default function HistoryPanel({ history, onRestore, onRemove, onClear, t }) {
  const [isOpen, setIsOpen] = useState(false)

  if (history.length === 0) return null

  return (
    <div className="history-section">
      <button
        className="history-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🕐</span>
        <span>{t('history.title')}</span>
        <span className="history-count">{history.length}</span>
        <span className={`toggle-arrow${isOpen ? ' open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="history-panel">
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className="history-item">
                <button
                  className="history-item-btn"
                  onClick={() => onRestore(item)}
                >
                  <span className="history-icon">{TAB_ICONS[item.tab] || '📱'}</span>
                  <div className="history-item-info">
                    <span className="history-item-type">{item.tab}</span>
                    <span className="history-item-data">{getDataPreview(item)}</span>
                  </div>
                  <span className="history-item-time">{formatTime(item.timestamp)}</span>
                </button>
                <button
                  className="history-remove-btn"
                  onClick={(e) => { e.stopPropagation(); onRemove(item.id) }}
                  title={t('history.remove')}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="history-clear-btn" onClick={onClear}>
            {t('history.clear')}
          </button>
        </div>
      )}
    </div>
  )
}
