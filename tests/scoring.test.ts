import { describe, expect, it } from "vitest";
import { calculateRedFlagScore } from "@/lib/scoring";

describe("calculateRedFlagScore", () => {
  it("returns zero and low confidence without testimonials", () => {
    expect(calculateRedFlagScore([])).toMatchObject({ score: 0, testimonialCount: 0, confidence: "low" });
  });

  it("weights low scores as high red flag risk", () => {
    const result = calculateRedFlagScore([
      { pay_score: 1, management_score: 2, workload_score: 2, hours_score: 1, promises_score: 1, environment_score: 2, training_score: 3 },
    ]);
    expect(result.score).toBeGreaterThan(65);
    expect(result.confidence).toBe("low");
  });

  it("uses testimonial count to compute confidence", () => {
    const inputs = Array.from({ length: 10 }, () => ({ pay_score: 3, management_score: 3, workload_score: 3, hours_score: 3, promises_score: 3, environment_score: 3, training_score: 3 }));
    expect(calculateRedFlagScore(inputs).confidence).toBe("high");
  });
});
