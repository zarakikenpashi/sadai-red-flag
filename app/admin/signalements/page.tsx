import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { getOpenReportsForModeration, isModeratorProfile } from "@/lib/moderation";
import { dismissReportAction, resolveReportAction } from "./actions";

function reportTitle(report: { testimonials?: { title?: string } | { title?: string }[] | null }) {
  const testimonial = Array.isArray(report.testimonials) ? report.testimonials[0] : report.testimonials;
  return testimonial?.title ?? "Témoignage";
}

export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/signalements");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");

  const reports = await getOpenReportsForModeration();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Badge tone="red">Modération</Badge>
        <h1 className="mt-4 text-4xl font-black">Admin signalements</h1>
        <div className="mt-8 grid gap-4">
          {reports.length ? reports.map((report) => (
            <Card key={report.id}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="red">{report.reason}</Badge><Badge tone="slate">{report.status}</Badge>
              </div>
              <p className="mt-3 font-bold">{report.comment || "Aucun commentaire"}</p>
              <p className="mt-3 text-slate-600">Témoignage signalé : {reportTitle(report)}</p>
              <form className="mt-5 flex gap-3">
                <input name="report_id" type="hidden" value={report.id} />
                <Button formAction={resolveReportAction} type="submit">Marquer traité</Button>
                <Button formAction={dismissReportAction} type="submit" variant="secondary">Classer sans suite</Button>
              </form>
            </Card>
          )) : <Card><h2 className="text-2xl font-black">Aucun signalement ouvert</h2></Card>}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
