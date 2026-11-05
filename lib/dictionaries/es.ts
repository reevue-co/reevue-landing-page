import type { Dictionary } from "@/lib/dictionary";

export const es = {
  meta: {
    title: "Reevue | Sitio web y catálogo para inmobiliarias",
    description:
      "Reevue, en desarrollo: sitio web y catálogo para inmobiliarias. Presenta tu marca, ordena venta y alquiler y actualiza el catálogo con claridad.",
  },
  a11y: {
    skip: "Ir al contenido",
  },
  nav: {
    primary: "Secciones de esta página",
    mobile: "Menú",
    menu: "Menú",
    problem: "El problema",
    product: "Producto",
    features: "Recursos",
    integrations: "Integraciones",
    portal: "Portal",
    faq: "Preguntas",
    cta: "Quiero participar",
  },
  language: {
    choose: "Elegir idioma",
    current: "Idioma actual",
    list: "Idiomas disponibles",
    pt: "Português",
    es: "Español",
    en: "English",
  },
  theme: {
    toDark: "Usar tema oscuro",
    toLight: "Usar tema claro",
  },
  form: {
    newTab: "Se abre en una pestaña nueva",
    name: "Nombre completo",
    namePlaceholder: "María López",
    profile: "Perfil",
    profileAgency: "Inmobiliaria",
    profileIndependent: "Independiente",
    profileAgent: "Agente inmobiliario",
    profileOwner: "Propietario",
    agencyName: "Nombre de la inmobiliaria",
    agencyPlaceholder: "López Inmuebles",
    country: "País",
    dial: "Lada",
    state: "Estado / provincia",
    statePlaceholder: "Jalisco",
    city: "Ciudad",
    cityPlaceholder: "Guadalajara",
    phone: "WhatsApp",
    phonePlaceholder: "33 1234 5678",
    phoneInvalid: "Ingresa el WhatsApp completo, con código de área.",
    email: "Correo electrónico",
    emailPlaceholder: "maria@inmobiliaria.com",
    optional: "(opcional)",
    steps: "Pasos del registro",
    stepGeneral: "Datos generales",
    stepLocation: "Ubicación",
    stepInterest: "Interés",
    next: "Continuar",
    back: "Volver",
    interest: "Interés",
    interestRent: "Alquiler",
    interestSale: "Venta",
    interestBoth: "Ambos",
    solution: "¿Qué solución te interesa?",
    solutionPortal: "Portal de anuncios",
    solutionSite: "Sitio web y gestión para inmobiliarias",
    solutionBoth: "Ambas",
    hasSite: "¿Ya tienes un sitio web?",
    yes: "Sí",
    no: "No",
    site: "Dirección de tu sitio web",
    sitePlaceholder: "www.tusitio.com",
    difficulty: "¿Cuál es tu principal dificultad hoy al promocionar o gestionar tus propiedades?",
    difficultyPlaceholder: "Cuéntalo en pocas líneas",
    submit: "Registrar mi interés",
    sending: "Enviando...",
    close: "Cerrar",
    success: "Recibimos tus datos. Te contactaremos pronto.",
    errorInvalid: "Revisa los campos e inténtalo de nuevo.",
    errorSend: "No se pudo enviar ahora. Inténtalo de nuevo en unos instantes.",
  },
  hero: {
    title: "Tu inmobiliaria creció. ¿Tu sitio web se quedó atrás?",
    description:
      "Presenta tus propiedades en un sitio que esté a la altura de tu marca. Estamos creando Reevue para reunir tu catálogo de venta y alquiler, facilitar las actualizaciones y conectar cada propiedad con tu atención al cliente.",
    primary: "Quiero renovar mi presencia digital",
    secondary: "Ver cómo funcionará",
    support: "En desarrollo. Registra tu interés en el acceso anticipado.",
  },
  problem: {
    title: "Inviertes para conseguir atención. ¿Qué encuentra el cliente después?",
    intro:
      "No todas las inmobiliarias pasan por esto. Cuando ocurre, llega el interés y la presentación no acompaña.",
    items: [
      {
        title: "Un sitio difícil de usar en el celular",
        text: "La persona abre el enlace en la calle y encuentra páginas difíciles de recorrer, fotos recortadas y un camino poco claro hasta la propiedad.",
      },
      {
        title: "Un catálogo que cuesta actualizar",
        text: "Publicar, retirar o corregir un aviso depende de otra persona, de un archivo viejo o de un proceso que no sigue el ritmo de la cartera.",
      },
      {
        title: "Fotos e información repartidas",
        text: "Precio, fotos y detalles circulan en mensajes y publicaciones. Quien llega después tiene que armar la propiedad por su cuenta.",
      },
    ],
    closing:
      "Tu catálogo merece una presentación a la altura de las propiedades que vendes.",
  },
  value: {
    title: "Tu marca. Tus propiedades. Una dirección para presentar todo.",
    status: "Beneficios previstos del producto en desarrollo",
    intro:
      "La primera versión de Reevue se está diseñando para que la inmobiliaria tenga una dirección propia, con su marca, donde la cartera de venta y alquiler pueda verse, compartirse y actualizarse.",
    points: [
      {
        title: "Un sitio con la marca de la inmobiliaria",
        text: "Nombre, logotipo y colores de la agencia en la dirección donde el cliente conoce las propiedades.",
      },
      {
        title: "Venta y alquiler en el mismo catálogo",
        text: "Avisos organizados para quien busca comprar y para quien busca alquilar.",
      },
      {
        title: "Información fácil de ver y enviar",
        text: "Precio, fotos, barrio y características reunidos en una página que se puede compartir.",
      },
      {
        title: "WhatsApp ligado a la propiedad elegida",
        text: "La conversación empieza desde el aviso, con la propiedad identificada.",
      },
      {
        title: "Autonomía para actualizar la cartera",
        text: "El equipo publica y ajusta el catálogo sin depender de un sitio detenido en el tiempo.",
      },
    ],
  },
  demo: {
    title: "La propiedad en una página que se puede mostrar.",
    text: "La vista de abajo muestra la dirección del producto: la página de la inmobiliaria, avisos de venta y alquiler, la ficha de la propiedad y una vista en el celular. Los filtros y la búsqueda funcionan solo en esta demostración.",
    disclaimer:
      "Leme Inmobiliaria y las propiedades son ficticias. No son clientes ni avisos reales.",
    cta: "Quiero un sitio así para mi inmobiliaria",
    mobile: "Vista en el celular",
    mobileEmpty: "Elige una propiedad en la vista para ver la ficha.",
  },
  preview: {
    domain: "leme.example",
    agency: "Leme Inmobiliaria",
    agencyLine: "Venta y alquiler",
    bannerTitle: "La cartera de Leme, en una sola dirección.",
    bannerText: "Ejemplo visual de una página de inicio. Marca ficticia.",
    heroCaption:
      "Vista ilustrativa de un sitio de inmobiliaria. La agencia y las propiedades son ficticias. Fotos bajo licencia de Unsplash.",
    filters: {
      all: "Todos",
      sale: "Venta",
      rent: "Alquiler",
    },
    filterLegend: "Filtrar la vista por tipo de operación",
    searchLabel: "Buscar en la vista",
    searchPlaceholder: "Barrio o tipo de propiedad",
    empty: "Ninguna propiedad ilustrativa en este filtro.",
    whatsapp: "WhatsApp de esta propiedad",
    whatsappNote: "Botón ilustrativo, sin envío de mensaje.",
    fictional: "Datos ficticios, usados solo para mostrar el producto.",
    photoCredit: "Fotos ilustrativas bajo licencia de Unsplash.",
    gallery: "Galería ilustrativa",
    galleryAlt: "Foto ilustrativa de un ambiente, incluida solo en esta vista.",
    specs: {
      price: "Precio",
      neighborhood: "Barrio",
      area: "Superficie",
      bedrooms: "Dormitorios",
      parking: "Estacionamientos",
    },
    intent: {
      sale: "Venta",
      rent: "Alquiler",
    },
  },
  listings: [
    {
      id: "apt",
      intent: "sale",
      title: "Departamento con balcón",
      neighborhood: "Palermo",
      price: "USD 185.000",
      area: "78 m²",
      bedrooms: "2",
      bedroomsLabel: "2 dormitorios",
      parking: "1",
      parkingLabel: "1 estacionamiento",
      image: "living",
      photoAlt: "Sala iluminada, foto ilustrativa de una propiedad",
    },
    {
      id: "house",
      intent: "rent",
      title: "Casa en calle arbolada",
      neighborhood: "Miraflores",
      price: "USD 1.450/mes",
      area: "142 m²",
      bedrooms: "3",
      bedroomsLabel: "3 dormitorios",
      parking: "2",
      parkingLabel: "2 estacionamientos",
      image: "house",
      photoAlt: "Fachada de una casa contemporánea, foto ilustrativa",
    },
    {
      id: "studio",
      intent: "sale",
      title: "Estudio renovado",
      neighborhood: "Providencia",
      price: "USD 112.000",
      area: "36 m²",
      bedrooms: "1",
      bedroomsLabel: "1 dormitorio",
      parking: "1",
      parkingLabel: "1 estacionamiento",
      image: "bedroom",
      photoAlt: "Dormitorio con luz natural, foto ilustrativa",
    },
  ],
  features: {
    title: "Lo esencial para destacar tu cartera.",
    intro:
      "Estos recursos están previstos para el lanzamiento. Todavía no están disponibles.",
    planned: "Previsto para el lanzamiento",
    badge: "Previsto",
    items: [
      {
        title: "Sitio adaptable",
        detail: "Páginas para celular, tablet y computadora.",
      },
      {
        title: "Dominio propio",
        detail: "Una dirección de la inmobiliaria, separada del portal.",
      },
      {
        title: "Logotipo y colores de la inmobiliaria",
        detail: "La marca de la agencia conduce la presentación.",
      },
      {
        title: "Avisos de venta y alquiler",
        detail: "Los dos tipos de operación en el mismo catálogo.",
      },
      {
        title: "Galerías de fotos",
        detail: "Más de una imagen por propiedad.",
      },
      {
        title: "Búsqueda y filtros",
        detail: "Encontrar por tipo de operación y características principales.",
      },
      {
        title: "WhatsApp desde la propiedad",
        detail: "El contacto lleva el contexto del aviso elegido.",
      },
      {
        title: "Panel para administrar el catálogo",
        detail: "El equipo actualiza los avisos por su cuenta.",
      },
    ],
  },
  how: {
    title: "Tres pasos para publicar el catálogo.",
    note: "Este es el orden previsto de uso. No prometemos una configuración inmediata ni un plazo de finalización.",
    steps: [
      {
        title: "Configura la marca de tu inmobiliaria",
        text: "Nombre, logotipo y colores entran en el sitio que va a visitar el cliente.",
      },
      {
        title: "Agrega y organiza las propiedades",
        text: "Venta y alquiler, fotos y datos principales quedan en el mismo catálogo.",
      },
      {
        title: "Publica y comparte tu catálogo",
        text: "La dirección de la inmobiliaria se puede enviar a quien quiera ver la cartera.",
      },
    ],
  },
  expansion: {
    title: "Lo que puede venir después, con las inmobiliarias que participen.",
    intro:
      "Estas funciones están planificadas y no forman parte de lo previsto para la primera versión. El orden se va a orientar por lo que las inmobiliarias participantes indiquen como prioridad.",
    badge: "Planificado",
    note: "Las simulaciones de financiamiento no implican una integración bancaria confirmada ni alianzas financieras.",
    items: [
      {
        title: "CRM y seguimiento de interesados",
        text: "Registrar y seguir a quien escribió a partir de las propiedades.",
      },
      {
        title: "Atención al cliente con apoyo de IA",
        text: "Apoyo para responder dudas con el contexto del catálogo.",
      },
      {
        title: "Gestión de contratos",
        text: "Seguir contratos ligados a la operación de la inmobiliaria.",
      },
      {
        title: "Vencimientos y pagos atrasados",
        text: "Ver fechas de vencimiento y pagos pendientes.",
      },
      {
        title: "Videos de presentación generados con IA",
        text: "Armar un video de presentación a partir del material de la propiedad.",
      },
      {
        title: "Simulaciones de financiamiento",
        text: "Estimar condiciones de financiamiento para quien está comprando.",
      },
    ],
  },
  integrations: {
    badge: "Planificado",
    title: "El mismo aviso, también en los portales inmobiliarios.",
    text: "Reevue se está diseñando para que la inmobiliaria cargue la propiedad una vez y envíe el aviso a los portales que elija. La integración forma parte de la planificación y todavía no está disponible.",
    note: "Hablar de portales inmobiliarios no significa una alianza, una conexión lista ni una publicación garantizada.",
    points: [
      "Un registro previsto para varios destinos.",
      "La inmobiliaria elige a dónde puede ir el aviso.",
      "Actualizar o retirar en el catálogo es el punto de partida previsto.",
    ],
    diagramLabel: "Destinos previstos desde el catálogo",
    source: "Catálogo de la inmobiliaria",
    destinations: ["Portales de avisos", "Clasificados", "Sitio de la inmobiliaria", "Portal Reevue"],
  },
  portal: {
    kicker: "Producto complementario, en planificación",
    title: "Un portal para ampliar la difusión, cuando tenga sentido.",
    text: "Además del sitio de la inmobiliaria, Reevue prevé un portal de propiedades. La publicación será autorizada por la inmobiliaria. Las publicaciones pagas y los espacios destacados están previstos como opciones de difusión.",
    points: [
      "La inmobiliaria decide qué puede publicarse.",
      "Nada entra al portal sin ese consentimiento.",
      "La promoción paga es una opción planificada, no una garantía de visitas, contactos o ventas.",
    ],
    mockTitle: "Portal Reevue",
    mockBadge: "Destacado planificado",
    mockNote: "Publicación solo con autorización de la inmobiliaria.",
    mockItems: [
      { title: "Departamento con balcón", meta: "Venta · Palermo" },
      { title: "Casa en calle arbolada", meta: "Alquiler · Miraflores" },
    ],
  },
  early: {
    title: "¿Tu inmobiliaria necesita este cambio? Conversemos.",
    description:
      "Registra tu interés, cuenta lo que necesitas y participa en las conversaciones que van a orientar la primera versión de Reevue.",
    support: "Acepto que Reevue use mis datos para contactarme sobre el producto y el acceso anticipado.",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Reevue ya está disponible?",
        answer:
          "Reevue está en desarrollo. El registro permite recibir novedades y ser contactado sobre las pruebas iniciales.",
      },
      {
        question: "¿Reevue ya publica en los portales inmobiliarios?",
        answer:
          "Todavía no. La integración con portales inmobiliarios está planificada. No hay una alianza confirmada ni una publicación disponible.",
      },
      {
        question: "¿Para quién es?",
        answer:
          "Para inmobiliarias que están creando o reemplazando su sitio y quieren organizar la promoción de sus propiedades.",
      },
      {
        question: "¿Puedo usar la marca y el dominio de mi inmobiliaria?",
        answer: "Está previsto para la primera versión.",
      },
      {
        question: "Mi inmobiliaria ya tiene sitio. ¿Puedo participar?",
        answer:
          "Sí. Las inmobiliarias que ya tienen sitio también pueden registrar su interés.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer: "Los planes y los precios todavía se están definiendo.",
      },
      {
        question: "¿Cuándo será el lanzamiento?",
        answer: "Todavía no hay una fecha confirmada.",
      },
    ],
  },
  footer: {
    description: "Sitio y catálogo para inmobiliarias. Producto en desarrollo.",
    status: "En desarrollo. Aún sin fecha de lanzamiento.",
    nav: "En esta página",
    how: "Cómo funcionará",
    expansion: "Después del lanzamiento",
    early: "Acceso anticipado",
    contact: "Contacto",
    social: "Redes sociales",
  },
  notFound: {
    title: "Página no encontrada",
    text: "Esta dirección no existe. Elige un idioma para volver a la página de Reevue.",
  },
} satisfies Dictionary;
