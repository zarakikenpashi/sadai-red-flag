"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { isModeratorProfile, moderateTestimonial } from "@/lib/moderation";

async function assertModerator() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/temoignages");

  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");

  return user;
}

async function moderate(formData: FormData, status: "approved" | "needs_changes" | "rejected" | "hidden") {
  const user = await assertModerator();
  await moderateTestimonial({
    testimonialId: String(formData.get("testimonial_id") ?? ""),
    moderatorId: user.id,
    status,
    reason: String(formData.get("reason") ?? ""),
  });
  revalidatePath("/admin/temoignages");
}

export async function approveTestimonialAction(formData: FormData) {
  await moderate(formData, "approved");
}

export async function requestChangesTestimonialAction(formData: FormData) {
  await moderate(formData, "needs_changes");
}

export async function rejectTestimonialAction(formData: FormData) {
  await moderate(formData, "rejected");
}

export async function hideTestimonialAction(formData: FormData) {
  await moderate(formData, "hidden");
}
