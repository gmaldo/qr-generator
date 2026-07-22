export default function PresetPreview({ preset }) {
  const s = 36
  const dotR = preset.dotsType === 'dots' || preset.dotsType === 'extra-rounded' ? 2.5
    : preset.dotsType === 'rounded' || preset.dotsType === 'classy-rounded' ? 1.5
      : 0
  const cornerR = preset.cornersSquareType === 'extra-rounded' ? 3
    : preset.cornersSquareType === 'dot' ? 4
      : 0

  const dots = []
  const gap = 6, dotSize = 4, startX = 10, startY = 10
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if ((r === 0 && c === 0) || (r === 0 && c === 3) || (r === 3 && c === 0)) continue
      const x = startX + c * gap
      const y = startY + r * gap
      dots.push(
        <rect key={`${r}-${c}`} x={x} y={y} width={dotSize} height={dotSize} rx={dotR} fill="currentColor" />
      )
    }
  }

  const corners = [
    { x: startX, y: startY },
    { x: startX + 3 * gap, y: startY },
    { x: startX, y: startY + 3 * gap },
  ]

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" className="preset-svg">
      <rect width={s} height={s} rx="4" fill="transparent" />
      {dots}
      {corners.map((c, i) => (
        <g key={i}>
          <rect x={c.x - 1} y={c.y - 1} width={dotSize + 8} height={dotSize + 8} rx={cornerR} stroke="currentColor" strokeWidth="1.5" fill="none" />
          <rect x={c.x + 1.5} y={c.y + 1.5} width={dotSize + 3} height={dotSize + 3} rx={Math.max(0, cornerR - 1.5)} fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}
