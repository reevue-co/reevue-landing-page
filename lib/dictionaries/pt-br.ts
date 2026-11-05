import type { Dictionary } from "@/lib/dictionary";

export const ptBr = {
  meta: {
    title: "Reevue | Site e catálogo para imobiliárias",
    description:
      "A Reevue está em desenvolvimento para imobiliárias que precisam apresentar a marca, organizar a venda e a locação e atualizar o catálogo com mais clareza. Cadastre seu interesse no acesso antecipado.",
  },
  a11y: {
    skip: "Ir para o conteúdo",
  },
  nav: {
    primary: "Seções desta página",
    mobile: "Menu",
    menu: "Menu",
    problem: "O problema",
    product: "Produto",
    features: "Recursos",
    portal: "Portal",
    faq: "Perguntas",
    cta: "Quero participar",
  },
  language: {
    choose: "Escolher idioma",
    current: "Idioma atual",
    list: "Idiomas disponíveis",
    pt: "Português",
    es: "Español",
  },
  form: {
    unavailable: "Cadastro disponível em breve",
    newTab: "Abre em uma nova aba",
  },
  hero: {
    title: "Sua imobiliária evoluiu. Seu site ficou para trás?",
    description:
      "Apresente seus imóveis em um site que valoriza sua marca. A Reevue está sendo criada para reunir seu catálogo de venda e locação, facilitar atualizações e conectar cada imóvel ao seu atendimento.",
    primary: "Quero renovar minha presença digital",
    secondary: "Ver como vai funcionar",
    support: "Em desenvolvimento. Cadastre seu interesse no acesso antecipado.",
  },
  problem: {
    title: "Você investe para conquistar atenção. O que o cliente encontra depois?",
    intro:
      "Nem toda imobiliária passa por isso. Quando passa, o interesse chega e a apresentação não acompanha.",
    items: [
      {
        title: "Um site difícil de usar no celular",
        text: "A pessoa abre o link no caminho e encontra páginas difíceis de percorrer, fotos cortadas e um caminho pouco claro até o imóvel.",
      },
      {
        title: "Um catálogo trabalhoso de atualizar",
        text: "Incluir, retirar ou corrigir um anúncio depende de outra pessoa, de um arquivo antigo ou de um processo que não acompanha a carteira.",
      },
      {
        title: "Fotos e informações espalhadas",
        text: "Preço, fotos e detalhes circulam em mensagens e publicações. Quem chega depois precisa montar o imóvel por conta própria.",
      },
    ],
    closing: "Seu catálogo merece uma apresentação à altura dos imóveis que você vende.",
  },
  value: {
    title: "Sua marca. Seus imóveis. Um endereço para apresentar tudo.",
    status: "Benefícios previstos do produto em desenvolvimento",
    intro:
      "A primeira versão da Reevue está sendo desenhada para a imobiliária ter um endereço próprio, com a sua marca, onde a carteira de venda e locação possa ser vista, compartilhada e atualizada.",
    points: [
      {
        title: "Um site com a marca da imobiliária",
        text: "Nome, logo e cores da agência no endereço em que o cliente conhece os imóveis.",
      },
      {
        title: "Venda e locação no mesmo catálogo",
        text: "Anúncios organizados para quem busca comprar e para quem busca alugar.",
      },
      {
        title: "Informação fácil de ver e enviar",
        text: "Preço, fotos, bairro e características reunidos em uma página que pode ser compartilhada.",
      },
      {
        title: "WhatsApp ligado ao imóvel escolhido",
        text: "A conversa começa a partir do anúncio, com o imóvel identificado.",
      },
      {
        title: "Autonomia para atualizar a carteira",
        text: "A equipe publica e ajusta o catálogo sem depender de um site parado no tempo.",
      },
    ],
  },
  demo: {
    title: "O imóvel em uma página que dá para mostrar.",
    text: "A prévia abaixo mostra a direção do produto: a página da imobiliária, anúncios de venda e locação, a ficha do imóvel e uma visão no celular. Os filtros e a busca funcionam só nesta demonstração.",
    disclaimer:
      "Leme Imobiliária e os imóveis são fictícios. Não são clientes nem anúncios reais.",
    cta: "Quero um site assim para minha imobiliária",
    mobile: "Visão no celular",
    mobileEmpty: "Escolha um imóvel na prévia para ver a ficha.",
  },
  preview: {
    domain: "leme.example",
    agency: "Leme Imobiliária",
    agencyLine: "Venda e locação",
    bannerTitle: "A carteira da Leme, em um endereço só.",
    bannerText: "Exemplo visual de homepage. Marca fictícia.",
    heroCaption:
      "Prévia ilustrativa de um site de imobiliária. A agência e os imóveis são fictícios. Fotos sob licença Unsplash.",
    filters: {
      all: "Todos",
      sale: "Venda",
      rent: "Locação",
    },
    filterLegend: "Filtrar a prévia por tipo de negócio",
    searchLabel: "Buscar na prévia",
    searchPlaceholder: "Bairro ou tipo de imóvel",
    empty: "Nenhum imóvel ilustrativo neste filtro.",
    whatsapp: "WhatsApp deste imóvel",
    whatsappNote: "Botão ilustrativo, sem envio de mensagem.",
    fictional: "Dados fictícios, usados apenas para mostrar o produto.",
    photoCredit: "Fotos ilustrativas sob licença Unsplash.",
    gallery: "Galeria ilustrativa",
    galleryAlt: "Foto ilustrativa de ambiente, incluída só nesta prévia.",
    specs: {
      price: "Preço",
      neighborhood: "Bairro",
      area: "Área",
      bedrooms: "Quartos",
      parking: "Vagas",
    },
    intent: {
      sale: "Venda",
      rent: "Locação",
    },
  },
  listings: [
    {
      id: "apt",
      intent: "sale",
      title: "Apartamento com varanda",
      neighborhood: "Pinheiros",
      price: "R$ 890.000",
      area: "78 m²",
      bedrooms: "2",
      bedroomsLabel: "2 quartos",
      parking: "1",
      parkingLabel: "1 vaga",
      image: "living",
      photoAlt: "Sala de estar iluminada, foto ilustrativa de imóvel",
    },
    {
      id: "house",
      intent: "rent",
      title: "Casa em rua arborizada",
      neighborhood: "Vila Mariana",
      price: "R$ 6.400/mês",
      area: "142 m²",
      bedrooms: "3",
      bedroomsLabel: "3 quartos",
      parking: "2",
      parkingLabel: "2 vagas",
      image: "house",
      photoAlt: "Fachada de casa contemporânea, foto ilustrativa de imóvel",
    },
    {
      id: "studio",
      intent: "sale",
      title: "Studio reformado",
      neighborhood: "Moema",
      price: "R$ 515.000",
      area: "36 m²",
      bedrooms: "1",
      bedroomsLabel: "1 quarto",
      parking: "1",
      parkingLabel: "1 vaga",
      image: "bedroom",
      photoAlt: "Quarto com luz natural, foto ilustrativa de imóvel",
    },
  ],
  features: {
    title: "O essencial para colocar sua carteira em destaque.",
    intro:
      "Estes recursos estão previstos para o lançamento. Ainda não estão disponíveis.",
    planned: "Previsto para o lançamento",
    badge: "Previsto",
    items: [
      {
        title: "Site responsivo",
        detail: "Páginas para celular, tablet e computador.",
      },
      {
        title: "Domínio próprio",
        detail: "Um endereço da imobiliária, separado do portal.",
      },
      {
        title: "Logo e cores da imobiliária",
        detail: "A marca da agência conduz a apresentação.",
      },
      {
        title: "Anúncios de venda e locação",
        detail: "Os dois tipos de negócio no mesmo catálogo.",
      },
      {
        title: "Galerias de fotos",
        detail: "Mais de uma imagem por imóvel.",
      },
      {
        title: "Busca e filtros",
        detail: "Encontrar por tipo de negócio e características principais.",
      },
      {
        title: "WhatsApp a partir do imóvel",
        detail: "O contato leva o contexto do anúncio escolhido.",
      },
      {
        title: "Painel para gerenciar o catálogo",
        detail: "A equipe atualiza os anúncios por conta própria.",
      },
    ],
  },
  how: {
    title: "Três passos para publicar o catálogo.",
    note: "Esta é a ordem prevista de uso. Não há promessa de configuração imediata nem de um prazo para concluir.",
    steps: [
      {
        title: "Configure a marca da sua imobiliária",
        text: "Nome, logo e cores entram no site que o cliente vai visitar.",
      },
      {
        title: "Inclua e organize os imóveis",
        text: "Venda e locação, fotos e dados principais ficam no mesmo catálogo.",
      },
      {
        title: "Publique e compartilhe o catálogo",
        text: "O endereço da imobiliária pode ser enviado para quem quer ver a carteira.",
      },
    ],
  },
  expansion: {
    title: "O que pode vir depois, com as imobiliárias que participarem.",
    intro:
      "Estas funções estão planejadas e não fazem parte do que está previsto para a primeira versão. A ordem será orientada pelo que as imobiliárias participantes indicarem como prioridade.",
    badge: "Planejado",
    note: "Simulações de financiamento não significam integração confirmada com bancos nem parcerias financeiras.",
    items: [
      {
        title: "CRM e acompanhamento de interessados",
        text: "Registrar e acompanhar quem entrou em contato a partir dos imóveis.",
      },
      {
        title: "Atendimento com apoio de IA",
        text: "Apoio para responder dúvidas com o contexto do catálogo.",
      },
      {
        title: "Gestão de contratos",
        text: "Acompanhar contratos ligados à operação da imobiliária.",
      },
      {
        title: "Vencimentos e pagamentos em atraso",
        text: "Ver datas de vencimento e pendências de pagamento.",
      },
      {
        title: "Vídeos de apresentação gerados com IA",
        text: "Montar um vídeo de apresentação a partir do material do imóvel.",
      },
      {
        title: "Simulações de financiamento",
        text: "Estimar condições de financiamento para quem está comprando.",
      },
    ],
  },
  portal: {
    kicker: "Produto complementar, em planejamento",
    title: "Um portal para ampliar a divulgação, quando fizer sentido.",
    text: "Além do site da imobiliária, a Reevue prevê um portal de anúncios. A publicação será autorizada pela imobiliária. Anúncios pagos e posições de destaque estão previstos como opções de divulgação.",
    points: [
      "A imobiliária decide o que pode ser publicado.",
      "Nada entra no portal sem esse consentimento.",
      "A promoção paga é uma opção planejada, não uma garantia de visitas, contatos ou vendas.",
    ],
    mockTitle: "Portal Reevue",
    mockBadge: "Destaque planejado",
    mockNote: "Publicação somente com autorização da imobiliária.",
    mockItems: [
      { title: "Apartamento com varanda", meta: "Venda · Pinheiros" },
      { title: "Casa em rua arborizada", meta: "Locação · Vila Mariana" },
    ],
  },
  early: {
    title: "Sua imobiliária precisa dessa mudança? Vamos conversar.",
    description:
      "Cadastre seu interesse, conte o que você precisa e participe das conversas que vão orientar a primeira versão da Reevue.",
    cta: "Quero participar",
    support: "Você será direcionado a um formulário rápido de interesse.",
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        question: "A Reevue já está disponível?",
        answer:
          "A Reevue está em desenvolvimento. O cadastro permite receber atualizações e ser contatado sobre os testes iniciais.",
      },
      {
        question: "Para quem é a Reevue?",
        answer:
          "Para imobiliárias que estão criando ou substituindo o site e querem organizar a divulgação dos imóveis.",
      },
      {
        question: "Posso usar a marca e o domínio da imobiliária?",
        answer: "Isso está previsto para a primeira versão.",
      },
      {
        question: "Minha imobiliária já tem site. Posso participar?",
        answer: "Sim. Imobiliárias que já têm site também podem registrar interesse.",
      },
      {
        question: "Quanto custa?",
        answer: "Os planos e os preços ainda estão sendo definidos.",
      },
      {
        question: "Quando será o lançamento?",
        answer: "Ainda não há uma data confirmada.",
      },
    ],
  },
  footer: {
    description: "Site e catálogo para imobiliárias. Produto em desenvolvimento.",
    status: "Em desenvolvimento. Ainda sem data de lançamento.",
    nav: "Nesta página",
    how: "Como vai funcionar",
    expansion: "Depois do lançamento",
    early: "Acesso antecipado",
    contact: "Contato",
  },
  notFound: {
    title: "Página não encontrada",
    text: "Este endereço não existe. Escolha um idioma para voltar à página da Reevue.",
  },
} satisfies Dictionary;
