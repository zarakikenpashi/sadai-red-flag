import Link from "next/link";
import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getUserTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

const statusLabels = {
  pending: "En attente",
  approved: "Publié",
  needs_changes: "Modifications demandées",
  rejected: "Rejeté",
  hidden: "Masqué",
} as const;

const statusTone = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-green-200 bg-green-50 text-safe-green",
  needs_changes: "border-blue-200 bg-blue-50 text-blue-700",
  rejected: "border-red-200 bg-red-50 text-red-flag",
  hidden: "border-slate-200 bg-slate-50 text-slate-600",
} as const;

export default async function MyTestimonialsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/app/mes-temoignages");

  const testimonials = await getUserTestimonials(user.id);

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Badge tone="green">Espace privé</Badge>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Mes témoignages
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Liste privée de tes contributions. La requête filtre par ton
              utilisateur connecté : aucun utilisateur ne peut voir les
              témoignages privés d’un autre.
            </p>
          </div>
          <Link href="/temoigner">
            <Button>Témoigner</Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {testimonials.length ? (
            testimonials.map((testimonial) => {
              const status = testimonial.moderation_status as keyof typeof statusLabels;
              return (
                <Card key={testimonial.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-500">
                        {testimonial.company?.name ?? "Entreprise"} · {testimonial.period_label}
                      </p>
                      <h2 className="mt-2 text-2xl font-black">{testimonial.title}</h2>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-sm font-black ${
                        statusTone[status] ?? statusTone.pending
                      }`}
                    >
                      {status} — {statusLabels[status] ?? testimonial.moderation_status}
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-3 leading-7 text-slate-700">
                    {testimonial.body}
                  </p>
                  {testimonial.moderator_note ? (
                    <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-700">
                      Note modération : {testimonial.moderator_note}
                    </p>
                  ) : null}
                </Card>
              );
            })
          ) : (
            <Card>
              <h2 className="text-2xl font-black">Aucun témoignage pour l’instant</h2>
              <p className="mt-2 text-slate-600">
                Commence par publier un témoignage. Il apparaîtra ici avec son statut.
              </p>
              <Link className="mt-5 inline-flex" href="/temoigner">
                <Button>Témoigner</Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
