import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type TestimonialInput = {
  company_id: string;
  user_id: string;
  employment_status: string;
  duration_label: string;
  period_label: string;
  title: string;
  body: string;
  scores: {
    pay_score: number;
    management_score: number;
    workload_score: number;
    hours_score: number;
    promises_score: number;
    environment_score: number;
    training_score: number;
  };
  flag_types: string[];
};

const employmentStatuses = new Set([
  "intern",
  "permanent",
  "fixed_term",
  "freelance",
  "apprentice",
  "consultant",
  "candidate",
  "other",
]);

const redFlagTypes = new Set([
  "late_payment",
  "extended_internship",
  "unpaid_overtime",
  "unclear_contract",
  "broken_promises",
  "management",
  "workload",
  "hours",
  "other",
]);

function assertScore(value: number, label: string) {
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw new Error(`${label} doit être noté de 1 à 5.`);
  }
}

export async function insertTestimonial(input: TestimonialInput) {
  if (!input.company_id) throw new Error("Choisis une entreprise.");
  if (!employmentStatuses.has(input.employment_status)) {
    throw new Error("Choisis un statut valide.");
  }
  if (input.duration_label.trim().length < 2) throw new Error("Indique la durée.");
  if (input.period_label.trim().length < 2) throw new Error("Indique la période.");
  if (input.title.trim().length < 3 || input.title.trim().length > 140) {
    throw new Error("Le titre doit faire entre 3 et 140 caractères.");
  }
  if (input.body.trim().length < 20 || input.body.trim().length > 5000) {
    throw new Error("Le témoignage doit faire entre 20 et 5000 caractères.");
  }

  for (const [key, value] of Object.entries(input.scores)) assertScore(value, key);

  const uniqueFlags = [...new Set(input.flag_types)].filter((flag) => redFlagTypes.has(flag));
  if (!uniqueFlags.length) throw new Error("Sélectionne au moins un red flag.");

  const supabase = await createSupabaseServerClient();
  const { data: testimonial, error: testimonialError } = await supabase
    .from("testimonials")
    .insert({
      company_id: input.company_id,
      user_id: input.user_id,
      employment_status: input.employment_status,
      duration_label: input.duration_label.trim(),
      period_label: input.period_label.trim(),
      title: input.title.trim(),
      body: input.body.trim(),
      verification_status: "declared",
      moderation_status: "pending",
    })
    .select("id")
    .single();

  if (testimonialError || !testimonial) {
    throw new Error(testimonialError?.message ?? "Impossible d’enregistrer le témoignage.");
  }

  const { error: scoreError } = await supabase.from("testimonial_scores").insert({
    testimonial_id: testimonial.id,
    ...input.scores,
  });

  if (scoreError) throw new Error(scoreError.message);

  const { error: flagsError } = await supabase.from("testimonial_flags").insert(
    uniqueFlags.map((flag_type) => ({
      testimonial_id: testimonial.id,
      flag_type,
    })),
  );

  if (flagsError) throw new Error(flagsError.message);

  redirect("/temoigner?success=1");
}
