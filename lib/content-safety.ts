export const FORBIDDEN_TERMS = [
  "connard",
  "connasse",
  "salaud",
  "salope",
  "pute",
  "merdeux",
  "escroc",
  "voleur",
  "criminel",
  "terroriste",
];

export const SENSITIVE_TERMS = [
  "harcèlement",
  "menace",
  "violence",
  "chantage",
  "corruption",
  "fraude",
  "discrimination",
  "racisme",
  "sexisme",
  "santé mentale",
  "dépression",
  "suicide",
  "illégal",
];

const PERSON_NAME_PATTERN = /\b(?:monsieur|madame|m\.|mme|mr|mrs)\s+[A-ZÀ-ÖØ-Þ][\p{L}'-]+|\b[A-ZÀ-ÖØ-Þ][\p{L}'-]+\s+[A-ZÀ-ÖØ-Þ][\p{L}'-]+/u;

function collectMatches(text: string, terms: string[]) {
  const normalized = text.toLowerCase();
  return terms.filter((term) => normalized.includes(term.toLowerCase()));
}

export function scanPublicationText(text: string) {
  const forbiddenMatches = collectMatches(text, FORBIDDEN_TERMS);
  const sensitiveMatches = collectMatches(text, SENSITIVE_TERMS);
  const personNameWarning = PERSON_NAME_PATTERN.test(text);

  return {
    forbiddenMatches,
    sensitiveMatches,
    personNameWarning,
    hasWarning: forbiddenMatches.length > 0 || sensitiveMatches.length > 0 || personNameWarning,
  };
}
