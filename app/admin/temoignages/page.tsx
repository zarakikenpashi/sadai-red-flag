import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { getPendingTestimonialsForModeration, isModeratorProfile } from "@/lib/moderation";
import {
  approveTestimonialAction,
  hideTestimonialAction,
  rejectTestimonialAction,
  requestChangesTestimonialAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/temoignages");

  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");

  const testimonials = await getPendingTestimonialsForModeration();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Badge tone="red">admin · moderator</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Dashboard admin de modération
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Traitement desktop des témoignages en <strong>pending</strong>. Les actions
          approuver, demander modification, rejeter et masquer écrivent un historique
          dans <strong>moderation_events</strong>.
        </p>

        <div className="mt-8 grid gap-5">
          {testimonials.length ? (
            testimonials.map((testimonial) => (
              <Card className="grid gap-6 lg:grid-cols-[1fr_360px]" key={testimonial.id}>
                <section>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="red">pending</Badge>
                    <p className="text-sm font-bold text-slate-500">
                      {testimonial.company?.name ?? "Entreprise"} · {testimonial.period_label}
                    </p>
                  </div>
                  <h2 className="mt-3 text-2xl font-black">{testimonial.title}</h2>
                  <p className="mt-4 whitespace-pre-wrap rounded-3xl bg-slate-50 p-5 leading-7 text-slate-700">
                    {testimonial.body}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600 md:grid-cols-3">
                    <p>Statut : {testimonial.employment_status}</p>
                    <p>Durée : {testimonial.duration_label}</p>
                    <p>Flags : {testimonial.flags.join(", ") || "aucun"}</p>
                  </div>
                  {testimonial.moderator_note ? (
                    <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-700">
                      Alerte : {testimonial.moderator_note}
                    </p>
                  ) : null}
                </section>

                <aside className="rounded-3xl border border-slate-200 bg-white p-4">
                  <h3 className="text-lg font-black">Détail témoignage</h3>
                  <p className="mt-2 text-sm text-slate-600">ID : {testimonial.id}</p>
                  <form className="mt-5 grid gap-3">
                    <input name="testimonial_id" type="hidden" value={testimonial.id} />
                    <textarea
                      className="min-h-24 rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:border-red-flag focus:ring-4 focus:ring-red-100"
                      name="reason"
                      placeholder="Note de modération / raison"
                    />
                    <Button formAction={approveTestimonialAction} type="submit">
                      Approuver
                    </Button>
                    <Button formAction={requestChangesTestimonialAction} type="submit" variant="secondary">
                      Demander modification needs_changes
                    </Button>
                    <Button formAction={rejectTestimonialAction} type="submit" variant="danger">
                      Rejeter
                    </Button>
                    <Button formAction={hideTestimonialAction} type="submit" variant="dark">
                      Masquer hidden
                    </Button>
                  </form>
                </aside>
              </Card>
            ))
          ) : (
            <Card>
              <h2 className="text-2xl font-black">Aucun témoignage pending</h2>
              <p className="mt-2 text-slate-600">
                La file de modération est vide pour l’instant.
              </p>
            </Card>
          )}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
