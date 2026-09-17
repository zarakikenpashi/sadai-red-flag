import Link from "next/link";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, Panel } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />

      <main>
        <section
          id="hero"
          className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24"
        >
          <div className="flex flex-col justify-center">
            <Badge className="mb-4" tone="red">
              Transparence professionnelle • Abidjan d’abord
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Avant de signer, vérifie l’entreprise.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              RED FLAG rassemble des expériences anonymes et modérées pour aider
              les jeunes candidats à poser les bonnes questions avant un stage,
              un job ou un entretien.
            </p>

            <form
              action="/recherche"
              className="mt-8 rounded-3xl bg-white p-3 shadow-2xl shadow-slate-200"
              id="recherche"
            >
              <label className="sr-only" htmlFor="company-search">
                Chercher une entreprise
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="company-search"
                  name="q"
                  className="flex-1"
                  placeholder="Cherche une entreprise avant de signer..."
                  type="search"
                />
                <Button size="lg" type="submit" variant="dark">
                  Rechercher
                </Button>
              </div>
            </form>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#temoigner"
              >
                <Button className="w-full" size="lg">
                  Raconter mon expérience
                </Button>
              </a>
              <Link href="/entreprises/proposer">
                <Button className="w-full" size="lg" variant="secondary">
                  Proposer une entreprise
                </Button>
              </Link>
              <a href="#top">
                <Button className="w-full" size="lg" variant="secondary">
                  Voir le top red flags
                </Button>
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-ink-black p-6 text-white shadow-2xl shadow-slate-300">
            <div className="rounded-3xl bg-white p-5 text-ink-black">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">Entreprise exemple</p>
                  <h2 className="mt-1 text-2xl font-black">Agence XYZ</h2>
                  <p className="text-sm text-slate-500">Abidjan • Marketing</p>
                </div>
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-center text-red-flag">
                  <p className="text-3xl font-black">34</p>
                  <p className="text-xs font-bold">/100</p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-deep-alert">
                Vigilance élevée — score basé sur 42 expériences publiées.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  ["💰 Paiement", "43% des témoignages"],
                  ["👔 Management", "35% des témoignages"],
                  ["⏰ Horaires", "29% des témoignages"],
                ].map(([label, value]) => (
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-3" key={label}>
                    <span className="font-bold">{label}</span>
                    <span className="text-slate-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Le score n’est pas un verdict : c’est un signal communautaire de
              vigilance, accompagné de témoignages modérés et contextualisés.
            </p>
          </aside>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="top">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-red-flag">🚨 Ça revient souvent</p>
              <h2 className="mt-2 text-3xl font-black">Signaux à vérifier avant entretien</h2>
            </div>
            <p className="hidden max-w-md text-sm text-slate-500 md:block">
              Les classements MVP utiliseront un seuil minimum de témoignages pour
              éviter les conclusions injustes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Paiement en retard", "Vérifie les délais réels de paiement."],
              ["Stage prolongé", "Demande les conditions de fin de stage."],
              ["Contrat flou", "Clarifie salaire, durée et horaires."],
            ].map(([title, body]) => (
              <Card key={title}>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-slate-600">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-6 py-10"
          id="temoignages-recents"
        >
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-red-flag">Témoignages récents</p>
              <h2 className="mt-2 text-3xl font-black">
                Des expériences modérées, pas des rumeurs.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Chaque carte est pensée comme un aperçu : statut de vérification,
              contexte, tags et score communautaire de vigilance.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              [
                "Agence Baobab Digital",
                "Stage prolongé sans vraie visibilité",
                "Expérience déclarée • Stagiaire • 6 mois",
                "Stage prolongé",
              ],
              [
                "Studio Lagoon Tech",
                "Bon apprentissage mais rythme élevé",
                "Expérience déclarée • CDI • 1 an",
                "Horaires",
              ],
              [
                "Atelier Cacao Media",
                "Encadrement sérieux",
                "Expérience vérifiée • Stagiaire • 4 mois",
                "Good place",
              ],
            ].map(([company, title, meta, flag]) => (
              <Card key={`${company}-${title}`}>
                <Badge tone={flag === "Good place" ? "green" : "red"}>
                  {flag}
                </Badge>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">{company}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{meta}</p>
                <div className="mt-5 flex items-center justify-between text-sm font-bold text-slate-500">
                  <span>👍 utile</span>
                  <span>Modération avant publication</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="temoigner">
          <Panel>
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="font-bold text-red-flag">Contribution MVP</p>
                <h2 className="mt-2 text-3xl font-black">Raconter sans s’exposer.</h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Le formulaire MVP sera en 5 étapes : entreprise, statut,
                  notes, red flags, récit. L’identité ne sera pas affichée
                  publiquement et les contenus passeront en modération.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Expérience déclarée",
                  "Modération avant publication",
                  "Vote utile",
                  "Droit de réponse entreprise",
                ].map((item) => (
                  <div className="rounded-2xl bg-slate-50 p-4 font-bold" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="regles">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black">Règle produit dès le départ</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              RED FLAG n’est pas une plateforme de harcèlement ou de règlement de
              comptes. Les témoignages devront rester factuels, sans noms de
              personnes physiques, sans insultes et avec droit de réponse pour
              les entreprises revendiquées.
            </p>
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
