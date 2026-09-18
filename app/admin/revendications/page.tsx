import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { getPendingCompanyClaims } from "@/lib/company-workflows";
import { isModeratorProfile } from "@/lib/moderation";
import { approveClaimAction, rejectClaimAction } from "./actions";

function claimCompanyName(claim: { companies?: { name?: string } | { name?: string }[] | null }) {
  const company = Array.isArray(claim.companies) ? claim.companies[0] : claim.companies;
  return company?.name ?? "Entreprise";
}

export const dynamic = "force-dynamic";

export default async function AdminClaimsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/revendications");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");
  const claims = await getPendingCompanyClaims();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Badge tone="red">Admin</Badge><h1 className="mt-4 text-4xl font-black">Revendications entreprise</h1>
        <div className="mt-8 grid gap-4">{claims.length ? claims.map((claim) => (
          <Card key={claim.id}>
            <h2 className="text-2xl font-black">{claimCompanyName(claim)}</h2>
            <p className="mt-2 text-slate-600">{claim.requester_name} — {claim.requester_email} — {claim.requester_role}</p>
            <p className="mt-3">{claim.message}</p>
            <form className="mt-5 flex gap-3"><input name="claim_id" type="hidden" value={claim.id} /><Button formAction={approveClaimAction} type="submit">Approuver Profil officiel</Button><Button formAction={rejectClaimAction} type="submit" variant="danger">Rejeter</Button></form>
          </Card>
        )) : <Card><h2 className="text-2xl font-black">Aucune revendication pending</h2></Card>}</div>
      </main><MobileBottomNav /></div>
  );
}
