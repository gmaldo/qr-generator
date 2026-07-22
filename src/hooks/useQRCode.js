import { useRef, useEffect, useCallback } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { PRESETS, QR_SIZE } from '../config/constants'

export default function useQRCode({ activeTab, qrStyle, activePreset, getQRValue }) {
  const qrContainerRef = useRef(null)
  const qrInstanceRef = useRef(null)

  const buildQROptions = useCallback((value, preset, fg, bg) => {
    const p = PRESETS.find(p => p.id === preset) || PRESETS[0]
    return {
      width: QR_SIZE,
      height: QR_SIZE,
      type: 'svg',
      data: value || 'https://placeholder.com',
      dotsOptions: {
        type: p.dotsType,
        color: fg,
      },
      cornersSquareOptions: {
        type: p.cornersSquareType,
        color: fg,
      },
      cornersDotOptions: {
        type: p.cornersDotType,
        color: fg,
      },
      backgroundOptions: {
        color: bg,
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    }
  }, [])

  // Initialize QR instance once
  useEffect(() => {
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current = new QRCodeStyling(opts)
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ''
      qrInstanceRef.current.append(qrContainerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update QR when data changes
  useEffect(() => {
    if (!qrInstanceRef.current) return
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current.update(opts)
  }, [getQRValue, activePreset, qrStyle.fg, qrStyle.bg, buildQROptions])

  const downloadQR = async () => {
    const qrValue = getQRValue()
    if (!qrInstanceRef.current || !qrValue) return
    const fileName = `qr-${activeTab}-${Date.now()}.png`

    if (navigator.canShare) {
      try {
        const blob = await qrInstanceRef.current.getRawData('png')
        const file = new File([blob], fileName, { type: 'image/png' })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Código QR' })
          return
        }
      } catch {
        // user cancelled or share failed — fall through to download
      }
    }

    qrInstanceRef.current.download({ name: `qr-${activeTab}-${Date.now()}`, extension: 'png' })
  }

  return { qrContainerRef, downloadQR, QR_SIZE }
}
