import Link from "next/link";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const rules = [
  "Décris uniquement des faits vécus ou observés directement.",
  "Ne cite pas de personnes physiques : pas de nom, prénom, téléphone, email ou profil social.",
  "Évite les insultes, accusations pénales directes et formulations diffamatoires.",
  "Retire les données personnelles et détails permettant d’identifier un salarié précis.",
  "Signale les sujets sensibles avec des mots factuels : harcèlement, discrimination, salaire, horaires.",
  "Tous les contenus passent en modération avant publication publique.",
];

export default function PublicationRulesPage() {
  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Badge tone="red">Sécurité éditoriale</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Règles de publication RED FLAG.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Ces règles réduisent les risques juridiques et protègent les personnes.
          Elles sont affichées avant chaque soumission de témoignage.
        </p>

        <div className="mt-8 grid gap-4">
          {rules.map((rule, index) => (
            <Card key={rule}>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-flag">
                Règle {index + 1}
              </p>
              <p className="mt-2 text-lg font-bold leading-7">{rule}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-amber-200 bg-amber-50">
          <h2 className="text-2xl font-black">Termes sensibles et modération</h2>
          <p className="mt-2 leading-7 text-slate-700">
            Les insultes et termes sensibles déclenchent une alerte. Les contenus
            sensibles restent en <strong>pending</strong> et ne sont jamais publiés
            sans modération humaine.
          </p>
        </Card>

        <Link className="mt-8 inline-flex" href="/temoigner">
          <Button>Retour au formulaire</Button>
        </Link>
      </main>
      <MobileBottomNav />
    </div>
  );
}
