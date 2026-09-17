import { demoCompanies } from "@/lib/demo-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CompanyProposalInput = {
  name: string;
  city: string;
  country: string;
  sector: string;
  description?: string;
};

export type CompanyProposalResult = {
  ok: boolean;
  slug?: string;
  message: string;
  errors?: Record<string, string>;
};

export function createCompanySlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function validateCompanyProposal(input: CompanyProposalInput) {
  const errors: Record<string, string> = {};

  if (input.name.trim().length < 2) errors.name = "Nom trop court.";
  if (input.city.trim().length < 2) errors.city = "Ville obligatoire.";
  if (input.country.trim().length < 2) errors.country = "Pays obligatoire.";
  if (input.sector.trim().length < 2) errors.sector = "Secteur obligatoire.";

  return errors;
}

export function detectCompanyDuplicate(name: string) {
  const slug = createCompanySlug(name);
  return demoCompanies.find(
    (company) => company.slug === slug || company.name.toLowerCase() === name.trim().toLowerCase(),
  );
}

export async function proposeCompany(
  input: CompanyProposalInput,
): Promise<CompanyProposalResult> {
  const errors = validateCompanyProposal(input);
  if (Object.keys(errors).length) {
    return { ok: false, message: "Certains champs doivent être corrigés.", errors };
  }

  const duplicate = detectCompanyDuplicate(input.name);
  if (duplicate) {
    return {
      ok: false,
      slug: duplicate.slug,
      message: "Cette entreprise ressemble à une fiche déjà existante.",
    };
  }

  const slug = createCompanySlug(input.name);

  try {
    const supabase = await createSupabaseServerClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      return {
        ok: false,
        message: "Connecte-toi pour proposer une fiche entreprise.",
      };
    }

    const { error } = await supabase.from("companies").insert({
      name: input.name.trim(),
      slug,
      city: input.city.trim(),
      country: input.country.trim(),
      sector: input.sector.trim(),
      description: input.description?.trim() || null,
      created_by: userData.user.id,
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, slug, message: "Fiche entreprise proposée." };
  } catch {
    return {
      ok: false,
      slug,
      message:
        "La proposition est prête, mais Supabase n’est pas configuré pour cette session.",
    };
  }
}
