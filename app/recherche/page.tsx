import { PublicHeader } from "@/components/layout/public-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCompanies } from "@/lib/companies";

function scoreTone(score: number) {
  if (score < 40) return "text-red-flag bg-red-50";
  if (score < 65) return "text-orange-700 bg-orange-50";
  if (score < 80) return "text-amber-700 bg-amber-50";
  return "text-green-700 bg-green-50";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const companies = await getCompanies(query);

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <Badge tone="red">Recherche entreprise</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Vérifie une entreprise avant de signer.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Recherche par nom, ville ou secteur. Les scores faibles avec peu de
            témoignages restent affichés comme Score à confirmer.
          </p>
        </div>

        <form action="/recherche" className="mb-8 rounded-3xl bg-white p-3 shadow-xl shadow-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="search-page-q">
              Rechercher une entreprise
            </label>
            <Input
              id="search-page-q"
              name="q"
              placeholder="Ex: marketing Abidjan, tech, agence..."
              type="search"
              defaultValue={query}
            />
            <Button size="lg" type="submit" variant="dark">
              Rechercher
            </Button>
          </div>
        </form>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-bold text-slate-600">
            {companies.length} résultat{companies.length > 1 ? "s" : ""}
            {query ? ` pour “${query}”` : ""}
          </p>
          <a className="text-sm font-bold text-red-flag" href="/temoigner">
            Proposer cette entreprise
          </a>
        </div>

        {companies.length ? (
          <div className="grid gap-4">
            {companies.map((company) => (
              <Card className="grid gap-5 md:grid-cols-[1fr_auto]" key={company.id}>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black">{company.name}</h2>
                    <Badge tone="slate">{company.sector || "Secteur à confirmer"}</Badge>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {company.city} • {company.country} • {company.testimonial_count} témoignage
                    {company.testimonial_count > 1 ? "s" : ""}
                  </p>
                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {company.description}
                  </p>
                  <p className="mt-4 text-sm font-bold text-slate-500">
                    Red flags fréquents : {company.frequent_flags.join(", ") || "à confirmer"}
                  </p>
                </div>

                <div className="flex min-w-44 flex-col items-start gap-3 md:items-end">
                  <div className={`rounded-2xl px-5 py-4 text-center ${scoreTone(company.red_flag_score)}`}>
                    <p className="text-3xl font-black">{company.red_flag_score}/100</p>
                    <p className="text-xs font-black uppercase tracking-wide">
                      {company.score_confidence === "low" ? "Score à confirmer" : "Red Flag Score"}
                    </p>
                  </div>
                  <a href={`/entreprises/${company.slug}`}>
                    <Button variant="secondary">Voir la fiche</Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <h2 className="text-2xl font-black">Aucun résultat pour l’instant.</h2>
            <p className="mt-3 text-slate-600">
              Cette entreprise n’est pas encore référencée. Tu peux proposer sa fiche
              et aider la communauté à commencer la collecte.
            </p>
            <a className="mt-5 inline-flex" href="/temoigner">
              <Button>Proposer cette entreprise</Button>
            </a>
          </Card>
        )}
      </main>
      <MobileBottomNav />
    </div>
  );
}
