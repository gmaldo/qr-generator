import { useState } from 'react'

const isStandalone = () =>
  window.navigator.standalone === true ||
  window.matchMedia('(display-mode: standalone)').matches

export default function DownloadActions({ qrInstanceRef, activeTab, qrValue, t, onSave }) {
  const [copied, setCopied] = useState(false)

  const downloadFile = async (extension) => {
    if (!qrInstanceRef.current || !qrValue) return
    const blob = await qrInstanceRef.current.getRawData(extension)
    const mime = extension === 'png' ? 'image/png' : 'image/svg+xml'
    const file = new File([blob], `qr-${activeTab}-${Date.now()}.${extension}`, { type: mime })

    if (isStandalone() && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Código QR' })
    } else {
      qrInstanceRef.current.download({ name: `qr-${activeTab}-${Date.now()}`, extension })
    }
    onSave?.()
  }

  const copyToClipboard = async () => {
    if (!qrInstanceRef.current || !qrValue) return
    try {
      const blob = await qrInstanceRef.current.getRawData('png')
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      onSave?.()
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  const shareFile = async (extension) => {
    if (!qrInstanceRef.current || !qrValue) return
    try {
      const blob = await qrInstanceRef.current.getRawData(extension)
      const mime = extension === 'png' ? 'image/png' : 'image/svg+xml'
      const file = new File([blob], `qr-${activeTab}.${extension}`, { type: mime })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Código QR' })
        onSave?.()
      }
    } catch {
      // share cancelled
    }
  }

  if (!qrValue) return null

  return (
    <div className="download-actions">
      <button onClick={() => downloadFile('png')} className={`download-btn btn-${activeTab}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        PNG
      </button>

      <button onClick={() => downloadFile('svg')} className={`download-btn-outline btn-outline-${activeTab}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        SVG
      </button>

      <button
        onClick={copyToClipboard}
        className={`download-btn-outline btn-outline-${activeTab}${copied ? ' copied' : ''}`}
      >
        {copied ? (
          <>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
            </svg>
            {t('qr.copied')}
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {t('qr.copy')}
          </>
        )}
      </button>

      <button onClick={() => shareFile('png')} className={`download-btn-outline btn-outline-${activeTab}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {t('qr.sharePng')}
      </button>

      <button onClick={() => shareFile('svg')} className={`download-btn-outline btn-outline-${activeTab}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {t('qr.shareSvg')}
      </button>
    </div>
  )
}
