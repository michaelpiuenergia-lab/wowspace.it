import { describe, expect, it } from "vitest";
import { parseConsent } from "@/lib/consent";

describe("parseConsent", () => {
  it("ritorna null per input vuoto o JSON non valido", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("")).toBeNull();
    expect(parseConsent("{non-json")).toBeNull();
    expect(parseConsent("42")).toBeNull();
    expect(parseConsent("null")).toBeNull();
  });

  it("normalizza i campi e forza necessary=true", () => {
    const c = parseConsent(
      JSON.stringify({
        preferences: true,
        analytics: false,
        marketing: true,
        updatedAt: "2026-06-02",
      }),
    );
    expect(c).toEqual({
      necessary: true,
      preferences: true,
      analytics: false,
      marketing: true,
      updatedAt: "2026-06-02",
    });
  });

  it("difende dai tipi sbagliati: non-boolean -> false, updatedAt non-stringa -> ''", () => {
    const c = parseConsent(
      JSON.stringify({
        preferences: "yes",
        analytics: 1,
        marketing: null,
        updatedAt: 123,
      }),
    );
    expect(c).toEqual({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      updatedAt: "",
    });
  });
});
