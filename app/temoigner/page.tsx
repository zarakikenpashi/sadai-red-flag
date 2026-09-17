import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getCompanies } from "@/lib/companies";
import { TestimonialForm } from "./testimonial-form";

export const dynamic = "force-dynamic";

export default async function TestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/temoigner");

  const params = await searchParams;
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Badge tone="red">Témoignage structuré</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Publier un témoignage en 5 étapes.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Les témoignages sont enregistrés avec le statut de modération
          <strong> pending</strong>. Ton identité sert à la sécurité de la plateforme,
          mais elle n’est pas affichée publiquement.
        </p>

        {params.success === "1" ? (
          <Card className="mt-6 border-green-200 bg-green-50">
            <h2 className="text-2xl font-black text-safe-green">Témoignage envoyé</h2>
            <p className="mt-2 text-slate-700">
              Merci. Il est maintenant en attente de modération avant publication publique.
            </p>
          </Card>
        ) : null}

        {params.error === "confirmations" ? (
          <Card className="mt-6 border-red-200 bg-red-50">
            <h2 className="text-2xl font-black text-red-flag">Confirmations requises</h2>
            <p className="mt-2 text-slate-700">
              Confirme la bonne foi du témoignage et l’absence de données personnelles.
            </p>
          </Card>
        ) : null}

        <TestimonialForm companies={companies} />
      </main>
      <MobileBottomNav />
    </div>
  );
}
