import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CookieConsent } from "@/components/legal/cookie-consent";
import { parseConsent } from "@/lib/consent";

const KEY = "wowspace.consent.v1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("CookieConsent", () => {
  it("mostra il banner se non c'è consenso salvato", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("region", { name: /avviso cookie/i })).toBeTruthy();
  });

  it("'accetta tutti' salva tutti i consensi e chiude il banner", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: /accetta tutti/i }));
    const saved = parseConsent(window.localStorage.getItem(KEY));
    expect(saved).toMatchObject({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
    expect(screen.queryByRole("region", { name: /avviso cookie/i })).toBeNull();
  });

  it("'solo necessari' salva solo i cookie necessari", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: /solo necessari/i }));
    const saved = parseConsent(window.localStorage.getItem(KEY));
    expect(saved).toMatchObject({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
  });

  it("'personalizza' apre il dialog delle preferenze", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: /personalizza/i }));
    expect(
      screen.getByRole("dialog", { name: /preferenze cookie/i }),
    ).toBeTruthy();
  });

  it("non mostra il banner se un consenso è già stato salvato", () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false,
        updatedAt: "2026-06-02",
      }),
    );
    render(<CookieConsent />);
    expect(screen.queryByRole("region", { name: /avviso cookie/i })).toBeNull();
  });
});
