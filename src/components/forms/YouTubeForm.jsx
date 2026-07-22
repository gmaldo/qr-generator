import ValidatedField from './ValidatedField'
import useValidation from './useValidation'

export default function YouTubeForm({ data, setData, t, ic }) {
  const { errors, validate } = useValidation()

  return (
    <div className="form-section">
      <div className="field-group">
        <label className="field-label">{t('youtube.type')}</label>
        <div className="security-group">
          <button
            onClick={() => setData({ ...data, type: 'channel' })}
            className={`sec-btn${data.type === 'channel' ? ' sec-active' : ''}`}
          >
            {t('youtube.channel')}
          </button>
          <button
            onClick={() => setData({ ...data, type: 'video' })}
            className={`sec-btn${data.type === 'video' ? ' sec-active' : ''}`}
          >
            {t('youtube.video')}
          </button>
        </div>
      </div>

      {data.type === 'video' ? (
        <ValidatedField label={t('youtube.video_id')} error={errors.videoId}>
          <input type="text" value={data.videoId || ''}
            onChange={e => setData({ ...data, videoId: e.target.value })}
            onBlur={e => validate('videoId', e.target.value, 'required', t('error.required'))}
            placeholder={t('youtube.video_id_ph')} className={`${ic}${errors.videoId ? ' field-invalid' : ''}`}
            autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
        </ValidatedField>
      ) : (
        <ValidatedField label={t('youtube.handle')} error={errors.handle}>
          <input type="text" value={data.handle || ''}
            onChange={e => setData({ ...data, handle: e.target.value })}
            onBlur={e => validate('handle', e.target.value, 'required', t('error.required'))}
            placeholder={t('youtube.handle_ph')} className={`${ic}${errors.handle ? ' field-invalid' : ''}`}
            autoCorrect="off" autoCapitalize="none" spellCheck="false" autoComplete="off" />
        </ValidatedField>
      )}

      <p className="field-hint">{t('youtube.hint')}</p>
    </div>
  )
}
