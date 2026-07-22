export default function TextForm({ data, setData, t, tc }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('text.label')}</label>
        <textarea value={data.text}
          onChange={e => setData({ text: e.target.value })}
          placeholder={t('text.ph')} rows={7} className={tc} />
      </div>
    </div>
  )
}
