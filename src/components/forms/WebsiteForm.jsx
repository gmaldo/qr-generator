export default function WebsiteForm({ data, setData, t, ic }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('website.url')}</label>
        <input type="text" value={data.url}
          onChange={e => setData({ url: e.target.value })}
          placeholder={t('website.url_ph')} className={ic}
          autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
      </div>
    </div>
  )
}
