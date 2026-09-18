import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader /><main className="mx-auto max-w-4xl px-6 py-12"><Badge tone="slate">MVP légal</Badge><h1 className="mt-4 text-4xl font-black">Conditions d’utilisation</h1><Card className="mt-8 space-y-4 leading-7 text-slate-700"><p>Les témoignages doivent rester factuels, sans insultes, données personnelles ou attaques nominatives.</p><p>Chaque contenu passe par une modération avant publication. RED FLAG peut masquer, rejeter ou demander des modifications.</p><p>Les entreprises disposent d’un droit de réponse via une réponse officielle modérée et une revendication de fiche.</p><p>Le Red Flag Score est un signal communautaire, pas une preuve juridique.</p><p>Document MVP à faire relire par un juriste avant lancement public sérieux.</p></Card></main><MobileBottomNav /></div>;
}
