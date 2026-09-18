"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createCompanyClaim } from "@/lib/company-workflows";

export async function claimCompanyAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const user = await getCurrentUser();
  if (!user) redirect(`/auth?next=/entreprises/${slug}/revendiquer`);

  await createCompanyClaim({
    companyId: String(formData.get("company_id") ?? ""),
    requesterId: user.id,
    requesterName: String(formData.get("requester_name") ?? ""),
    requesterEmail: String(formData.get("requester_email") ?? user.email ?? ""),
    requesterRole: String(formData.get("requester_role") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  redirect(`/entreprises/${slug}?claim=1`);
}
