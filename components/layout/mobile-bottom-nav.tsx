const items = [
  ["Accueil", "#hero"],
  ["Recherche", "#recherche"],
  ["Top", "#top"],
  ["Témoigner", "#temoigner"],
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 text-center text-xs font-bold text-slate-600">
        {items.map(([label, href]) => (
          <a
            className="rounded-2xl px-2 py-3 transition hover:bg-slate-50 data-[accent=true]:bg-red-flag data-[accent=true]:text-white"
            data-accent={label === "Témoigner"}
            href={href}
            key={href}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
