import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader /><main className="mx-auto max-w-4xl px-6 py-12"><Badge tone="slate">MVP légal</Badge><h1 className="mt-4 text-4xl font-black">Confidentialité</h1><Card className="mt-8 space-y-4 leading-7 text-slate-700"><p>RED FLAG n’affiche pas publiquement l’identité des auteurs de témoignages.</p><p>Les comptes servent à limiter les abus, suivre les contributions, gérer les demandes utilisateur et permettre la modération.</p><p>Les demandes de suppression ou modification peuvent être adressées à l’équipe du projet avant lancement public sérieux.</p><p>Document MVP à faire relire par un juriste avant ouverture à des utilisateurs réels.</p></Card></main><MobileBottomNav /></div>;
}
