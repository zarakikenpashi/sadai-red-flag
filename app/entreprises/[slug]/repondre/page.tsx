import { notFound, redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getCompanyBySlug, getCompanyTestimonials } from "@/lib/companies";
import { createCompanyResponseAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CompanyResponsePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/auth?next=/entreprises/${slug}/repondre`);
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();
  const testimonials = await getCompanyTestimonials(slug);
  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader />
      <main className="mx-auto max-w-4xl px-6 py-12"><Badge tone="green">Réponse entreprise</Badge><h1 className="mt-4 text-4xl font-black">Répondre officiellement</h1><p className="mt-4 text-slate-600">Réponse en pending avant publication. Ne révélez pas l’identité supposée de l’auteur.</p>
        <Card className="mt-8"><form action={createCompanyResponseAction} className="grid gap-4"><input name="company_id" type="hidden" value={company.id} /><input name="slug" type="hidden" value={company.slug} />
          <select className="min-h-14 rounded-2xl border border-slate-200 px-5" name="testimonial_id" required>{testimonials.map((testimonial) => <option key={testimonial.id} value={testimonial.id}>{testimonial.title}</option>)}</select>
          <textarea className="min-h-44 rounded-2xl border border-slate-200 p-5" name="body" minLength={20} maxLength={3000} placeholder="Réponse factuelle, sans identifier l’auteur" required />
          <Button type="submit">Soumettre la réponse pour modération</Button></form></Card>
      </main><MobileBottomNav /></div>
  );
}
