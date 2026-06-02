import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Unit/integration test (Vitest). Gli E2E (Playwright) restano in /e2e e sono
// esclusi qui. Eseguire con: npm run test
export default defineConfig({
  plugins: [react()],
  test: {
    // globals:true abilita l'auto-cleanup di Testing Library tra i test.
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**", "playwright-report/**"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
