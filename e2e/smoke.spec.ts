import { test, expect, type Page } from "@playwright/test";

// Smoke test sui flussi critici. Eseguire con: npm run test:e2e
// (la prima volta: npx playwright install)

// Il banner cookie è lazy (ssr:false) e su mobile copre i widget in basso:
// accettarlo prima di interagire. Attende anche l'hydration dei widget.
async function acceptCookies(page: Page) {
  await page
    .getByRole("button", { name: /accetta tutti/i })
    .click({ timeout: 8000 })
    .catch(() => {});
}

test.describe("smoke", () => {
  test("la home si carica con H1 e link alla vetrina", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // link alla pagina Lavori (/vetrina): nel menu su desktop, nella mappa del
    // sito su mobile
    await expect(
      page.locator('a[href="/vetrina"]:visible').first(),
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
    await acceptCookies(page);
    await page.getByRole("button", { name: /apri la chat/i }).click();
    const dialog = page.getByRole("dialog", {
      name: /assistente ai wowspace/i,
    });
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: /chiudi la chat/i }).click();
    await expect(dialog).toBeHidden();
  });

  test("la command palette si apre", async ({ page }) => {
    await page.goto("/");
    await acceptCookies(page);
    // desktop: trigger "cerca" → palette; mobile: l'hamburger apre il menu.
    const trigger = page.getByRole("button", { name: /apri palette comandi/i });
    const menu = page.getByRole("button", {
      name: /apri menu di navigazione/i,
    });
    await expect(trigger.or(menu).first()).toBeVisible();
    if (await trigger.isVisible()) {
      await trigger.click();
    } else {
      await menu.click();
    }
    await expect(
      page.getByRole("dialog", {
        name: /palette comandi|menu di navigazione/i,
      }),
    ).toBeVisible();
  });

  // Sul telefono la galassia è piccola: l'area cliccabile di un pianeta deve
  // essere il suo disco (più un margine), NON tutto il canvas con l'alone,
  // altrimenti le scatole invisibili si coprono a vicenda e il tocco su un
  // pianeta finisce a un altro (o al nucleo, che non è un link). Campiona
  // nel tempo (i pianeti orbitano) il centro e il bordo di ogni disco.
  test("i pianeti della galassia si toccano sul disco giusto", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 664 });
    await page.goto("/");
    await acceptCookies(page);
    const nav = page.locator('nav[aria-label^="La galassia"]');
    await expect(nav.locator("a")).toHaveCount(6);
    for (let sample = 0; sample < 6; sample++) {
      const wrong = await nav.evaluate((n) => {
        const bad: string[] = [];
        n.querySelectorAll("a").forEach((a) => {
          const cv = a.querySelector("canvas");
          if (!cv) return;
          const r = cv.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          // il disco è il canvas diviso per il bordo (PLANET_PAD = 3.4)
          const rad = (r.width / 3.4 / 2) * 0.8;
          for (const [x, y] of [
            [cx, cy],
            [cx + rad, cy],
            [cx - rad, cy],
            [cx, cy + rad],
            [cx, cy - rad],
          ]) {
            const top = document.elementFromPoint(x, y);
            if (!top || !a.contains(top))
              bad.push(
                `${a.getAttribute("href")} → ${top?.closest("a")?.getAttribute("href") ?? top?.tagName ?? "nulla"}`,
              );
          }
        });
        return bad;
      });
      expect(wrong).toEqual([]);
      await page.waitForTimeout(700);
    }
    // e il tocco apre davvero la pagina del pianeta toccato
    const planet = nav.locator("a").nth(1);
    const href = await planet.getAttribute("href");
    const box = await planet.locator("canvas").boundingBox();
    if (!box || !href) throw new Error("pianeta senza canvas");
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page).toHaveURL(new RegExp(`${href}$`), { timeout: 15_000 });
  });

  test("navigazione alla pagina Servizi", async ({ page }) => {
    await page.goto("/servizi");
    await expect(page).toHaveURL(/\/servizi/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
