export type TestimonialScoreInput = {
  pay_score: number;
  management_score: number;
  workload_score: number;
  hours_score: number;
  promises_score: number;
  environment_score: number;
  training_score: number;
};

export type RedFlagScoreResult = {
  score: number;
  testimonialCount: number;
  confidence: "low" | "medium" | "high";
  categoryScores: {
    pay: number;
    management: number;
    workload: number;
    hours: number;
    promises: number;
    environment: number;
    training: number;
  };
};

const weights = {
  pay_score: 0.22,
  management_score: 0.17,
  promises_score: 0.16,
  workload_score: 0.14,
  hours_score: 0.13,
  environment_score: 0.1,
  training_score: 0.08,
} satisfies Record<keyof TestimonialScoreInput, number>;

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(5, Math.max(1, value));
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

export function calculateRedFlagScore(scores: TestimonialScoreInput[]): RedFlagScoreResult {
  const testimonialCount = scores.length;

  if (!testimonialCount) {
    return {
      score: 0,
      testimonialCount: 0,
      confidence: "low",
      categoryScores: {
        pay: 0,
        management: 0,
        workload: 0,
        hours: 0,
        promises: 0,
        environment: 0,
        training: 0,
      },
    };
  }

  const categoryScores = {
    pay: average(scores.map((item) => clampScore(item.pay_score))),
    management: average(scores.map((item) => clampScore(item.management_score))),
    workload: average(scores.map((item) => clampScore(item.workload_score))),
    hours: average(scores.map((item) => clampScore(item.hours_score))),
    promises: average(scores.map((item) => clampScore(item.promises_score))),
    environment: average(scores.map((item) => clampScore(item.environment_score))),
    training: average(scores.map((item) => clampScore(item.training_score))),
  };

  const weightedAverage = scores.reduce((total, item) => {
    return total +
      clampScore(item.pay_score) * weights.pay_score +
      clampScore(item.management_score) * weights.management_score +
      clampScore(item.promises_score) * weights.promises_score +
      clampScore(item.workload_score) * weights.workload_score +
      clampScore(item.hours_score) * weights.hours_score +
      clampScore(item.environment_score) * weights.environment_score +
      clampScore(item.training_score) * weights.training_score;
  }, 0) / testimonialCount;

  // 1/5 is a strong red flag, 5/5 is low risk. Convert to a 0-100 risk score.
  const score = Math.round(((5 - weightedAverage) / 4) * 100);

  return {
    score,
    testimonialCount,
    confidence: testimonialCount >= 10 ? "high" : testimonialCount >= 3 ? "medium" : "low",
    categoryScores,
  };
}
