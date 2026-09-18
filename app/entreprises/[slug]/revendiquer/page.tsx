import { notFound, redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyBySlug } from "@/lib/companies";
import { claimCompanyAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function ClaimCompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/auth?next=/entreprises/${slug}/revendiquer`);

  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Badge tone="red">Revendication entreprise</Badge>
        <h1 className="mt-4 text-4xl font-black">Cette entreprise est la vôtre ?</h1>
        <p className="mt-4 text-slate-600">Demandez un profil officiel pour {company.name}. La demande est enregistrée en pending puis vérifiée par l’admin.</p>
        <Card className="mt-8">
          <form action={claimCompanyAction} className="grid gap-4">
            <input name="company_id" type="hidden" value={company.id} />
            <input name="slug" type="hidden" value={company.slug} />
            <Input name="requester_name" placeholder="Nom du demandeur" required />
            <Input name="requester_email" placeholder="Email professionnel" required type="email" defaultValue={user.email ?? ""} />
            <Input name="requester_role" placeholder="Fonction dans l’entreprise" required />
            <textarea className="min-h-32 rounded-2xl border border-slate-200 p-4" name="message" placeholder="Informations utiles pour vérifier la revendication" />
            <Button type="submit">Envoyer la demande</Button>
          </form>
        </Card>
      </main>
      <MobileBottomNav />
    </div>
  );
}
