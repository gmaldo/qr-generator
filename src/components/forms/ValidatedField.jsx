export default function ValidatedField({ label, error, children }) {
  return (
    <div className="field-group">
      {label && <label className="field-label">{label}</label>}
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}
