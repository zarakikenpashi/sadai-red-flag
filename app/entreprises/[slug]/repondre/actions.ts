"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createCompanyResponse } from "@/lib/company-workflows";

export async function createCompanyResponseAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const user = await getCurrentUser();
  if (!user) redirect(`/auth?next=/entreprises/${slug}/repondre`);

  await createCompanyResponse({
    companyId: String(formData.get("company_id") ?? ""),
    testimonialId: String(formData.get("testimonial_id") ?? ""),
    representativeId: user.id,
    body: String(formData.get("body") ?? ""),
  });
  redirect(`/entreprises/${slug}?response=1`);
}
