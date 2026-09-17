import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { signOutAction } from "@/app/auth/actions";

export const dynamic = "force-dynamic";

export default async function AppDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const profile = await getCurrentProfile();

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Badge tone="green">Connecté</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Mon espace RED FLAG
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Suis tes témoignages, tes propositions d’entreprise et les demandes de
          modification quand la modération aura besoin de précisions.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm font-bold text-slate-500">Email</p>
            <p className="mt-2 font-black">{user.email}</p>
          </Card>
          <Card>
            <p className="text-sm font-bold text-slate-500">Rôle</p>
            <p className="mt-2 font-black">{profile?.role ?? "user"}</p>
          </Card>
          <Card>
            <p className="text-sm font-bold text-slate-500">Témoignages</p>
            <p className="mt-2 font-black">Bientôt disponible</p>
          </Card>
        </div>

        <form action={signOutAction} className="mt-8">
          <Button type="submit" variant="secondary">
            Se déconnecter
          </Button>
        </form>
      </main>
      <MobileBottomNav />
    </div>
  );
}
