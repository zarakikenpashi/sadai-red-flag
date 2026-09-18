import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { getPendingCompanyResponses } from "@/lib/company-workflows";
import { isModeratorProfile } from "@/lib/moderation";
import { approveResponseAction, rejectResponseAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCompanyResponsesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/reponses-entreprises");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");
  const responses = await getPendingCompanyResponses();
  return <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader /><main className="mx-auto max-w-6xl px-6 py-12"><Badge tone="red">Admin</Badge><h1 className="mt-4 text-4xl font-black">Réponses entreprises</h1><div className="mt-8 grid gap-4">{responses.length ? responses.map((response) => <Card key={response.id}><Badge tone="slate">pending</Badge><p className="mt-4 whitespace-pre-wrap">{response.body}</p><form className="mt-5 flex gap-3"><input name="response_id" type="hidden" value={response.id} /><Button formAction={approveResponseAction} type="submit">Approuver</Button><Button formAction={rejectResponseAction} type="submit" variant="danger">Rejeter</Button></form></Card>) : <Card><h2 className="text-2xl font-black">Aucune réponse pending</h2></Card>}</div></main><MobileBottomNav /></div>;
}
