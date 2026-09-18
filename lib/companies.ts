import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  demoCompanies,
  demoTestimonials,
  type DemoCompany,
  type DemoTestimonial,
} from "@/lib/demo-data";
import { calculateRedFlagScore } from "@/lib/scoring";

export type CompanySearchResult = DemoCompany & { claim_status?: string };
export type CompanyTestimonial = DemoTestimonial & {
  responses?: { id: string; body: string; created_at?: string }[];
};

const emptyCategoryScores = {
  pay: 0,
  management: 0,
  workload: 0,
  hours: 0,
  promises: 0,
  environment: 0,
  training: 0,
};

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function searchCompanies(companies: CompanySearchResult[], query: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return companies;

  return companies.filter((company) => {
    const haystack = [company.name, company.city, company.country, company.sector, company.description, ...company.frequent_flags]
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
      .select("id,name,slug,city,country,sector,description,red_flag_score,score_confidence,testimonial_count,claim_status")
      .order("testimonial_count", { ascending: false })
      .limit(25);

    if (query.trim()) request.ilike("name", `%${query.trim()}%`);

    const { data, error } = await request;
    if (error || !data?.length) return searchCompanies(demoCompanies.map((company) => ({ ...company, claim_status: "unclaimed" })), query);

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
      claim_status: company.claim_status ?? "unclaimed",
      frequent_flags: [],
      category_scores: demoCompanies.find((item) => item.slug === company.slug)?.category_scores ?? emptyCategoryScores,
    }));
  } catch {
    return searchCompanies(demoCompanies.map((company) => ({ ...company, claim_status: "unclaimed" })), query);
  }
}

export async function getCompanyBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("companies")
      .select("id,name,slug,city,country,sector,description,red_flag_score,score_confidence,testimonial_count,claim_status")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const demo = demoCompanies.find((company) => company.slug === slug);
      return demo ? { ...demo, claim_status: "unclaimed" } : null;
    }

    const { data: scores } = await supabase
      .from("testimonial_scores")
      .select("pay_score,management_score,workload_score,hours_score,promises_score,environment_score,training_score,testimonials!inner(moderation_status,company_id)")
      .eq("testimonials.company_id", data.id)
      .eq("testimonials.moderation_status", "approved");

    const scoreResult = calculateRedFlagScore(scores ?? []);
    const demo = demoCompanies.find((company) => company.slug === data.slug);

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      city: data.city ?? "",
      country: data.country ?? "",
      sector: data.sector ?? "",
      description: data.description ?? "",
      red_flag_score: data.red_flag_score ?? scoreResult.score,
      score_confidence: data.score_confidence ?? scoreResult.confidence,
      testimonial_count: data.testimonial_count ?? scoreResult.testimonialCount,
      claim_status: data.claim_status ?? "unclaimed",
      frequent_flags: demo?.frequent_flags ?? [],
      category_scores: scoreResult.testimonialCount ? scoreResult.categoryScores : demo?.category_scores ?? emptyCategoryScores,
    } satisfies CompanySearchResult;
  } catch {
    const demo = demoCompanies.find((company) => company.slug === slug);
    return demo ? { ...demo, claim_status: "unclaimed" } : null;
  }
}

export async function getCompanyTestimonials(slug: string) {
  try {
    const company = await getCompanyBySlug(slug);
    if (!company) return [];

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id,title,body,employment_status,duration_label,period_label,verification_status,moderation_status,helpful_count,published_at,testimonial_scores(*),testimonial_flags(flag_type),company_responses(id,body,moderation_status,created_at)")
      .eq("company_id", company.id)
      .eq("moderation_status", "approved")
      .order("published_at", { ascending: false })
      .limit(20);

    if (error || !data?.length) return demoTestimonials.filter((item) => item.company_slug === slug).map((item) => ({ ...item, responses: [] }));

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
      flags: Array.isArray(item.testimonial_flags) ? item.testimonial_flags.map((flag) => flag.flag_type) : [],
      responses: Array.isArray(item.company_responses)
        ? item.company_responses
            .filter((response) => response.moderation_status === "approved")
            .map((response) => ({ id: response.id, body: response.body, created_at: response.created_at }))
        : [],
    })) satisfies CompanyTestimonial[];
  } catch {
    return demoTestimonials.filter((item) => item.company_slug === slug).map((item) => ({ ...item, responses: [] }));
  }
}

export async function getTopRedFlagCompanies() {
  const companies = await getCompanies();
  return companies
    .filter((company) => company.testimonial_count >= 1)
    .sort((a, b) => b.red_flag_score - a.red_flag_score)
    .slice(0, 20);
}
