import WifiForm from './WifiForm'
import WebsiteForm from './WebsiteForm'
import TextForm from './TextForm'
import WhatsAppForm from './WhatsAppForm'
import EmailForm from './EmailForm'
import PhoneForm from './PhoneForm'
import SmsForm from './SmsForm'
import VcardForm from './VcardForm'
import LocationForm from './LocationForm'
import EventForm from './EventForm'
import InstagramForm from './InstagramForm'
import TwitterForm from './TwitterForm'
import YouTubeForm from './YouTubeForm'
import TiktokForm from './TiktokForm'
import LinkedinForm from './LinkedinForm'
import TelegramForm from './TelegramForm'

const FORM_MAP = {
  wifi: WifiForm,
  website: WebsiteForm,
  text: TextForm,
  whatsapp: WhatsAppForm,
  email: EmailForm,
  phone: PhoneForm,
  sms: SmsForm,
  vcard: VcardForm,
  location: LocationForm,
  event: EventForm,
  instagram: InstagramForm,
  twitter: TwitterForm,
  youtube: YouTubeForm,
  tiktok: TiktokForm,
  linkedin: LinkedinForm,
  telegram: TelegramForm,
}

export default function FormSwitch({ activeTab, formData, setFormData, t, ic, tc }) {
  const FormComponent = FORM_MAP[activeTab]
  if (!FormComponent) return null

  return <FormComponent data={formData} setData={setFormData} t={t} ic={ic} tc={tc} />
}
