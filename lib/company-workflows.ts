import { createSupabaseServerClient } from "@/lib/supabase/server";
import { scanPublicationText } from "@/lib/content-safety";

export async function createCompanyClaim({
  companyId,
  requesterId,
  requesterName,
  requesterEmail,
  requesterRole,
  message,
}: {
  companyId: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterRole: string;
  message: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("company_claims").insert({
    company_id: companyId,
    requester_id: requesterId,
    requester_name: requesterName.trim(),
    requester_email: requesterEmail.trim().toLowerCase(),
    requester_role: requesterRole.trim(),
    message: message.trim() || null,
    status: "pending",
  });
  if (error) throw new Error(error.message);
}

export async function getPendingCompanyClaims() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("company_claims")
    .select("id,requester_id,requester_name,requester_email,requester_role,message,status,created_at,companies(id,name,slug)")
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data;
}

export async function moderateCompanyClaim({ claimId, moderatorId, status }: { claimId: string; moderatorId: string; status: "approved" | "rejected" }) {
  const supabase = await createSupabaseServerClient();
  const { data: claim, error: fetchError } = await supabase
    .from("company_claims")
    .select("id,company_id,requester_id")
    .eq("id", claimId)
    .single();
  if (fetchError || !claim) throw new Error(fetchError?.message ?? "Demande introuvable.");

  const { error } = await supabase
    .from("company_claims")
    .update({ status, reviewed_by: moderatorId, reviewed_at: new Date().toISOString() })
    .eq("id", claimId);
  if (error) throw new Error(error.message);

  if (status === "approved") {
    const { error: companyError } = await supabase
      .from("companies")
      .update({ claim_status: "approved", claimed_by: claim.requester_id })
      .eq("id", claim.company_id);
    if (companyError) throw new Error(companyError.message);
  }

  await supabase.from("moderation_events").insert({
    entity_type: "company_claim",
    entity_id: claimId,
    moderator_id: moderatorId,
    action: status,
    reason: "Revendication entreprise",
  });
}

export async function createCompanyResponse({
  companyId,
  testimonialId,
  representativeId,
  body,
}: {
  companyId: string;
  testimonialId: string;
  representativeId: string;
  body: string;
}) {
  const safety = scanPublicationText(body);
  if (safety.personNameWarning) throw new Error("La réponse ne peut pas révéler l’identité supposée de l’auteur.");
  if (body.trim().length < 20 || body.trim().length > 3000) throw new Error("La réponse doit faire entre 20 et 3000 caractères.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("company_responses").insert({
    company_id: companyId,
    testimonial_id: testimonialId,
    representative_id: representativeId,
    body: body.trim(),
    moderation_status: "pending",
  });
  if (error) throw new Error(error.message);
}

export async function getPendingCompanyResponses() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("company_responses")
    .select("id,body,moderation_status,created_at,companies(name,slug),testimonials(title)")
    .eq("moderation_status", "pending")
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  return data;
}

export async function moderateCompanyResponse({ responseId, moderatorId, status }: { responseId: string; moderatorId: string; status: "approved" | "rejected" }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("company_responses")
    .update({ moderation_status: status, published_at: status === "approved" ? new Date().toISOString() : null })
    .eq("id", responseId);
  if (error) throw new Error(error.message);

  await supabase.from("moderation_events").insert({
    entity_type: "company_response",
    entity_id: responseId,
    moderator_id: moderatorId,
    action: status,
    reason: "Réponse entreprise",
  });
}
