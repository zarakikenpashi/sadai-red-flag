import { createSupabaseServerClient } from "@/lib/supabase/server";
import { demoCompanies, type DemoCompany } from "@/lib/demo-data";

export type CompanySearchResult = DemoCompany;

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function searchCompanies(
  companies: CompanySearchResult[],
  query: string,
) {
  const normalized = normalizeSearch(query);

  if (!normalized) {
    return companies;
  }

  return companies.filter((company) => {
    const haystack = [
      company.name,
      company.city,
      company.country,
      company.sector,
      company.description,
      ...company.frequent_flags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export async function getCompanies(query = ""): Promise<CompanySearchResult[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const request = supabase
      .from("companies")
      .select(
        "id,name,slug,city,country,sector,description,red_flag_score,score_confidence,testimonial_count",
      )
      .order("testimonial_count", { ascending: false })
      .limit(25);

    if (query.trim()) {
      request.ilike("name", `%${query.trim()}%`);
    }

    const { data, error } = await request;

    if (error || !data?.length) {
      return searchCompanies(demoCompanies, query);
    }

    return data.map((company) => ({
      id: company.id,
      name: company.name,
      slug: company.slug,
      city: company.city ?? "",
      country: company.country ?? "",
      sector: company.sector ?? "",
      description: company.description ?? "",
      red_flag_score: company.red_flag_score ?? 0,
      score_confidence: company.score_confidence ?? "low",
      testimonial_count: company.testimonial_count ?? 0,
      frequent_flags: [],
    }));
  } catch {
    return searchCompanies(demoCompanies, query);
  }
}
