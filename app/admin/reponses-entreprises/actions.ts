"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { moderateCompanyResponse } from "@/lib/company-workflows";
import { isModeratorProfile } from "@/lib/moderation";

async function assertModerator() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/reponses-entreprises");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");
  return user;
}

export async function approveResponseAction(formData: FormData) {
  const user = await assertModerator();
  await moderateCompanyResponse({ responseId: String(formData.get("response_id") ?? ""), moderatorId: user.id, status: "approved" });
  revalidatePath("/admin/reponses-entreprises");
}

export async function rejectResponseAction(formData: FormData) {
  const user = await assertModerator();
  await moderateCompanyResponse({ responseId: String(formData.get("response_id") ?? ""), moderatorId: user.id, status: "rejected" });
  revalidatePath("/admin/reponses-entreprises");
}
