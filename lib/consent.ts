export type Consent = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const ALL_OFF: Consent = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

const asBool = (x: unknown): boolean => (typeof x === "boolean" ? x : false);

// Parsing + validazione difensiva del consenso salvato (localStorage): non si
// fida del JSON grezzo, controlla tipi e campi prima di restituire un Consent.
// `necessary` è sempre true (cookie tecnici obbligatori).
export function parseConsent(raw: string | null | undefined): Consent | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  return {
    necessary: true,
    preferences: asBool(v.preferences),
    analytics: asBool(v.analytics),
    marketing: asBool(v.marketing),
    updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : "",
  };
}
