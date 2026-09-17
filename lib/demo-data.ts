export type DemoCompany = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  sector: string;
  description: string;
  red_flag_score: number;
  score_confidence: "low" | "medium" | "high";
  testimonial_count: number;
  frequent_flags: string[];
  category_scores: {
    pay: number;
    management: number;
    workload: number;
    hours: number;
    promises: number;
    environment: number;
    training: number;
  };
};

export type DemoTestimonial = {
  id: string;
  company_slug: string;
  title: string;
  body: string;
  employment_status: string;
  duration_label: string;
  period_label: string;
  verification_status: "declared" | "verified" | "unverified";
  moderation_status: "approved" | "pending";
  helpful_count: number;
  flags: string[];
};

export const demoCompanies: DemoCompany[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    name: "Agence Baobab Digital",
    slug: "agence-baobab-digital",
    city: "Abidjan",
    country: "Côte d’Ivoire",
    sector: "Marketing",
    description: "Entreprise fictive utilisée pour développer les écrans RED FLAG.",
    red_flag_score: 34,
    score_confidence: "medium",
    testimonial_count: 3,
    frequent_flags: ["paiement", "stage prolongé", "promesses"],
    category_scores: { pay: 1.5, management: 2.5, workload: 2.5, hours: 2.5, promises: 1.5, environment: 3, training: 2.5 },
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    name: "Studio Lagoon Tech",
    slug: "studio-lagoon-tech",
    city: "Abidjan",
    country: "Côte d’Ivoire",
    sector: "Tech",
    description: "Entreprise fictive avec signaux mixtes pour les tests de fiche entreprise.",
    red_flag_score: 68,
    score_confidence: "low",
    testimonial_count: 2,
    frequent_flags: ["horaires", "cadrage"],
    category_scores: { pay: 4, management: 3, workload: 2.5, hours: 2.5, promises: 2.5, environment: 4, training: 4 },
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    name: "Atelier Cacao Media",
    slug: "atelier-cacao-media",
    city: "Abidjan",
    country: "Côte d’Ivoire",
    sector: "Communication",
    description: "Entreprise fictive favorable pour équilibrer les données de démonstration.",
    red_flag_score: 82,
    score_confidence: "low",
    testimonial_count: 1,
    frequent_flags: ["encadrement", "respect engagements"],
    category_scores: { pay: 5, management: 5, workload: 4, hours: 4, promises: 5, environment: 5, training: 5 },
  },
];

export const demoTestimonials: DemoTestimonial[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    company_slug: "agence-baobab-digital",
    title: "Stage prolongé sans vraie visibilité",
    body: "Expérience fictive de démonstration : le stage annoncé pour trois mois a été prolongé plusieurs fois sans calendrier clair de sortie.",
    employment_status: "Stagiaire",
    duration_label: "6 mois",
    period_label: "2025",
    verification_status: "declared",
    moderation_status: "approved",
    helpful_count: 24,
    flags: ["Stage prolongé", "Promesses non tenues"],
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    company_slug: "agence-baobab-digital",
    title: "Paiement parfois tardif",
    body: "Expérience fictive de démonstration : plusieurs collaborateurs mentionnaient des retards de paiement et il fallait souvent relancer.",
    employment_status: "CDD",
    duration_label: "8 mois",
    period_label: "Il y a moins d’un an",
    verification_status: "verified",
    moderation_status: "approved",
    helpful_count: 18,
    flags: ["Paiement en retard"],
  },
  {
    id: "20000000-0000-4000-8000-000000000004",
    company_slug: "studio-lagoon-tech",
    title: "Bon apprentissage mais rythme élevé",
    body: "Expérience fictive de démonstration : l’équipe était formatrice, mais les horaires pouvaient devenir lourds pendant les livraisons client.",
    employment_status: "CDI",
    duration_label: "1 an",
    period_label: "2024-2025",
    verification_status: "declared",
    moderation_status: "approved",
    helpful_count: 9,
    flags: ["Horaires"],
  },
  {
    id: "20000000-0000-4000-8000-000000000006",
    company_slug: "atelier-cacao-media",
    title: "Encadrement sérieux",
    body: "Expérience fictive de démonstration : le cadre était clair, les horaires raisonnables et les engagements annoncés en entretien ont été respectés.",
    employment_status: "Stagiaire",
    duration_label: "4 mois",
    period_label: "2026",
    verification_status: "verified",
    moderation_status: "approved",
    helpful_count: 14,
    flags: ["Good place"],
  },
];
