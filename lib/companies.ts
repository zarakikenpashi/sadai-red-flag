import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  demoCompanies,
  demoTestimonials,
  type DemoCompany,
  type DemoTestimonial,
} from "@/lib/demo-data";

export type CompanySearchResult = DemoCompany;
export type CompanyTestimonial = DemoTestimonial;

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function searchCompanies(
  companies: CompanySearchResult[],
  query: string,
) {
  const normalized = normalizeSearch(query);

  if (!normalized) return companies;

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

    if (query.trim()) request.ilike("name", `%${query.trim()}%`);

    const { data, error } = await request;

    if (error || !data?.length) return searchCompanies(demoCompanies, query);

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
      category_scores: demoCompanies.find((item) => item.slug === company.slug)
        ?.category_scores ?? {
        pay: 0,
        management: 0,
        workload: 0,
        hours: 0,
        promises: 0,
        environment: 0,
        training: 0,
      },
    }));
  } catch {
    return searchCompanies(demoCompanies, query);
  }
}

export async function getCompanyBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("companies")
      .select(
        "id,name,slug,city,country,sector,description,red_flag_score,score_confidence,testimonial_count",
      )
      .eq("slug", slug)
      .single();

    if (error || !data) return demoCompanies.find((company) => company.slug === slug) ?? null;

    const demo = demoCompanies.find((company) => company.slug === data.slug);

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      city: data.city ?? "",
      country: data.country ?? "",
      sector: data.sector ?? "",
      description: data.description ?? "",
      red_flag_score: data.red_flag_score ?? 0,
      score_confidence: data.score_confidence ?? "low",
      testimonial_count: data.testimonial_count ?? 0,
      frequent_flags: demo?.frequent_flags ?? [],
      category_scores: demo?.category_scores ?? {
        pay: 0,
        management: 0,
        workload: 0,
        hours: 0,
        promises: 0,
        environment: 0,
        training: 0,
      },
    } satisfies CompanySearchResult;
  } catch {
    return demoCompanies.find((company) => company.slug === slug) ?? null;
  }
}

export async function getCompanyTestimonials(slug: string) {
  try {
    const company = await getCompanyBySlug(slug);
    if (!company) return [];

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select(
        "id,title,body,employment_status,duration_label,period_label,verification_status,moderation_status,helpful_count,testimonial_scores(*),testimonial_flags(flag_type)",
      )
      .eq("company_id", company.id)
      .eq("moderation_status", "approved")
      .order("published_at", { ascending: false })
      .limit(10);

    if (error || !data?.length) {
      return demoTestimonials.filter((item) => item.company_slug === slug);
    }

    return data.map((item) => ({
      id: item.id,
      company_slug: slug,
      title: item.title,
      body: item.body,
      employment_status: item.employment_status,
      duration_label: item.duration_label ?? "",
      period_label: item.period_label ?? "",
      verification_status: item.verification_status,
      moderation_status: item.moderation_status,
      helpful_count: item.helpful_count ?? 0,
      flags: Array.isArray(item.testimonial_flags)
        ? item.testimonial_flags.map((flag) => flag.flag_type)
        : [],
    })) satisfies CompanyTestimonial[];
  } catch {
    return demoTestimonials.filter((item) => item.company_slug === slug);
  }
}
