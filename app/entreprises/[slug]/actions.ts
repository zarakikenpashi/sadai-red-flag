"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { markHelpful, reportTestimonial } from "@/lib/interactions";

export async function helpfulVoteAction(formData: FormData) {
  const slug = String(formData.get("company_slug") ?? "");
  const testimonialId = String(formData.get("testimonial_id") ?? "");
  const user = await getCurrentUser();

  if (!user) redirect(`/auth?next=/entreprises/${slug}`);

  await markHelpful(testimonialId, user.id);
  revalidatePath(`/entreprises/${slug}`);
}

export async function reportTestimonialAction(formData: FormData) {
  const slug = String(formData.get("company_slug") ?? "");
  const testimonialId = String(formData.get("testimonial_id") ?? "");
  const user = await getCurrentUser();

  if (!user) redirect(`/auth?next=/entreprises/${slug}`);

  await reportTestimonial({
    testimonialId,
    reporterId: user.id,
    reason: String(formData.get("reason") ?? ""),
    comment: String(formData.get("comment") ?? ""),
  });

  redirect(`/entreprises/${slug}?reported=1#temoignages`);
}
