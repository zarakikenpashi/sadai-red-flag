"use server";

import { proposeCompany } from "@/lib/company-proposals";

export async function proposeCompanyAction(formData: FormData) {
  await proposeCompany({
    name: String(formData.get("name") ?? ""),
    city: String(formData.get("city") ?? ""),
    country: String(formData.get("country") ?? "Côte d’Ivoire"),
    sector: String(formData.get("sector") ?? ""),
    description: String(formData.get("description") ?? ""),
  });
}
