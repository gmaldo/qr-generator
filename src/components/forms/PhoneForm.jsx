import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function PhoneForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('phone.number')} error={errors.number}>
        <input type="tel" value={data.number}
          onChange={e => setData({ number: e.target.value })}
          onBlur={e => validate('number', e.target.value, 'phone', t('error.invalid_phone'))}
          placeholder={t('phone.ph')} className={`${ic}${errors.number ? ' field-invalid' : ''}`} />
      </ValidatedField>
      <p className="field-hint">{t('phone.hint')}</p>
    </div>
  )
}
