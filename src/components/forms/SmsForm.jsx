export default function SmsForm({ data, setData, t, ic, tc }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('sms.phone')}</label>
        <input type="tel" value={data.phone}
          onChange={e => setData({ ...data, phone: e.target.value })}
          placeholder={t('sms.phone_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('sms.message')}</label>
        <textarea value={data.message}
          onChange={e => setData({ ...data, message: e.target.value })}
          placeholder={t('sms.message_ph')} rows={5} className={tc} />
      </div>
    </div>
  )
}
