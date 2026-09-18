import { expect, test } from "@playwright/test";

test("recherche entreprise", async ({ page }) => {
  await page.goto("/recherche?q=demo");
  await expect(page.getByText("Recherche entreprise")).toBeVisible();
});

test("fiche entreprise publique", async ({ page }) => {
  await page.goto("/entreprises/agence-baobab-digital");
  await expect(page.getByText("Red Flag Score")).toBeVisible();
});

test("soumission témoignage requiert auth", async ({ page }) => {
  await page.goto("/temoigner");
  await expect(page).toHaveURL(/\/auth/);
});

test("admin approbation requiert auth", async ({ page }) => {
  await page.goto("/admin/temoignages");
  await expect(page).toHaveURL(/\/auth/);
});

test("top red flags visible", async ({ page }) => {
  await page.goto("/top-red-flags");
  await expect(page.getByRole("heading", { name: "Top Red Flags" })).toBeVisible();
});
