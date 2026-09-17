import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    .select(
      "id,title,body,employment_status,duration_label,period_label,moderation_status,moderator_note,created_at,user_id,companies(name,slug),testimonial_scores(*),testimonial_flags(flag_type)",
    )
    .eq("moderation_status", "pending")
    .order("created_at", { ascending: true })
    .limit(50);

  if (error || !data) return [];

  return data.map((item) => ({
    ...item,
    company: Array.isArray(item.companies) ? item.companies[0] : item.companies,
    flags: Array.isArray(item.testimonial_flags)
      ? item.testimonial_flags.map((flag) => flag.flag_type)
      : [],
    scores: Array.isArray(item.testimonial_scores)
      ? item.testimonial_scores[0]
      : item.testimonial_scores,
  }));
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
}
