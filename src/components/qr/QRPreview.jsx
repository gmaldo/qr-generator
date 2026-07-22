export default function QRPreview({ qrContainerRef, qrValue, t, qrSize }) {
  return (
    <div className={`qr-frame${qrValue ? ' has-qr' : ' empty'}`}>
      <div
        ref={qrContainerRef}
        className={`qr-render${!qrValue ? ' qr-render--empty' : ''}`}
        style={{ width: qrSize, height: qrSize }}
      />
      {!qrValue && (
        <div className="qr-placeholder-overlay">
          <span className="qr-placeholder-icon">📱</span>
          <p className="qr-placeholder-text">{t('qr.fill_fields')}</p>
        </div>
      )}
    </div>
  )
}
