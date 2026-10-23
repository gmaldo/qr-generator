export const translations = {
  es: {
    // Header
    'header.badge': '✦ QR Generator',
    'header.title': 'Generador de QR',
    'header.subtitle': 'Creá códigos QR en segundos, sin límites',

    // Theme
    'theme.to_light': 'Cambiar a modo claro',
    'theme.to_dark': 'Cambiar a modo oscuro',
    'theme.light': 'Modo claro',
    'theme.dark': 'Modo oscuro',

    // Tabs
    'tab.wifi': 'WiFi',
    'tab.website': 'Web',
    'tab.text': 'Texto',
    'tab.whatsapp': 'WhatsApp',
    'tab.email': 'Email',
    'tab.phone': 'Teléfono',
    'tab.sms': 'SMS',
    'tab.vcard': 'Contacto',
    'tab.location': 'Ubicación',
    'tab.instagram': 'Instagram',
    'tab.twitter': 'X/Twitter',
    'tab.youtube': 'YouTube',
    'tab.event': 'Evento',
    'tab.tiktok': 'TikTok',
    'tab.linkedin': 'LinkedIn',
    'tab.telegram': 'Telegram',
    'tabs.more': 'Más',
    'tabs.less': 'Menos',

    // WiFi
    'wifi.ssid': 'Nombre WiFi (SSID)',
    'wifi.ssid_ph': 'MiRedWiFi',
    'wifi.password': 'Contraseña',
    'wifi.password_ph': '••••••••',
    'wifi.security': 'Seguridad',
    'wifi.open': 'Abierto',

    // Website
    'website.url': 'URL del sitio',
    'website.url_ph': 'www.ejemplo.com',

    // Text
    'text.label': 'Texto o mensaje',
    'text.ph': 'Escribe tu mensaje aquí...',

    // WhatsApp
    'whatsapp.phone': 'Número de teléfono',
    'whatsapp.phone_ph': '+5491123456789',
    'whatsapp.message': 'Mensaje predefinido',
    'whatsapp.message_ph': 'Hola, me gustaría consultar...',

    // Email
    'email.to': 'Destinatario',
    'email.to_ph': 'ejemplo@correo.com',
    'email.subject': 'Asunto',
    'email.subject_ph': 'Consulta sobre...',
    'email.body': 'Cuerpo',
    'email.body_ph': 'Hola, quería consultarles...',

    // Phone
    'phone.number': 'Número de teléfono',
    'phone.ph': '+5491123456789',
    'phone.hint': 'Al escanear el QR se iniciará una llamada directa.',

    // SMS
    'sms.phone': 'Número de teléfono',
    'sms.phone_ph': '+5491123456789',
    'sms.message': 'Mensaje predefinido',
    'sms.message_ph': 'Hola! Te escribo porque...',

    // vCard
    'vcard.name': 'Nombre completo *',
    'vcard.name_ph': 'Juan García',
    'vcard.phone': 'Teléfono',
    'vcard.email': 'Email',
    'vcard.org': 'Organización',
    'vcard.org_ph': 'Empresa S.A.',
    'vcard.url': 'Sitio web',
    'vcard.url_ph': 'www.empresa.com',

    // Location
    'location.search': 'Buscar lugar',
    'location.search_ph': 'Buscar dirección o lugar...',
    'location.gps': 'Usar mi ubicación GPS',
    'location.manual': '✏️ Manual',
    'location.map': '🗺️ Mapa',
    'location.map_hint': 'Hacé clic en el mapa para poner un pin. También podés arrastrarlo.',
    'location.lat': 'Latitud',
    'location.lng': 'Longitud',
    'location.place': 'Nombre del lugar (opcional)',
    'location.place_ph': 'Obelisco, Buenos Aires',
    'location.hint': 'Al escanear abrirá Google Maps con la ubicación.',
    'location.map_aria': 'Seleccioná una ubicación en el mapa',
    'location.pin_selected': 'Pin seleccionado',

    // QR section
    'qr.preview': 'Vista previa',
    'qr.fill_fields': 'Completá los campos',
    'qr.style': 'Estilo del QR',
    'qr.size': 'Tamaño del QR',
    'qr.download': 'Descargar PNG',
    'qr.copy': 'Copiar',
    'qr.copied': '¡Copiado!',
    'qr.share': 'Compartir',
    'qr.sharePng': 'Compartir PNG',
    'qr.shareSvg': 'Compartir SVG',
    'qr.share_title': 'Código QR',
    'qr.logo': 'Logo central',
    'qr.logo_upload': 'Subir imagen',
    'qr.logo_size': 'Tamaño',
    'qr.logo_hide_dots': 'Ocultar puntos debajo del logo',
    'qr.logo_remove': 'Quitar logo',
    'qr.reset_style': 'Restablecer estilo',

    // Shape
    'shape.label': 'Forma del código',
    'shape.square': 'Cuadrado',
    'shape.circle': 'Círculo',

    // History
    'history.title': 'Historial',
    'history.remove': 'Eliminar',
    'history.clear': 'Limpiar historial',
    'history.now': 'Ahora',

    // Instagram
    'instagram.username': 'Usuario de Instagram',
    'instagram.username_ph': 'ej. usuario',
    'instagram.hint': 'El QR enlaza al perfil público del usuario.',

    // Twitter/X
    'twitter.username': 'Usuario de X (Twitter)',
    'twitter.username_ph': 'ej. usuario',
    'twitter.hint': 'El QR enlaza al perfil del usuario en X (Twitter).',

    // YouTube
    'youtube.type': 'Tipo',
    'youtube.channel': 'Canal',
    'youtube.video': 'Video',
    'youtube.handle': 'Handle del canal',
    'youtube.handle_ph': 'ej. usuario',
    'youtube.video_id': 'ID del video',
    'youtube.video_id_ph': 'ej. dQw4w9WgXcQ',
    'youtube.hint': 'El QR enlaza al canal o video específico de YouTube.',

    // Event
    'event.title': 'Título del evento',
    'event.title_ph': 'ej. Cumpleaños de Ana',
    'event.start': 'Inicio',
    'event.end': 'Fin',
    'event.location': 'Lugar',
    'event.location_ph': 'ej. Salón de fiestas',
    'event.description': 'Descripción',
    'event.description_ph': 'Detalles del evento...',
    'event.hint': 'El QR agrega el evento al calendario de quien lo escanea.',

    // TikTok
    'tiktok.username': 'Usuario de TikTok',
    'tiktok.username_ph': 'ej. usuario',
    'tiktok.hint': 'El QR enlaza al perfil público de TikTok.',

    // LinkedIn
    'linkedin.type': 'Tipo',
    'linkedin.profile': 'Perfil',
    'linkedin.company': 'Empresa',
    'linkedin.username': 'Usuario',
    'linkedin.username_ph': 'ej. nombre-apellido-123',
    'linkedin.company_ph': 'ej. mi-empresa',
    'linkedin.hint': 'El QR enlaza al perfil o página de empresa.',

    // Telegram
    'telegram.username': 'Usuario de Telegram',
    'telegram.username_ph': 'ej. usuario',
    'telegram.hint': 'El QR abre el chat o canal en Telegram.',

    // Presets
    'preset.classic': 'Clásico',
    'preset.rounded': 'Redondeado',
    'preset.dots': 'Puntos',
    'preset.classy': 'Elegante',
    'preset.classy-rounded': 'Mixto',
    'preset.extra-rounded': 'Fluido',
    'preset.pixel': 'Píxel',
    'preset.orbit': 'Órbita',
    'preset.frame': 'Marco',
    'preset.beads': 'Perlas',
    'preset.halo': 'Halo',

    // Customizer
    'custom.title': 'Personalizar colores',
    'custom.qr_color': 'Color del QR',
    'custom.bg_color': 'Color de fondo',
    'custom.reset': 'Restablecer colores',
    'custom.invert': 'Invertir colores',
    'custom.gradient': 'Degradado',
    'custom.gradient_to': 'Color final',
    'custom.linear': 'Lineal',
    'custom.radial': 'Radial',
    'custom.angle': 'Ángulo',

    // Errors
    'error.required': 'Este campo es obligatorio',
    'error.invalid_url': 'Ingresá una URL válida',
    'error.invalid_phone': 'Ingresá un teléfono válido (mín. 8 dígitos)',
    'error.invalid_email': 'Ingresá un email válido',
    'error.invalid_coords': 'Ingresá una coordenada válida',

    // Footer
    'footer.powered': 'Powered by qr-code-styling',
  },

  en: {
    // Header
    'header.badge': '✦ QR Generator',
    'header.title': 'QR Generator',
    'header.subtitle': 'Create QR codes in seconds, no limits',

    // Theme
    'theme.to_light': 'Switch to light mode',
    'theme.to_dark': 'Switch to dark mode',
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',

    // Tabs
    'tab.wifi': 'WiFi',
    'tab.website': 'Web',
    'tab.text': 'Text',
    'tab.whatsapp': 'WhatsApp',
    'tab.email': 'Email',
    'tab.phone': 'Phone',
    'tab.sms': 'SMS',
    'tab.vcard': 'Contact',
    'tab.location': 'Location',
    'tab.instagram': 'Instagram',
    'tab.twitter': 'X/Twitter',
    'tab.youtube': 'YouTube',
    'tab.event': 'Event',
    'tab.tiktok': 'TikTok',
    'tab.linkedin': 'LinkedIn',
    'tab.telegram': 'Telegram',
    'tabs.more': 'More',
    'tabs.less': 'Less',

    // WiFi
    'wifi.ssid': 'WiFi Name (SSID)',
    'wifi.ssid_ph': 'MyWiFiNetwork',
    'wifi.password': 'Password',
    'wifi.password_ph': '••••••••',
    'wifi.security': 'Security',
    'wifi.open': 'Open',

    // Website
    'website.url': 'Website URL',
    'website.url_ph': 'www.example.com',

    // Text
    'text.label': 'Text or message',
    'text.ph': 'Write your message here...',

    // WhatsApp
    'whatsapp.phone': 'Phone number',
    'whatsapp.phone_ph': '+12025551234',
    'whatsapp.message': 'Predefined message',
    'whatsapp.message_ph': 'Hi, I would like to enquire...',

    // Email
    'email.to': 'Recipient',
    'email.to_ph': 'example@email.com',
    'email.subject': 'Subject',
    'email.subject_ph': 'Inquiry about...',
    'email.body': 'Body',
    'email.body_ph': 'Hello, I wanted to ask...',

    // Phone
    'phone.number': 'Phone number',
    'phone.ph': '+12025551234',
    'phone.hint': 'Scanning the QR will start a direct call.',

    // SMS
    'sms.phone': 'Phone number',
    'sms.phone_ph': '+12025551234',
    'sms.message': 'Predefined message',
    'sms.message_ph': "Hi! I'm writing because...",

    // vCard
    'vcard.name': 'Full name *',
    'vcard.name_ph': 'John Smith',
    'vcard.phone': 'Phone',
    'vcard.email': 'Email',
    'vcard.org': 'Organization',
    'vcard.org_ph': 'Company Inc.',
    'vcard.url': 'Website',
    'vcard.url_ph': 'www.company.com',

    // Location
    'location.search': 'Search place',
    'location.search_ph': 'Search address or place...',
    'location.gps': 'Use my GPS location',
    'location.manual': '✏️ Manual',
    'location.map': '🗺️ Map',
    'location.map_hint': 'Click on the map to place a pin. You can also drag it.',
    'location.lat': 'Latitude',
    'location.lng': 'Longitude',
    'location.place': 'Place name (optional)',
    'location.place_ph': 'Times Square, New York',
    'location.hint': 'Scanning will open Google Maps with the location.',
    'location.map_aria': 'Pick a location on the map',
    'location.pin_selected': 'Selected pin',

    // QR section
    'qr.preview': 'Preview',
    'qr.fill_fields': 'Fill in the fields',
    'qr.style': 'QR Style',
    'qr.size': 'QR Size',
    'qr.download': 'Download PNG',
    'qr.copy': 'Copy',
    'qr.copied': 'Copied!',
    'qr.share': 'Share',
    'qr.sharePng': 'Share PNG',
    'qr.shareSvg': 'Share SVG',
    'qr.share_title': 'QR Code',
    'qr.logo': 'Center logo',
    'qr.logo_upload': 'Upload image',
    'qr.logo_size': 'Size',
    'qr.logo_hide_dots': 'Hide dots under logo',
    'qr.logo_remove': 'Remove logo',
    'qr.reset_style': 'Reset style',

    // Shape
    'shape.label': 'Code shape',
    'shape.square': 'Square',
    'shape.circle': 'Circle',

    // History
    'history.title': 'History',
    'history.remove': 'Remove',
    'history.clear': 'Clear history',
    'history.now': 'Now',

    // Instagram
    'instagram.username': 'Instagram username',
    'instagram.username_ph': 'e.g. username',
    'instagram.hint': 'The QR links to the user\'s public profile.',

    // Twitter/X
    'twitter.username': 'X (Twitter) username',
    'twitter.username_ph': 'e.g. username',
    'twitter.hint': 'The QR links to the user\'s profile on X (Twitter).',

    // YouTube
    'youtube.type': 'Type',
    'youtube.channel': 'Channel',
    'youtube.video': 'Video',
    'youtube.handle': 'Channel handle',
    'youtube.handle_ph': 'e.g. username',
    'youtube.video_id': 'Video ID',
    'youtube.video_id_ph': 'e.g. dQw4w9WgXcQ',
    'youtube.hint': 'The QR links to a specific YouTube channel or video.',

    // Event
    'event.title': 'Event title',
    'event.title_ph': 'e.g. Ana\'s birthday',
    'event.start': 'Starts',
    'event.end': 'Ends',
    'event.location': 'Location',
    'event.location_ph': 'e.g. City hall',
    'event.description': 'Description',
    'event.description_ph': 'Event details...',
    'event.hint': 'The QR adds the event to the scanner\'s calendar.',

    // TikTok
    'tiktok.username': 'TikTok username',
    'tiktok.username_ph': 'e.g. username',
    'tiktok.hint': 'The QR links to the public TikTok profile.',

    // LinkedIn
    'linkedin.type': 'Type',
    'linkedin.profile': 'Profile',
    'linkedin.company': 'Company',
    'linkedin.username': 'Username',
    'linkedin.username_ph': 'e.g. firstname-lastname-123',
    'linkedin.company_ph': 'e.g. my-company',
    'linkedin.hint': 'The QR links to the profile or company page.',

    // Telegram
    'telegram.username': 'Telegram username',
    'telegram.username_ph': 'e.g. username',
    'telegram.hint': 'The QR opens the chat or channel in Telegram.',

    // Presets
    'preset.classic': 'Classic',
    'preset.rounded': 'Rounded',
    'preset.dots': 'Dots',
    'preset.classy': 'Classy',
    'preset.classy-rounded': 'Mixed',
    'preset.extra-rounded': 'Fluid',
    'preset.pixel': 'Pixel',
    'preset.orbit': 'Orbit',
    'preset.frame': 'Frame',
    'preset.beads': 'Beads',
    'preset.halo': 'Halo',

    // Customizer
    'custom.title': 'Customize colors',
    'custom.qr_color': 'QR color',
    'custom.bg_color': 'Background color',
    'custom.reset': 'Reset colors',
    'custom.invert': 'Invert colors',
    'custom.gradient': 'Gradient',
    'custom.gradient_to': 'End colour',
    'custom.linear': 'Linear',
    'custom.radial': 'Radial',
    'custom.angle': 'Angle',

    // Errors
    'error.required': 'This field is required',
    'error.invalid_url': 'Enter a valid URL',
    'error.invalid_phone': 'Enter a valid phone (min. 8 digits)',
    'error.invalid_email': 'Enter a valid email',
    'error.invalid_coords': 'Enter valid coordinates',

    // Footer
    'footer.powered': 'Powered by qr-code-styling',
  },

  pt: {
    // Header
    'header.badge': '✦ QR Generator',
    'header.title': 'Gerador de QR',
    'header.subtitle': 'Crie códigos QR em segundos, sem limites',

    // Theme
    'theme.to_light': 'Mudar para modo claro',
    'theme.to_dark': 'Mudar para modo escuro',
    'theme.light': 'Modo claro',
    'theme.dark': 'Modo escuro',

    // Tabs
    'tab.wifi': 'WiFi',
    'tab.website': 'Web',
    'tab.text': 'Texto',
    'tab.whatsapp': 'WhatsApp',
    'tab.email': 'Email',
    'tab.phone': 'Telefone',
    'tab.sms': 'SMS',
    'tab.vcard': 'Contato',
    'tab.location': 'Localização',
    'tab.instagram': 'Instagram',
    'tab.twitter': 'X/Twitter',
    'tab.youtube': 'YouTube',
    'tab.event': 'Evento',
    'tab.tiktok': 'TikTok',
    'tab.linkedin': 'LinkedIn',
    'tab.telegram': 'Telegram',
    'tabs.more': 'Mais',
    'tabs.less': 'Menos',

    // WiFi
    'wifi.ssid': 'Nome WiFi (SSID)',
    'wifi.ssid_ph': 'MinhaRedeWiFi',
    'wifi.password': 'Senha',
    'wifi.password_ph': '••••••••',
    'wifi.security': 'Segurança',
    'wifi.open': 'Aberto',

    // Website
    'website.url': 'URL do site',
    'website.url_ph': 'www.exemplo.com',

    // Text
    'text.label': 'Texto ou mensagem',
    'text.ph': 'Escreva sua mensagem aqui...',

    // WhatsApp
    'whatsapp.phone': 'Número de telefone',
    'whatsapp.phone_ph': '+5511999999999',
    'whatsapp.message': 'Mensagem predefinida',
    'whatsapp.message_ph': 'Olá, gostaria de consultar...',

    // Email
    'email.to': 'Destinatário',
    'email.to_ph': 'exemplo@email.com',
    'email.subject': 'Assunto',
    'email.subject_ph': 'Consulta sobre...',
    'email.body': 'Mensagem',
    'email.body_ph': 'Olá, gostaria de perguntar...',

    // Phone
    'phone.number': 'Número de telefone',
    'phone.ph': '+5511999999999',
    'phone.hint': 'Ao escanear o QR, uma ligação será iniciada.',

    // SMS
    'sms.phone': 'Número de telefone',
    'sms.phone_ph': '+5511999999999',
    'sms.message': 'Mensagem predefinida',
    'sms.message_ph': 'Olá! Estou escrevendo porque...',

    // vCard
    'vcard.name': 'Nome completo *',
    'vcard.name_ph': 'João Silva',
    'vcard.phone': 'Telefone',
    'vcard.email': 'Email',
    'vcard.org': 'Organização',
    'vcard.org_ph': 'Empresa Ltda.',
    'vcard.url': 'Site',
    'vcard.url_ph': 'www.empresa.com.br',

    // Location
    'location.search': 'Buscar lugar',
    'location.search_ph': 'Buscar endereço ou lugar...',
    'location.gps': 'Usar minha localização GPS',
    'location.manual': '✏️ Manual',
    'location.map': '🗺️ Mapa',
    'location.map_hint': 'Clique no mapa para colocar um pin. Você também pode arrastá-lo.',
    'location.lat': 'Latitude',
    'location.lng': 'Longitude',
    'location.place': 'Nome do lugar (opcional)',
    'location.place_ph': 'Avenida Paulista, São Paulo',
    'location.hint': 'Ao escanear, abrirá o Google Maps com a localização.',
    'location.map_aria': 'Selecione um local no mapa',
    'location.pin_selected': 'Pin selecionado',

    // QR section
    'qr.preview': 'Pré-visualização',
    'qr.fill_fields': 'Preencha os campos',
    'qr.style': 'Estilo do QR',
    'qr.size': 'Tamanho do QR',
    'qr.download': 'Baixar PNG',
    'qr.copy': 'Copiar',
    'qr.copied': 'Copiado!',
    'qr.share': 'Compartilhar',
    'qr.sharePng': 'Compartilhar PNG',
    'qr.shareSvg': 'Compartilhar SVG',
    'qr.share_title': 'Código QR',
    'qr.logo': 'Logo central',
    'qr.logo_upload': 'Enviar imagem',
    'qr.logo_size': 'Tamanho',
    'qr.logo_hide_dots': 'Ocultar pontos sob o logo',
    'qr.logo_remove': 'Remover logo',
    'qr.reset_style': 'Redefinir estilo',

    // Shape
    'shape.label': 'Formato do código',
    'shape.square': 'Quadrado',
    'shape.circle': 'Círculo',

    // History
    'history.title': 'Histórico',
    'history.remove': 'Remover',
    'history.clear': 'Limpar histórico',
    'history.now': 'Agora',

    // Instagram
    'instagram.username': 'Nome de usuário do Instagram',
    'instagram.username_ph': 'ex. usuario',
    'instagram.hint': 'O QR linka para o perfil público do usuário.',

    // Twitter/X
    'twitter.username': 'Nome de usuário do X (Twitter)',
    'twitter.username_ph': 'ex. usuario',
    'twitter.hint': 'O QR linka para o perfil do usuário no X (Twitter).',

    // YouTube
    'youtube.type': 'Tipo',
    'youtube.channel': 'Canal',
    'youtube.video': 'Vídeo',
    'youtube.handle': 'Handle do canal',
    'youtube.handle_ph': 'ex. usuario',
    'youtube.video_id': 'ID do vídeo',
    'youtube.video_id_ph': 'ex. dQw4w9WgXcQ',
    'youtube.hint': 'O QR linka para um canal ou vídeo específico do YouTube.',

    // Event
    'event.title': 'Título do evento',
    'event.title_ph': 'ex. Aniversário da Ana',
    'event.start': 'Início',
    'event.end': 'Fim',
    'event.location': 'Local',
    'event.location_ph': 'ex. Salão de festas',
    'event.description': 'Descrição',
    'event.description_ph': 'Detalhes do evento...',
    'event.hint': 'O QR adiciona o evento ao calendário de quem o escaneia.',

    // TikTok
    'tiktok.username': 'Usuário do TikTok',
    'tiktok.username_ph': 'ex. usuario',
    'tiktok.hint': 'O QR linka para o perfil público do TikTok.',

    // LinkedIn
    'linkedin.type': 'Tipo',
    'linkedin.profile': 'Perfil',
    'linkedin.company': 'Empresa',
    'linkedin.username': 'Usuário',
    'linkedin.username_ph': 'ex. nome-sobrenome-123',
    'linkedin.company_ph': 'ex. minha-empresa',
    'linkedin.hint': 'O QR linka para o perfil ou página da empresa.',

    // Telegram
    'telegram.username': 'Usuário do Telegram',
    'telegram.username_ph': 'ex. usuario',
    'telegram.hint': 'O QR abre o chat ou canal no Telegram.',

    // Presets
    'preset.classic': 'Clássico',
    'preset.rounded': 'Arredondado',
    'preset.dots': 'Pontos',
    'preset.classy': 'Elegante',
    'preset.classy-rounded': 'Misto',
    'preset.extra-rounded': 'Fluido',
    'preset.pixel': 'Pixel',
    'preset.orbit': 'Órbita',
    'preset.frame': 'Moldura',
    'preset.beads': 'Pérolas',
    'preset.halo': 'Halo',

    // Customizer
    'custom.title': 'Personalizar cores',
    'custom.qr_color': 'Cor do QR',
    'custom.bg_color': 'Cor de fundo',
    'custom.reset': 'Redefinir cores',
    'custom.invert': 'Inverter cores',
    'custom.gradient': 'Gradiente',
    'custom.gradient_to': 'Cor final',
    'custom.linear': 'Linear',
    'custom.radial': 'Radial',
    'custom.angle': 'Ângulo',

    // Errors
    'error.required': 'Este campo é obrigatório',
    'error.invalid_url': 'Insira uma URL válida',
    'error.invalid_phone': 'Insira um telefone válido (mín. 8 dígitos)',
    'error.invalid_email': 'Insira um email válido',
    'error.invalid_coords': 'Insira coordenadas válidas',

    // Footer
    'footer.powered': 'Powered by qr-code-styling',
  },
}

export const SUPPORTED_LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
]

export function detectLang() {
  const stored = localStorage.getItem('qr-lang')
  if (stored && translations[stored]) return stored
  const browser = (navigator.language || 'es').split('-')[0]
  return translations[browser] ? browser : 'es'
}

export function makeT(lang) {
  return (key) => translations[lang]?.[key] ?? translations.es[key] ?? key
}
