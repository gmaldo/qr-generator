import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function EventForm({ data, setData, t, ic, tc }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <ValidatedField label={t('event.title')} error={errors.title}>
        <input type="text" value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          onBlur={e => validate('title', e.target.value, 'required', t('error.required'))}
          placeholder={t('event.title_ph')} className={`${ic}${errors.title ? ' field-invalid' : ''}`}
          autoCorrect="off" spellCheck="false" autoComplete="off" />
      </ValidatedField>

      <div className="field-row-2">
        <ValidatedField label={t('event.start')} error={errors.start}>
          <input type="datetime-local" value={data.start}
            onChange={e => setData({ ...data, start: e.target.value })}
            onBlur={e => validate('start', e.target.value, 'required', t('error.required'))}
            className={`${ic}${errors.start ? ' field-invalid' : ''}`} />
        </ValidatedField>
        <ValidatedField label={t('event.end')}>
          <input type="datetime-local" value={data.end}
            onChange={e => setData({ ...data, end: e.target.value })}
            className={ic} />
        </ValidatedField>
      </div>

      <ValidatedField label={t('event.location')}>
        <input type="text" value={data.location}
          onChange={e => setData({ ...data, location: e.target.value })}
          placeholder={t('event.location_ph')} className={ic}
          autoCorrect="off" spellCheck="false" autoComplete="off" />
      </ValidatedField>

      <ValidatedField label={t('event.description')}>
        <textarea value={data.description} rows="2"
          onChange={e => setData({ ...data, description: e.target.value })}
          placeholder={t('event.description_ph')} className={tc} />
      </ValidatedField>

      <p className="field-hint">{t('event.hint')}</p>
    </div>
  )
}
