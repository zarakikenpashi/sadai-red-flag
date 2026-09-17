import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInAction, signUpAction } from "./actions";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0">
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Badge tone="red">Compte RED FLAG</Badge>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Connexion ou création de compte.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Ton identité n’est pas affichée publiquement. Le compte sert à protéger
          la plateforme contre les abus et à suivre tes contributions.
        </p>

        {params.error ? (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 font-semibold text-red-flag">
            {params.error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-black">Connexion</h2>
            <form action={signInAction} className="mt-5 grid gap-4">
              <Input name="email" placeholder="Email" required type="email" />
              <Input name="password" placeholder="Mot de passe" required type="password" />
              <Button type="submit">Se connecter</Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-2xl font-black">Créer un compte</h2>
            <form action={signUpAction} className="mt-5 grid gap-4">
              <Input name="email" placeholder="Email" required type="email" />
              <Input
                name="password"
                placeholder="Mot de passe"
                required
                type="password"
                minLength={6}
              />
              <Button type="submit" variant="dark">
                Créer mon compte
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
