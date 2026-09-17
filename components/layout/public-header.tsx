import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a className="text-xl font-black tracking-tight" href="#hero">
          🚩 RED FLAG
        </a>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#recherche">Recherche</a>
          <a href="#top">Top Red Flags</a>
          <a href="#regles">Règles</a>
        </div>
        <a href="#temoigner">
          <Button size="md">Témoigner</Button>
        </a>
      </nav>
    </header>
  );
}
