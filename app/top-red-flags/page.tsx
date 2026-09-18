import Link from "next/link";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicHeader } from "@/components/layout/public-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getTopRedFlagCompanies } from "@/lib/companies";

export const dynamic = "force-dynamic";

export default async function TopRedFlagsPage() {
  const companies = await getTopRedFlagCompanies();
  return (
    <div className="min-h-screen bg-soft-white pb-24 text-ink-black md:pb-0"><PublicHeader />
      <main className="mx-auto max-w-6xl px-6 py-12"><Badge tone="red">Classement prudent</Badge><h1 className="mt-4 text-4xl font-black md:text-5xl">Top Red Flags</h1><p className="mt-4 max-w-3xl text-slate-600">Classement par Red Flag Score avec seuil minimum de témoignages. Ce n’est pas un verdict juridique : lis les témoignages et contextualise chaque signal.</p>
        <div className="mt-8 grid gap-4">{companies.map((company, index) => <Link href={`/entreprises/${company.slug}`} key={company.id}><Card className="transition hover:border-red-flag"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-black text-red-flag">#{index + 1}</p><h2 className="mt-1 text-2xl font-black">{company.name}</h2><p className="mt-2 text-slate-600">{company.city} · {company.sector}</p><div className="mt-3 flex flex-wrap gap-2">{company.frequent_flags.slice(0,3).map((flag) => <Badge key={flag} tone="red">{flag}</Badge>)}</div></div><div className="rounded-3xl bg-red-50 p-5 text-center text-red-flag"><p className="text-4xl font-black">{company.red_flag_score}</p><p className="text-sm font-black">/100 · {company.testimonial_count} avis</p></div></div></Card></Link>)}</div>
      </main><MobileBottomNav /></div>
  );
}
