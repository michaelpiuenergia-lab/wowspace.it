"use client";

import Link from "next/link";
import { useState } from "react";
import { Scene3D, type SceneVariant } from "@/components/graphics/scene-3d";
import { servicePages } from "@/lib/landing-content";
import styles from "./solutions-grid.module.css";

type Cat = "siti" | "vendite" | "operativita" | "ai";

type Item = {
  slug: keyof typeof servicePages;
  cat: Cat;
  scene: SceneVariant;
  tags: string[];
  wide?: boolean;
};

// Le cose che costruiamo, come una vetrina di progetti: ogni soluzione ha la
// sua scena 3D e un filtro per tipo. I testi vengono dalle pagine di
// servizio.
const ITEMS: Item[] = [
  {
    slug: "siti-web",
    cat: "siti",
    scene: "site",
    tags: ["Sito", "SEO inclusa", "Next.js"],
    wide: true,
  },
  {
    slug: "crm-su-misura",
    cat: "vendite",
    scene: "crm",
    tags: ["CRM", "Pipeline", "Follow-up"],
  },
  {
    slug: "e-commerce",
    cat: "siti",
    scene: "site",
    tags: ["E-commerce", "Catalogo", "Checkout"],
  },
  {
    slug: "software-gestionali",
    cat: "operativita",
    scene: "erp",
    tags: ["Gestionale", "Commesse", "Magazzino"],
  },
  {
    slug: "automazioni-ai",
    cat: "ai",
    scene: "ai",
    tags: ["AI", "Automazioni", "Assistente"],
    wide: true,
  },
  {
    slug: "portali-clienti",
    cat: "operativita",
    scene: "portal",
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
                    <Scene3D variant={it.scene} compact={!it.wide} />
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
