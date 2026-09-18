"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile, getCurrentUser } from "@/lib/auth";
import { moderateCompanyClaim } from "@/lib/company-workflows";
import { isModeratorProfile } from "@/lib/moderation";

async function assertModerator() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/admin/revendications");
  const profile = await getCurrentProfile();
  if (!isModeratorProfile(profile)) redirect("/app");
  return user;
}

export async function approveClaimAction(formData: FormData) {
  const user = await assertModerator();
  await moderateCompanyClaim({ claimId: String(formData.get("claim_id") ?? ""), moderatorId: user.id, status: "approved" });
  revalidatePath("/admin/revendications");
}

export async function rejectClaimAction(formData: FormData) {
  const user = await assertModerator();
  await moderateCompanyClaim({ claimId: String(formData.get("claim_id") ?? ""), moderatorId: user.id, status: "rejected" });
  revalidatePath("/admin/revendications");
}
