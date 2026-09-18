import { describe, expect, it } from "vitest";
import { scanPublicationText } from "@/lib/content-safety";

describe("scanPublicationText", () => {
  it("detects forbidden and sensitive terms", () => {
    const result = scanPublicationText("Cette situation de harcèlement vient d'un escroc.");
    expect(result.forbiddenMatches).toContain("escroc");
    expect(result.sensitiveMatches).toContain("harcèlement");
    expect(result.hasWarning).toBe(true);
  });

  it("warns about person names", () => {
    expect(scanPublicationText("Monsieur Kouassi a fait cela").personNameWarning).toBe(true);
  });
});
