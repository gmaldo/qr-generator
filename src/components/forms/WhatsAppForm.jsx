export default function WhatsAppForm({ data, setData, t, ic, tc }) {
  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('whatsapp.phone')}</label>
        <input type="text" value={data.phone}
          onChange={e => setData({ ...data, phone: e.target.value })}
          placeholder={t('whatsapp.phone_ph')} className={ic} />
      </div>
      <div className="field-group">
        <label className="field-label">{t('whatsapp.message')}</label>
        <textarea value={data.message}
          onChange={e => setData({ ...data, message: e.target.value })}
          placeholder={t('whatsapp.message_ph')} rows={5} className={tc} />
      </div>
    </div>
  )
}
