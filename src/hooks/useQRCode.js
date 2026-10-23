import { useRef, useEffect, useCallback } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { PRESETS } from '../config/constants'

export default function useQRCode({ qrStyle, activePreset, getQRValue, qrSize, logo, qrShape }) {
  const qrContainerRef = useRef(null)
  const qrInstanceRef = useRef(null)
  const prevLogoRef = useRef(logo?.image || null)

  const buildQROptions = useCallback((value, preset, style) => {
    const p = PRESETS.find(p => p.id === preset) || PRESETS[0]

    // One ink for the whole symbol: the same colour or the same gradient
    // feeds dots and both corner pieces, because a code whose corners fade
    // on a different axis than its body reads as a misprint.
    const ink = style.gradient
      ? {
          gradient: {
            type: style.gradientType === 'radial' ? 'radial' : 'linear',
            rotation: ((style.gradientAngle || 0) * Math.PI) / 180,
            colorStops: [
              { offset: 0, color: style.fg },
              { offset: 1, color: style.fg2 || style.fg },
            ],
          },
        }
      : { color: style.fg }

    const opts = {
      width: qrSize,
      height: qrSize,
      type: 'svg',
      shape: qrShape,
      data: value || 'https://placeholder.com',
      dotsOptions: {
        type: p.dotsType,
        ...ink,
      },
      cornersSquareOptions: {
        type: p.cornersSquareType,
        ...ink,
      },
      cornersDotOptions: {
        type: p.cornersDotType,
        ...ink,
      },
      backgroundOptions: {
        color: style.bg,
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
  }, [qrSize, logo, qrShape])

  const recreateInstance = useCallback(() => {
    const qrValue = getQRValue()
    const opts = buildQROptions(qrValue, activePreset, qrStyle)
    qrInstanceRef.current = new QRCodeStyling(opts)
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = ''
      qrInstanceRef.current.append(qrContainerRef.current)
    }
  }, [getQRValue, buildQROptions, activePreset, qrStyle])

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
    const opts = buildQROptions(qrValue, activePreset, qrStyle)
    qrInstanceRef.current.update(opts)
  }, [getQRValue, activePreset, qrStyle, buildQROptions, logo?.image, recreateInstance])

  return { qrContainerRef, qrInstanceRef }
}
