import { describe, expect, it } from "vitest";
import { isFromSite } from "@/lib/security/same-origin";

const h = (obj: Record<string, string>) => new Headers(obj);

describe("isFromSite", () => {
  it("accetta same-origin (Origin host == Host)", () => {
    expect(
      isFromSite(h({ host: "wowspace.it", origin: "https://wowspace.it" })),
    ).toBe(true);
  });

  it("accetta via Referer quando manca Origin", () => {
    expect(
      isFromSite(
        h({ host: "localhost:3000", referer: "http://localhost:3000/x" }),
      ),
    ).toBe(true);
  });

  it("rifiuta cross-origin", () => {
    expect(
      isFromSite(h({ host: "wowspace.it", origin: "https://evil.example" })),
    ).toBe(false);
  });

  it("rifiuta senza Origin/Referer (es. curl)", () => {
    expect(isFromSite(h({ host: "wowspace.it" }))).toBe(false);
  });

  it("rifiuta se manca l'Host", () => {
    expect(isFromSite(h({ origin: "https://wowspace.it" }))).toBe(false);
  });
});
