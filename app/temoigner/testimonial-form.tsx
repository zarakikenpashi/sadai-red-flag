"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CompanySearchResult } from "@/lib/companies";
import { scanPublicationText } from "@/lib/content-safety";
import { createTestimonial } from "./actions";

const steps = [
  "Choix entreprise",
  "Statut et période",
  "Notes par catégorie",
  "Red flags",
  "Titre, texte et confirmations",
];

const scoreFields = [
  ["pay_score", "Paiement / salaire"],
  ["management_score", "Management"],
  ["workload_score", "Charge de travail"],
  ["hours_score", "Horaires"],
  ["promises_score", "Promesses tenues"],
  ["environment_score", "Ambiance / environnement"],
  ["training_score", "Formation / montée en compétence"],
] as const;

const flagOptions = [
  ["late_payment", "Paiement en retard"],
  ["extended_internship", "Stage prolongé abusivement"],
  ["unpaid_overtime", "Heures sup non payées"],
  ["unclear_contract", "Contrat flou"],
  ["broken_promises", "Promesses non tenues"],
  ["management", "Management problématique"],
  ["workload", "Charge excessive"],
  ["hours", "Horaires abusifs"],
  ["other", "Autre"],
] as const;

type Props = {
  companies: CompanySearchResult[];
};

export function TestimonialForm({ companies }: Props) {
  const [step, setStep] = useState(1);
  const [body, setBody] = useState("");
  const progress = useMemo(() => `${Math.round((step / steps.length) * 100)}%`, [step]);
  const safety = useMemo(() => scanPublicationText(body), [body]);

  return (
    <form action={createTestimonial} className="mt-8 grid gap-6">
      <Card className="border-red-100 bg-red-50/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-flag">
              Progression
            </p>
            <p className="mt-1 font-bold text-slate-600">
              Étape {step} sur {steps.length} — {steps[step - 1]}
            </p>
          </div>
          <p className="text-2xl font-black text-red-flag">{progress}</p>
        </div>
        <div className="mt-5 h-3 rounded-full bg-white">
          <div className="h-3 rounded-full bg-red-flag" style={{ width: progress }} />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-5">
          {steps.map((label, index) => (
            <button
              className={`rounded-2xl border px-3 py-2 text-left text-xs font-bold ${
                step === index + 1
                  ? "border-red-flag bg-white text-red-flag"
                  : "border-slate-200 bg-white/60 text-slate-500"
              }`}
              key={label}
              onClick={() => setStep(index + 1)}
              type="button"
            >
              Étape {index + 1}<br />
              {label}
            </button>
          ))}
        </div>
      </Card>

      <section className="grid gap-5">
        <Card>
          <h2 className="text-2xl font-black">Étape 1 : choix entreprise</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sélectionne l’entreprise concernée. Ton identité ne sera pas affichée publiquement.
          </p>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-700">
            Entreprise
            <select
              className="min-h-14 rounded-2xl border border-slate-200 px-5 text-base outline-none focus:border-red-flag focus:ring-4 focus:ring-red-100"
              name="company_id"
              required
            >
              <option value="">Choisir une entreprise</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name} — {company.city || company.country}
                </option>
              ))}
            </select>
          </label>
        </Card>
      </section>

      <section className="grid gap-5">
        <Card>
          <h2 className="text-2xl font-black">Étape 2 : statut, durée, période</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Statut
              <select
                className="min-h-14 rounded-2xl border border-slate-200 px-5 text-base outline-none focus:border-red-flag focus:ring-4 focus:ring-red-100"
                name="employment_status"
                required
              >
                <option value="">Choisir</option>
                <option value="intern">Stagiaire</option>
                <option value="permanent">CDI</option>
                <option value="fixed_term">CDD</option>
                <option value="freelance">Freelance</option>
                <option value="apprentice">Apprenti</option>
                <option value="consultant">Consultant</option>
                <option value="candidate">Candidat</option>
                <option value="other">Autre</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Durée
              <Input name="duration_label" placeholder="Ex. 6 mois" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Période
              <Input name="period_label" placeholder="Ex. 2024" required />
            </label>
          </div>
        </Card>
      </section>

      <section className="grid gap-5">
        <Card>
          <h2 className="text-2xl font-black">Étape 3 : notes par catégorie</h2>
          <p className="mt-2 text-sm text-slate-600">1 = très mauvais, 5 = correct.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scoreFields.map(([name, label]) => (
              <label className="grid gap-2 text-sm font-bold text-slate-700" key={name}>
                {label}
                <select
                  className="min-h-14 rounded-2xl border border-slate-200 px-5 text-base outline-none focus:border-red-flag focus:ring-4 focus:ring-red-100"
                  defaultValue="3"
                  name={name}
                  required
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-5">
        <Card>
          <h2 className="text-2xl font-black">Étape 4 : red flags</h2>
          <p className="mt-2 text-sm text-slate-600">Sélectionne au moins un signal faible ou fort.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {flagOptions.map(([value, label]) => (
              <label
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold"
                key={value}
              >
                <input name="flag_types" type="checkbox" value={value} />
                {label}
              </label>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-5">
        <Card>
          <h2 className="text-2xl font-black">Étape 5 : titre, texte, confirmations</h2>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-700">
              Règles affichées avant soumission
            </p>
            <p className="mt-2 text-sm font-bold text-slate-700">
              Ne cite pas de personnes physiques, retire les données personnelles,
              évite les insultes et consulte les <Link className="text-red-flag underline" href="/regles">règles de publication</Link>.
            </p>
          </div>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Titre
              <Input maxLength={140} minLength={3} name="title" placeholder="Ex. Retards de paiement répétés" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Texte du témoignage
              <textarea
                className="min-h-44 rounded-2xl border border-slate-200 p-5 text-base outline-none focus:border-red-flag focus:ring-4 focus:ring-red-100"
                maxLength={5000}
                minLength={20}
                name="body"
                onChange={(event) => setBody(event.target.value)}
                placeholder="Décris des faits observables, sans insultes ni données personnelles."
                required
                value={body}
              />
            </label>
            {safety.hasWarning ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-flag">
                <p>Termes sensibles détectés : reste factuel et anonymise ton texte.</p>
                {safety.forbiddenMatches.length ? <p>Termes interdits : {safety.forbiddenMatches.join(", ")}</p> : null}
                {safety.sensitiveMatches.length ? <p>Termes sensibles : {safety.sensitiveMatches.join(", ")}</p> : null}
                {safety.personNameWarning ? <p>Ne cite pas de personnes physiques.</p> : null}
              </div>
            ) : null}
            <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              <input name="confirm_truthful" required type="checkbox" />
              Je confirme que ce témoignage décrit mon expérience réelle et de bonne foi.
            </label>
            <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              <input name="confirm_no_personal_data" required type="checkbox" />
              Je confirme ne pas publier de noms de personnes, insultes ou données personnelles.
            </label>
            <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
              <input name="accept_publication_rules" required type="checkbox" />
              J’accepte les règles de publication et le passage en modération avant publication.
            </label>
          </div>
        </Card>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))} type="button" variant="secondary">
          Précédent
        </Button>
        {step < steps.length ? (
          <Button onClick={() => setStep((value) => Math.min(steps.length, value + 1))} type="button">
            Suivant
          </Button>
        ) : (
          <Button type="submit" variant="danger">
            Publier pour modération
          </Button>
        )}
      </div>
    </form>
  );
}
