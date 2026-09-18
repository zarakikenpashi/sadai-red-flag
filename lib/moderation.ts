import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calculateRedFlagScore, type TestimonialScoreInput } from "@/lib/scoring";

type Profile = {
  id: string;
  role: string;
} | null;

export function isModeratorProfile(profile: Profile) {
  return profile?.role === "admin" || profile?.role === "moderator";
}

export async function getPendingTestimonialsForModeration() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id,title,body,employment_status,duration_label,period_label,moderation_status,moderator_note,created_at,user_id,companies(name,slug),testimonial_scores(*),testimonial_flags(flag_type)")
    .eq("moderation_status", "pending")
    .order("created_at", { ascending: true })
    .limit(50);

  if (error || !data) return [];

  return data.map((item) => ({
    ...item,
    company: Array.isArray(item.companies) ? item.companies[0] : item.companies,
    flags: Array.isArray(item.testimonial_flags) ? item.testimonial_flags.map((flag) => flag.flag_type) : [],
    scores: Array.isArray(item.testimonial_scores) ? item.testimonial_scores[0] : item.testimonial_scores,
  }));
}

export async function recalculateCompanyScore(companyId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: scores, error } = await supabase
    .from("testimonial_scores")
    .select("pay_score,management_score,workload_score,hours_score,promises_score,environment_score,training_score,testimonials!inner(moderation_status,company_id)")
    .eq("testimonials.company_id", companyId)
    .eq("testimonials.moderation_status", "approved");

  if (error) throw new Error(error.message);

  const result = calculateRedFlagScore((scores ?? []) as TestimonialScoreInput[]);
  const { error: updateError } = await supabase
    .from("companies")
    .update({
      red_flag_score: result.score,
      score_confidence: result.confidence,
      testimonial_count: result.testimonialCount,
    })
    .eq("id", companyId);

  if (updateError) throw new Error(updateError.message);
  return result;
}

export async function moderateTestimonial({
  testimonialId,
  moderatorId,
  status,
  reason,
}: {
  testimonialId: string;
  moderatorId: string;
  status: "approved" | "needs_changes" | "rejected" | "hidden";
  reason: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: current, error: fetchError } = await supabase
    .from("testimonials")
    .select("company_id")
    .eq("id", testimonialId)
    .single();

  if (fetchError || !current) throw new Error(fetchError?.message ?? "Témoignage introuvable.");

  const { error: updateError } = await supabase
    .from("testimonials")
    .update({
      moderation_status: status,
      moderator_note: reason || null,
      published_at: status === "approved" ? new Date().toISOString() : null,
    })
    .eq("id", testimonialId);

  if (updateError) throw new Error(updateError.message);

  const { error: eventError } = await supabase.from("moderation_events").insert({
    entity_type: "testimonial",
    entity_id: testimonialId,
    moderator_id: moderatorId,
    action: status,
    reason,
  });

  if (eventError) throw new Error(eventError.message);
  await recalculateCompanyScore(current.company_id);
}

export async function getOpenReportsForModeration() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reports")
    .select("id,reason,comment,status,created_at,testimonials(id,title,body,companies(name,slug))")
    .in("status", ["open", "reviewing"])
    .order("created_at", { ascending: true })
    .limit(50);

  if (error || !data) return [];
  return data;
}

export async function resolveReport(reportId: string, moderatorId: string, action = "resolved") {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("reports")
    .update({ status: action === "dismissed" ? "dismissed" : "resolved", reviewed_by: moderatorId, reviewed_at: new Date().toISOString() })
    .eq("id", reportId);
  if (error) throw new Error(error.message);
}
