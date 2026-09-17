import { notFound } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Panel } from "@/components/ui/card";
import { getCompanyBySlug, getCompanyTestimonials } from "@/lib/companies";

const categoryLabels = [
  ["pay", "💰 Paiement"],
  ["management", "👔 Management"],
  ["workload", "😵 Charge"],
  ["hours", "⏰ Horaires"],
  ["promises", "📌 Engagements"],
  ["environment", "🤝 Environnement"],
  ["training", "🎓 Formation"],
] as const;

function scoreLabel(score: number) {
  if (score < 40) return "Vigilance élevée";
  if (score < 65) return "Vigilance";
  if (score < 80) return "Correct / à confirmer";
  return "Favorable";
}

function scoreTone(score: number) {
  if (score < 40) return "bg-red-50 text-red-flag";
  if (score < 65) return "bg-orange-50 text-orange-700";
  if (score < 80) return "bg-amber-50 text-amber-700";
  return "bg-green-50 text-green-700";
}

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) notFound();

  const testimonials = await getCompanyTestimonials(slug);
  const mainFlags = company.frequent_flags.slice(0, 3);

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <a className="text-sm font-bold text-slate-500" href="/recherche">
          ← Retour à la recherche
        </a>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel className="shadow-none">
            <Badge tone="slate">{company.sector || "Secteur à confirmer"}</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              {company.name}
            </h1>
            <p className="mt-3 font-semibold text-slate-500">
              {company.city} • {company.country} • Fiche non revendiquée
            </p>
            <p className="mt-6 leading-7 text-slate-600">{company.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/temoigner">
                <Button className="w-full">Raconter mon expérience</Button>
              </a>
              <a href={`/entreprises/${company.slug}/revendiquer`}>
                <Button className="w-full" variant="secondary">
                  Cette entreprise est la vôtre ?
                </Button>
              </a>
            </div>
          </Panel>

          <Card className="bg-ink-black text-white">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
              <div className={`rounded-3xl p-6 text-center ${scoreTone(company.red_flag_score)}`}>
                <p className="text-5xl font-black">{company.red_flag_score}</p>
                <p className="text-sm font-black">/100</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-slate-300">
                  Red Flag Score
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  {scoreLabel(company.red_flag_score)}
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Basé sur {company.testimonial_count} expérience
                  {company.testimonial_count > 1 ? "s" : ""}. Niveau de confiance :
                  {" "}{company.score_confidence}.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h2 className="text-2xl font-black">Pourquoi ce score ?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Ce score communautaire résume les expériences publiées. Ce n’est pas
              un verdict : c’est un signal de vigilance à contextualiser.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {mainFlags.length ? (
                mainFlags.map((flag) => (
                  <Badge key={flag} tone="red">
                    {flag}
                  </Badge>
                ))
              ) : (
                <Badge>Score à confirmer</Badge>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-black">Notes par catégorie</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {categoryLabels.map(([key, label]) => (
                <div className="rounded-2xl bg-slate-50 p-4" key={key}>
                  <p className="font-bold">{label}</p>
                  <p className="mt-1 text-2xl font-black">
                    {company.category_scores[key].toFixed(1)}/5
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-8" id="temoignages">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-red-flag">Témoignages récents</p>
              <h2 className="mt-2 text-3xl font-black">Ce que la communauté rapporte</h2>
            </div>
            <a className="hidden text-sm font-bold text-red-flag md:inline" href="/temoigner">
              Ajouter mon expérience
            </a>
          </div>

          <div className="grid gap-4">
            {testimonials.length ? (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={testimonial.verification_status === "verified" ? "green" : "slate"}>
                      {testimonial.verification_status === "verified"
                        ? "Expérience vérifiée"
                        : "Expérience déclarée"}
                    </Badge>
                    <Badge tone="slate">
                      {testimonial.employment_status} • {testimonial.duration_label}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl font-black">{testimonial.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{testimonial.body}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-slate-500">
                    <span>{testimonial.flags.join(" • ")}</span>
                    <span>👍 {testimonial.helpful_count} utiles</span>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <h3 className="text-xl font-black">Aucun témoignage publié.</h3>
                <p className="mt-3 text-slate-600">
                  Sois le premier à partager une expérience factuelle et modérée.
                </p>
              </Card>
            )}
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
