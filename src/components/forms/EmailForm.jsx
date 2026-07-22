export default function EmailForm({ data, setData, t, ic, tc }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('email.to')}</label>
        <input type="email" value={data.to}
          onChange={e => setData({ ...data, to: e.target.value })}
          placeholder={t('email.to_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('email.subject')}</label>
        <input type="text" value={data.subject}
          onChange={e => setData({ ...data, subject: e.target.value })}
          placeholder={t('email.subject_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('email.body')}</label>
        <textarea value={data.body}
          onChange={e => setData({ ...data, body: e.target.value })}
          placeholder={t('email.body_ph')} rows={4} className={tc} />
      </div>
    </div>
  )
}
