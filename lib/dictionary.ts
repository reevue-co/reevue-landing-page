export type ListingImage = "living" | "house" | "bedroom";

export type Listing = {
  id: string;
  intent: "sale" | "rent";
  title: string;
  neighborhood: string;
  price: string;
  area: string;
  bedrooms: string;
  bedroomsLabel: string;
  parking: string;
  parkingLabel: string;
  image: ListingImage;
  photoAlt: string;
};

export type Dictionary = {
  meta: { title: string; description: string };
  a11y: { skip: string };
  nav: {
    primary: string;
    mobile: string;
    menu: string;
    problem: string;
    product: string;
    features: string;
    portal: string;
    faq: string;
    cta: string;
  };
  language: {
    choose: string;
    current: string;
    list: string;
    pt: string;
    es: string;
    en: string;
  };
  theme: {
    toDark: string;
    toLight: string;
  };
  form: {
    newTab: string;
    name: string;
    profile: string;
    profileAgency: string;
    profileIndependent: string;
    profileAgent: string;
    profileOwner: string;
    agencyName: string;
    country: string;
    dial: string;
    state: string;
    city: string;
    phone: string;
    email: string;
    optional: string;
    interest: string;
    interestRent: string;
    interestSale: string;
    solution: string;
    solutionPortal: string;
    solutionSite: string;
    solutionBoth: string;
    hasSite: string;
    yes: string;
    no: string;
    site: string;
    sitePlaceholder: string;
    difficulty: string;
    submit: string;
    sending: string;
    success: string;
    errorInvalid: string;
    errorSend: string;
  };
  hero: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
    support: string;
  };
  problem: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
    closing: string;
  };
  value: {
    title: string;
    status: string;
    intro: string;
    points: { title: string; text: string }[];
  };
  demo: {
    title: string;
    text: string;
    disclaimer: string;
    cta: string;
    mobile: string;
    mobileEmpty: string;
  };
  preview: {
    domain: string;
    agency: string;
    agencyLine: string;
    bannerTitle: string;
    bannerText: string;
    heroCaption: string;
    filters: { all: string; sale: string; rent: string };
    filterLegend: string;
    searchLabel: string;
    searchPlaceholder: string;
    empty: string;
    whatsapp: string;
    whatsappNote: string;
    fictional: string;
    photoCredit: string;
    gallery: string;
    galleryAlt: string;
    specs: {
      price: string;
      neighborhood: string;
      area: string;
      bedrooms: string;
      parking: string;
    };
    intent: { sale: string; rent: string };
  };
  listings: Listing[];
  features: {
    title: string;
    intro: string;
    planned: string;
    badge: string;
    items: { title: string; detail: string }[];
  };
  how: {
    title: string;
    note: string;
    steps: { title: string; text: string }[];
  };
  expansion: {
    title: string;
    intro: string;
    badge: string;
    note: string;
    items: { title: string; text: string }[];
  };
  portal: {
    kicker: string;
    title: string;
    text: string;
    points: string[];
    mockTitle: string;
    mockBadge: string;
    mockNote: string;
    mockItems: { title: string; meta: string }[];
  };
  early: {
    title: string;
    description: string;
    support: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    description: string;
    status: string;
    nav: string;
    how: string;
    expansion: string;
    early: string;
    contact: string;
    social: string;
  };
  notFound: { title: string; text: string };
};
