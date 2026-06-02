import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";

function makeReq(headers: Record<string, string>, body: unknown) {
  return new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const SAME_ORIGIN = {
  host: "localhost:3000",
  origin: "http://localhost:3000",
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/chat", () => {
  it("403 se la richiesta non ha Origin/Referer (es. curl)", async () => {
    const res = await POST(makeReq({ host: "localhost:3000" }, {}));
    expect(res.status).toBe(403);
  });

  it("403 se la richiesta è cross-origin", async () => {
    const res = await POST(
      makeReq({ host: "localhost:3000", origin: "https://evil.example" }, {}),
    );
    expect(res.status).toBe(403);
  });

  it("400 same-origin con messaggi vuoti (chiave presente)", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const res = await POST(makeReq(SAME_ORIGIN, { messages: [] }));
    expect(res.status).toBe(400);
  });

  it("200 con messaggio di cortesia se manca la chiave API", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    const res = await POST(
      makeReq(SAME_ORIGIN, { messages: [{ role: "user", content: "ciao" }] }),
    );
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text.toLowerCase()).toMatch(/non è ancora attivo|scrivimi|chiama/);
  });
});
