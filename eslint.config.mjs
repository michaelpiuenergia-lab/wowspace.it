import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

// Flat config nativo di eslint-config-next (Next 16): include core-web-vitals
// e le regole TypeScript. Aggiungiamo solo le cartelle da ignorare.
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...next,
  {
    rules: {
      // Testi in italiano pieni di apostrofi: l'escape obbligatorio è rumore.
      "react/no-unescaped-entities": "off",
      // Pattern noti (init di stato derivato in effect): da rivedere, non bloccanti.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // disattiva le regole ESLint che confliggono con Prettier (formattazione).
  prettier,
];

export default eslintConfig;
