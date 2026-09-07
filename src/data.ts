export const WHATSAPP_URL = 'https://wa.me/5521971876996';
export const PHONE_DISPLAY = '(21) 97187-6996';
export const INSTAGRAM_URL = 'https://www.instagram.com/carlosinstalador/';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100063594761298';

export interface Service {
  number: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Controle de Acesso',
    description: 'Facial inteligente, Tag, Biometria ou Senha.',
  },
  {
    number: '02',
    title: 'Interfone ou Vídeo Porteiro',
    description:
      'Saiba quem está à porta antes de abrir, evitando abordagens inesperadas e riscos desnecessários.',
  },
  {
    number: '03',
    title: 'Catracas',
    description:
      'Integração com biometria ou facial (segurança máxima sem cartões), QR Code para visitantes (enviado via WhatsApp) e cartão de proximidade (RFID) para funcionários.',
  },
  {
    number: '04',
    title: 'Câmeras de Segurança',
    description:
      'Modelos IP, Wi-Fi, Babá Eletrônica, sensor de calor e movimento, com áudio bidirecional. Também temos câmera LPR com tecnologia de IA (leitura de placas, gestão e automação de acesso).',
  },
  {
    number: '05',
    title: 'Automação de Portões e TAG RFID',
    description:
      'Automação de portões deslizantes, basculantes e pivotantes duplos, com motor embaixo ou no alto com cadeirinha. Controle de acesso de veículos.',
  },
  {
    number: '06',
    title: 'Instalação de Alto Padrão',
    description:
      'Instalação profissional sem fios aparentes, com qualidade e organização.',
  },
  {
    number: '07',
    title: 'Ponto Eletrônico',
    description: 'Controlador de acesso para jornada de trabalho.',
  },
  {
    number: '08',
    title: 'Cabeamento Estruturado',
    description: 'Rede estruturada para empresas e condomínios.',
  },
];

export const ROTATING_WORDS = [
  'reconhecimento facial',
  'leitura de placa',
  'biometria digital',
  'tag RFID',
  'catracas',
  'ponto eletrônico',
  'CFTV',
  'fechadura digital',
  'instalação de câmeras',
  'portão eletrônico',
  'controle de acesso',
];

export interface Testimonial {
  name: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ecio Henrique ~ Campo Grande',
    text: 'Carlos é um instalador excepcional. Ele domina as melhores práticas! A precisão e a atenção aos detalhes que ele aplica são impressionantes, sempre garantindo que o trabalho final seja de alta qualidade.',
  },
  {
    name: 'Vanessa Aragão ~ Barra da Tijuca',
    text: 'Ótimo. Compareceu no horário marcado e resolveu a troca do interfone. Gostamos tanto que também fizemos com ele o reparo dos motores do portão da garagem, e tudo deu certo. Recomendo.',
  },
  {
    name: 'Amandio Santos ~ Sulacap',
    text: 'Profissional honesto e atencioso, preço justo, comprometido com a qualidade do serviço prestado. Super indico!',
  },
  {
    name: 'Paulo Souza ~ Recreio',
    text: 'Profissional qualificado, responsável e atencioso. Ótimo preço.',
  },
  {
    name: 'Ogmar Fernandes ~ Barra da Tijuca',
    text: 'Excelente profissional! Passou segurança no trabalho, explicou o sistema de funcionamento da fechadura eletrônica, colocou-se à disposição para dúvidas futuras e certamente indico seu trabalho. Obrigado, Carlos!',
  },
  {
    name: 'Fernando Bittencourt ~ Freguesia',
    text: 'Profissional de confiança, deixou tudo limpo (isso faz a diferença). Instalou câmeras, vídeo porteiro, portão de garagem, fez todas as configurações. Recomendo a todos.',
  },
];

export const ADVANTAGES = [
  'Dissuasão de criminosos: a presença visível de câmeras, alarmes e cercas elétricas inibe a ação de invasores e vândalos.',
  'Detecção instantânea de ameaças: monitoramento em tempo real permite a identificação imediata de atividades suspeitas.',
  'Monitoramento contínuo: os sistemas eletrônicos funcionam 24 horas por dia, 7 dias por semana, sem falhas por desatenção ou cansaço.',
  'Acesso remoto via aplicativos ou plataformas online.',
  'Armazenamento em nuvem ou em servidores locais, garantindo histórico de imagens.',
];

export const APPLICATIONS = [
  { label: 'Empresas', detail: 'reforçando a segurança patrimonial e de colaboradores' },
  { label: 'Condomínios', detail: 'monitorando áreas comuns, garagens e acessos' },
  { label: 'Residências', detail: 'garantindo tranquilidade para famílias' },
  { label: 'Indústrias', detail: 'supervisionando áreas de risco e linhas de produção' },
  {
    label: 'Instituições públicas',
    detail: 'ampliando a proteção em escolas, hospitais e repartições',
  },
];
