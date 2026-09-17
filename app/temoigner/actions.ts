"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { insertTestimonial } from "@/lib/testimonials";

function numberFrom(formData: FormData, key: string) {
  return Number.parseInt(String(formData.get(key) ?? ""), 10);
}

export async function createTestimonial(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/temoigner");

  const confirmTruthful = formData.get("confirm_truthful") === "on";
  const confirmNoPersonalData = formData.get("confirm_no_personal_data") === "on";

  if (!confirmTruthful || !confirmNoPersonalData) {
    redirect("/temoigner?error=confirmations");
  }

  await insertTestimonial({
    company_id: String(formData.get("company_id") ?? ""),
    user_id: user.id,
    employment_status: String(formData.get("employment_status") ?? ""),
    duration_label: String(formData.get("duration_label") ?? ""),
    period_label: String(formData.get("period_label") ?? ""),
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    scores: {
      pay_score: numberFrom(formData, "pay_score"),
      management_score: numberFrom(formData, "management_score"),
      workload_score: numberFrom(formData, "workload_score"),
      hours_score: numberFrom(formData, "hours_score"),
      promises_score: numberFrom(formData, "promises_score"),
      environment_score: numberFrom(formData, "environment_score"),
      training_score: numberFrom(formData, "training_score"),
    },
    flag_types: formData.getAll("flag_types").map(String),
  });
}
