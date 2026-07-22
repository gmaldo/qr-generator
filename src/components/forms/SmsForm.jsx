import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function SmsForm({ data, setData, t, ic, tc }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('sms.phone')} error={errors.phone}>
        <input type="tel" value={data.phone}
          onChange={e => setData({ ...data, phone: e.target.value })}
          onBlur={e => validate('phone', e.target.value, 'phone', t('error.invalid_phone'))}
          placeholder={t('sms.phone_ph')} className={`${ic}${errors.phone ? ' field-invalid' : ''}`} />
      </ValidatedField>
      <div className="field-group">
        <label className="field-label">{t('sms.message')}</label>
        <textarea value={data.message}
          onChange={e => setData({ ...data, message: e.target.value })}
          placeholder={t('sms.message_ph')} rows={5} className={tc} />
      </div>
    </div>
  )
}
