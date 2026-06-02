const isProd = process.env.NODE_ENV === "production";

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "mailto:"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'", "data:"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "script-src": isProd
    ? ["'self'", "'unsafe-inline'"]
    : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  "connect-src": isProd ? ["'self'"] : ["'self'", "ws:", "wss:"],
  "manifest-src": ["'self'"],
  "worker-src": ["'self'", "blob:"],
  "upgrade-insecure-requests": [],
};

function buildCsp(): string {
  return Object.entries(cspDirectives)
    .map(([directive, values]) =>
      values.length ? `${directive} ${values.join(" ")}` : directive,
    )
    .join("; ");
}

export const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp() },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "0" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];
