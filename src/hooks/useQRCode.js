import { useRef, useEffect, useCallback } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { PRESETS } from '../config/constants'

export default function useQRCode({ qrStyle, activePreset, getQRValue, qrSize, logo }) {
  const qrContainerRef = useRef(null)
  const qrInstanceRef = useRef(null)
  const prevLogoRef = useRef(logo?.image || null)

  const buildQROptions = useCallback((value, preset, fg, bg) => {
    const p = PRESETS.find(p => p.id === preset) || PRESETS[0]
    const opts = {
      width: qrSize,
      height: qrSize,
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

    if (logo?.image) {
      opts.image = logo.image
      opts.imageOptions = {
        hideBackgroundDots: logo.hideBackgroundDots !== false,
        imageSize: (logo.size || 25) / 100,
        margin: 4,
      }
    }

    return opts
  }, [qrSize, logo])

  const recreateInstance = useCallback(() => {
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current = new QRCodeStyling(opts)
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ''
      qrInstanceRef.current.append(qrContainerRef.current)
    }
  }, [getQRValue, buildQROptions, activePreset, qrStyle.fg, qrStyle.bg])

  useEffect(() => {
    recreateInstance()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!qrInstanceRef.current) return

    const logoAdded = !prevLogoRef.current && logo?.image
    const logoRemoved = prevLogoRef.current && !logo?.image
    prevLogoRef.current = logo?.image || null

    if (logoRemoved || logoAdded) {
      recreateInstance()
      return
    }

    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle.fg, qrStyle.bg)
    qrInstanceRef.current.update(opts)
  }, [getQRValue, activePreset, qrStyle.fg, qrStyle.bg, buildQROptions, logo?.image, recreateInstance])

  return { qrContainerRef, qrInstanceRef }
}
