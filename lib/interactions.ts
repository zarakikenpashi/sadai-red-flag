import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function markHelpful(testimonialId: string, userId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("helpful_votes").insert({
    testimonial_id: testimonialId,
    user_id: userId,
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    throw new Error(error.message);
  }

  const { count } = await supabase
    .from("helpful_votes")
    .select("id", { count: "exact", head: true })
    .eq("testimonial_id", testimonialId);

  await supabase
    .from("testimonials")
    .update({ helpful_count: count ?? 1 })
    .eq("id", testimonialId);
}

export async function reportTestimonial({
  testimonialId,
  reporterId,
  reason,
  comment,
}: {
  testimonialId: string;
  reporterId: string;
  reason: string;
  comment: string;
}) {
  const allowed = new Set([
    "fake_testimonial",
    "insult",
    "personal_data",
    "named_attack",
    "off_topic",
    "other",
  ]);

  if (!allowed.has(reason)) throw new Error("Motif de signalement invalide.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("reports").insert({
    testimonial_id: testimonialId,
    reporter_id: reporterId,
    reason,
    comment: comment.trim() || null,
    status: "open",
  });

  if (error) throw new Error(error.message);
}

export async function requireAuthRedirect(userId: string | undefined, next: string) {
  if (!userId) redirect(`/auth?next=${encodeURIComponent(next)}`);
}
