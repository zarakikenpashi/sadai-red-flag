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
  },
];
