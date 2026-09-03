"use client";

import Link from "next/link";
import { useState } from "react";
import { DeviceFrame, PhoneScreen } from "@/components/graphics/device-frame";
import {
  ProductMock,
  type MockVariant,
} from "@/components/graphics/product-mock";
import { servicePages } from "@/lib/landing-content";
import styles from "./solutions-grid.module.css";

type Cat = "siti" | "vendite" | "operativita" | "ai";

type Item = {
  slug: keyof typeof servicePages;
  cat: Cat;
  mock: MockVariant;
  phone: "notify" | "chat";
  notes: "site" | "erp";
  tags: string[];
  wide?: boolean;
};

// Le cose che costruiamo, come una vetrina di progetti: ogni soluzione ha la
// sua copertina (portatile + telefono) e un filtro per tipo. I testi vengono
// dalle pagine di servizio.
const ITEMS: Item[] = [
  {
    slug: "siti-web",
    cat: "siti",
    mock: "site",
    phone: "notify",
    notes: "site",
    tags: ["Sito", "SEO inclusa", "Next.js"],
    wide: true,
  },
  {
    slug: "crm-su-misura",
    cat: "vendite",
    mock: "crm",
    phone: "chat",
    notes: "site",
    tags: ["CRM", "Pipeline", "Follow-up"],
  },
  {
    slug: "e-commerce",
    cat: "siti",
    mock: "site",
    phone: "notify",
    notes: "site",
    tags: ["E-commerce", "Catalogo", "Checkout"],
  },
  {
    slug: "software-gestionali",
    cat: "operativita",
    mock: "erp",
    phone: "notify",
    notes: "erp",
    tags: ["Gestionale", "Commesse", "Magazzino"],
  },
  {
    slug: "automazioni-ai",
    cat: "ai",
    mock: "ai",
    phone: "chat",
    notes: "site",
    tags: ["AI", "Automazioni", "Assistente"],
    wide: true,
  },
  {
    slug: "portali-clienti",
    cat: "operativita",
    mock: "portal",
    phone: "notify",
    notes: "site",
    tags: ["Area clienti", "Accessi", "Documenti"],
  },
];

const FILTERS: { id: Cat | "tutti"; label: string }[] = [
  { id: "tutti", label: "Tutto" },
  { id: "siti", label: "Siti ed e-commerce" },
  { id: "vendite", label: "Vendite" },
  { id: "operativita", label: "Operatività" },
  { id: "ai", label: "AI" },
];

export function SolutionsGrid() {
  const [filter, setFilter] = useState<Cat | "tutti">("tutti");
  const items = ITEMS.filter((it) => filter === "tutti" || it.cat === filter);

  return (
    <section id="soluzioni" className={`section-spacing ${styles.section}`}>
      <div className="section-shell-wide">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">Cosa costruiamo</span>
            <h2 className={styles.title}>Le soluzioni, una per una.</h2>
          </div>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filtra le soluzioni"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={styles.filter}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {items.map((it, i) => {
            const page = servicePages[it.slug];
            return (
              <Link
                key={`${filter}-${it.slug}`}
                href={`/servizi/${it.slug}`}
                className={`${styles.card} ${it.wide ? styles.wide : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className={styles.cover} aria-hidden="true">
                  <div className={styles.glow} />
                  <div className={styles.laptop}>
                    <DeviceFrame kind="laptop">
                      <ProductMock variant={it.mock} />
                    </DeviceFrame>
                  </div>
                  <div className={styles.phone}>
                    <DeviceFrame kind="phone">
                      <PhoneScreen variant={it.phone} notes={it.notes} />
                    </DeviceFrame>
                  </div>
                </div>
                <div className={styles.text}>
                  <span className={styles.kicker}>{page.kicker}</span>
                  <h3 className={styles.h3}>{page.h1}</h3>
                  <ul className={styles.tags}>
                    {it.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <span className={styles.more}>Scopri &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
