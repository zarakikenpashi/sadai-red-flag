import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { proposeCompanyAction } from "./actions";

export default function ProposeCompanyPage() {
  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Badge tone="red">Proposer une fiche entreprise</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Ajoute une entreprise à vérifier.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Cette fiche servira de base aux futurs témoignages. RED FLAG vérifie les
          doublons et garde les informations factuelles.
        </p>

        <Card className="mt-8">
          <form action={proposeCompanyAction} className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="name">
                Nom de l’entreprise
              </label>
              <Input id="name" name="name" placeholder="Ex: Entreprise ABC" required />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="city">
                  Ville
                </label>
                <Input id="city" name="city" placeholder="Abidjan" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold" htmlFor="country">
                  Pays
                </label>
                <Input id="country" name="country" defaultValue="Côte d’Ivoire" required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="sector">
                Secteur
              </label>
              <Input id="sector" name="sector" placeholder="Tech, marketing, finance..." required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="description">
                Description factuelle optionnelle
              </label>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition placeholder:text-slate-400 focus:border-red-flag focus:ring-4 focus:ring-red-100"
                id="description"
                name="description"
                placeholder="Décris l’activité sans accusation ni attaque personnelle."
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              La création publique complète sera finalisée avec l’authentification.
              Pour l’instant, ce formulaire prépare le parcours et la validation côté serveur.
            </div>

            <Button type="submit">Proposer cette entreprise</Button>
          </form>
        </Card>
      </main>
      <MobileBottomNav />
    </div>
  );
}
