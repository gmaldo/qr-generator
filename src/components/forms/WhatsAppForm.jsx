import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function WhatsAppForm({ data, setData, t, ic, tc }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('whatsapp.phone')} error={errors.phone}>
        <input type="text" value={data.phone}
          onChange={e => setData({ ...data, phone: e.target.value })}
          onBlur={e => validate('phone', e.target.value, 'phone', t('error.invalid_phone'))}
          placeholder={t('whatsapp.phone_ph')} className={`${ic}${errors.phone ? ' field-invalid' : ''}`} />
      </ValidatedField>
      <div className="field-group">
        <label className="field-label">{t('whatsapp.message')}</label>
        <textarea value={data.message}
          onChange={e => setData({ ...data, message: e.target.value })}
          placeholder={t('whatsapp.message_ph')} rows={5} className={tc} />
      </div>
    </div>
  )
}
