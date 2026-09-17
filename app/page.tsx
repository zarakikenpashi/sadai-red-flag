export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B0F14]">
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
          <a
            className="rounded-full bg-[#EF233C] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-[#D90429]"
            href="#temoigner"
          >
            Témoigner
          </a>
        </nav>
      </header>

      <main>
        <section
          id="hero"
          className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24"
        >
          <div className="flex flex-col justify-center">
            <p className="mb-4 w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#EF233C]">
              Transparence professionnelle • Abidjan d’abord
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Avant de signer, vérifie l’entreprise.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              RED FLAG rassemble des expériences anonymes et modérées pour aider
              les jeunes candidats à poser les bonnes questions avant un stage,
              un job ou un entretien.
            </p>

            <div id="recherche" className="mt-8 rounded-3xl bg-white p-3 shadow-2xl shadow-slate-200">
              <label className="sr-only" htmlFor="company-search">
                Chercher une entreprise
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="company-search"
                  className="min-h-14 flex-1 rounded-2xl border border-slate-200 px-5 text-base outline-none transition focus:border-[#EF233C] focus:ring-4 focus:ring-red-100"
                  placeholder="Cherche une entreprise avant de signer..."
                  type="search"
                />
                <button className="min-h-14 rounded-2xl bg-[#0B0F14] px-6 font-bold text-white transition hover:bg-slate-800">
                  Rechercher
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-2xl bg-[#EF233C] px-6 py-4 text-center font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-[#D90429]"
                href="#temoigner"
              >
                Raconter mon expérience
              </a>
              <a
                className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center font-bold transition hover:border-slate-300 hover:bg-slate-50"
                href="#top"
              >
                Voir le top red flags
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[#0B0F14] p-6 text-white shadow-2xl shadow-slate-300">
            <div className="rounded-3xl bg-white p-5 text-[#0B0F14]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">Entreprise exemple</p>
                  <h2 className="mt-1 text-2xl font-black">Agence XYZ</h2>
                  <p className="text-sm text-slate-500">Abidjan • Marketing</p>
                </div>
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-center text-[#EF233C]">
                  <p className="text-3xl font-black">34</p>
                  <p className="text-xs font-bold">/100</p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-[#8D0B1A]">
                Vigilance élevée — score basé sur 42 expériences publiées.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  ["💰 Paiement", "43% des témoignages"],
                  ["👔 Management", "35% des témoignages"],
                  ["⏰ Horaires", "29% des témoignages"],
                ].map(([label, value]) => (
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-3" key={label}>
                    <span className="font-bold">{label}</span>
                    <span className="text-slate-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Le score n’est pas un verdict : c’est un signal communautaire de
              vigilance, accompagné de témoignages modérés et contextualisés.
            </p>
          </aside>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="top">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-[#EF233C]">🚨 Ça revient souvent</p>
              <h2 className="mt-2 text-3xl font-black">Signaux à vérifier avant entretien</h2>
            </div>
            <p className="hidden max-w-md text-sm text-slate-500 md:block">
              Les classements MVP utiliseront un seuil minimum de témoignages pour
              éviter les conclusions injustes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Paiement en retard", "Vérifie les délais réels de paiement."],
              ["Stage prolongé", "Demande les conditions de fin de stage."],
              ["Contrat flou", "Clarifie salaire, durée et horaires."],
            ].map(([title, body]) => (
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={title}>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="temoigner">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="font-bold text-[#EF233C]">Contribution MVP</p>
                <h2 className="mt-2 text-3xl font-black">Raconter sans s’exposer.</h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Le formulaire MVP sera en 5 étapes : entreprise, statut,
                  notes, red flags, récit. L’identité ne sera pas affichée
                  publiquement et les contenus passeront en modération.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Expérience déclarée",
                  "Modération avant publication",
                  "Vote utile",
                  "Droit de réponse entreprise",
                ].map((item) => (
                  <div className="rounded-2xl bg-slate-50 p-4 font-bold" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10" id="regles">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-black">Règle produit dès le départ</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              RED FLAG n’est pas une plateforme de harcèlement ou de règlement de
              comptes. Les témoignages devront rester factuels, sans noms de
              personnes physiques, sans insultes et avec droit de réponse pour
              les entreprises revendiquées.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
