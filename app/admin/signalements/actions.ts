"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { isModeratorProfile, resolveReport } from "@/lib/moderation";

async function assertModerator() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/signalements");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");
  return user;
}

export async function resolveReportAction(formData: FormData) {
  const user = await assertModerator();
  await resolveReport(String(formData.get("report_id") ?? ""), user.id, "resolved");
  revalidatePath("/admin/signalements");
}

export async function dismissReportAction(formData: FormData) {
  const user = await assertModerator();
  await resolveReport(String(formData.get("report_id") ?? ""), user.id, "dismissed");
  revalidatePath("/admin/signalements");
}
