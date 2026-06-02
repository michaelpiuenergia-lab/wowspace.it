import { test, expect } from "@playwright/test";

// Smoke test sui flussi critici. Eseguire con: npm run test:e2e
// (la prima volta: npx playwright install)
test.describe("smoke", () => {
  test("la home si carica con H1 e link alla vetrina", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /vetrina/i }).first(),
    ).toBeVisible();
  });

  test("nessun overflow orizzontale su mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/");
    // il documento non deve essere più largo del viewport (testo che esce)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("la chat si apre e si chiude", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /apri la chat/i }).click();
    const dialog = page.getByRole("dialog", { name: /assistente wowspace/i });
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: /chiudi la chat/i }).click();
    await expect(dialog).toBeHidden();
  });

  test("la command palette si apre con il tasto /", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("/");
    await expect(
      page.getByRole("dialog", { name: /palette comandi/i }),
    ).toBeVisible();
  });

  test("navigazione alla pagina Servizi", async ({ page }) => {
    await page.goto("/servizi");
    await expect(page).toHaveURL(/\/servizi/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
