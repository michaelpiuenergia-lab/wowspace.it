import styles from "./product-mock.module.css";

export type MockVariant =
  | "dashboard"
  | "site"
  | "crm"
  | "erp"
  | "ai"
  | "portal";

const barTitle: Record<MockVariant, string> = {
  dashboard: "Dashboard · Panoramica",
  site: "wowspace.it",
  crm: "CRM · Pipeline vendite",
  erp: "Gestionale · Commesse",
  ai: "Assistente AI",
  portal: "Area clienti",
};

export function ProductMock({ variant }: { variant: MockVariant }) {
  return (
    <div className={`${styles.window} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.barTitle}>{barTitle[variant]}</span>
        <span className={styles.live}>
          <i className={styles.livePulse} />
          live
        </span>
      </div>
      <div className={styles.body}>
        {variant === "dashboard" && <DashboardMock />}
        {variant === "site" && <SiteMock />}
        {variant === "crm" && <CrmMock />}
        {variant === "erp" && <ErpMock />}
        {variant === "ai" && <AiMock />}
        {variant === "portal" && <PortalMock />}
      </div>
    </div>
  );
}

/* ============ DASHBOARD ============ */
function DashboardMock() {
  const kpis = [
    { value: "€ 48,2k", label: "Ricavi", delta: "+24%", trend: "up" as const },
    { value: "312", label: "Clienti", delta: "+12", trend: "up" as const },
    {
      value: "3,4%",
      label: "Conversione",
      delta: "-0,3",
      trend: "down" as const,
    },
  ];
  return (
    <div className={styles.dash}>
      <div className={styles.dashKpis}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpi}>
            <small>{k.label}</small>
            <strong>{k.value}</strong>
            <span
              className={`${styles.kpiDelta} ${k.trend === "down" ? styles.kpiDown : styles.kpiUp}`}
            >
              <i>{k.trend === "down" ? "▾" : "▴"}</i>
              {k.delta}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.dashChart}>
        <div className={styles.chartHead}>
          <span className={styles.chartTitle}>Andamento ricavi</span>
          <span className={styles.chartPeriod}>Ultimi 9 mesi</span>
        </div>
        <svg
          className={styles.chartSvg}
          viewBox="0 0 320 110"
          preserveAspectRatio="none"
        >
          <line className={styles.chartGrid} x1="0" y1="30" x2="320" y2="30" />
          <line className={styles.chartGrid} x1="0" y1="60" x2="320" y2="60" />
          <line className={styles.chartGrid} x1="0" y1="90" x2="320" y2="90" />
          <path
            className={styles.chartPrev}
            d="M0,88 L40,82 L80,86 L120,72 L160,78 L200,60 L240,68 L280,50 L320,56"
          />
          <path
            className={styles.chartArea}
            d="M0,84 L40,68 L80,76 L120,46 L160,56 L200,30 L240,40 L280,16 L320,24 L320,110 L0,110 Z"
          />
          <path
            className={styles.chartLine}
            d="M0,84 L40,68 L80,76 L120,46 L160,56 L200,30 L240,40 L280,16 L320,24"
          />
          <circle className={styles.chartNode} cx="280" cy="16" r="3.4" />
        </svg>
      </div>
      <div className={styles.dashLegend}>
        <span className={styles.legendItem}>
          <i className={styles.legendDot} />
          Questo mese
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.legendDot} ${styles.legendMuted}`} />
          Periodo precedente
        </span>
      </div>
    </div>
  );
}

/* ============ SITE ============ */
function SiteMock() {
  return (
    <div className={styles.site}>
      <div className={styles.siteNav}>
        <span className={styles.navBrand}>
          <span className={styles.navLogo} />
          <em>Atelier Nord</em>
        </span>
        <span className={styles.navLinks}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.navBtn} />
      </div>
      <div className={styles.siteHero}>
        <span className={styles.heroBadge}>Studio di architettura</span>
        <p className={styles.heroTitle}>Spazi che raccontano chi sei.</p>
        <p className={styles.heroSub}>
          Progetti su misura, dal concept al cantiere.
        </p>
        <span className={styles.heroBtns}>
          <b className={styles.heroBtnPrimary}>Richiedi un preventivo</b>
          <b className={styles.heroBtnGhost}>Portfolio</b>
        </span>
      </div>
      <div className={styles.siteCards}>
        <div className={styles.siteCard}>
          <span className={styles.cardDot} />
          <i />
          <i className={styles.short} />
        </div>
        <div className={styles.siteCard}>
          <span className={styles.cardDot} />
          <i />
          <i className={styles.short} />
        </div>
        <div className={styles.siteCard}>
          <span className={styles.cardDot} />
          <i />
          <i className={styles.short} />
        </div>
      </div>
    </div>
  );
}

/* ============ CRM ============ */
function CrmMock() {
  const cols = [
    {
      label: "Nuovi",
      n: 5,
      tone: "new" as const,
      cards: [
        { name: "Rossi Costruzioni", value: "€ 12.400" },
        { name: "Verdi & Co.", value: "€ 4.800" },
      ],
    },
    {
      label: "In trattativa",
      n: 3,
      tone: "hot" as const,
      cards: [
        { name: "Studio Bianchi", value: "€ 28.000" },
        { name: "Caffè Centrale", value: "€ 6.200" },
      ],
    },
    {
      label: "Chiusi",
      n: 8,
      tone: "won" as const,
      cards: [{ name: "Officine Po", value: "€ 19.500" }],
    },
  ];
  const toneClass = {
    new: styles.colNew,
    hot: styles.colHot,
    won: styles.colWon,
  };
  const initials = (name: string) =>
    name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
  return (
    <div className={styles.crm}>
      <div className={styles.crmStats}>
        <div className={styles.stat}>
          <strong>128</strong>
          <span>Lead totali</span>
        </div>
        <div className={styles.stat}>
          <strong>€ 84k</strong>
          <span>In pipeline</span>
        </div>
        <div className={styles.stat}>
          <strong>+18%</strong>
          <span>Questo mese</span>
        </div>
      </div>
      <div className={styles.pipeline}>
        {cols.map((col) => (
          <div
            key={col.label}
            className={`${styles.col} ${toneClass[col.tone]}`}
          >
            <div className={styles.colHead}>
              <span>{col.label}</span>
              <em>{col.n}</em>
            </div>
            <div className={styles.leads}>
              {col.cards.map((card, i) => (
                <div
                  key={card.name}
                  className={`${styles.lead} ${col.tone === "new" && i === 0 ? styles.leadNew : ""}`}
                >
                  <span className={styles.leadAvatar}>
                    {initials(card.name)}
                  </span>
                  <span className={styles.leadInfo}>
                    <strong>{card.name}</strong>
                    <span>{card.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ ERP ============ */
function ErpMock() {
  const rows = [
    {
      code: "C-204",
      client: "Rossi Spa",
      state: "in corso",
      amount: "€ 18.400",
    },
    {
      code: "C-198",
      client: "Verdi srl",
      state: "consegnata",
      amount: "€ 9.250",
    },
    {
      code: "C-211",
      client: "Po Group",
      state: "preventivo",
      amount: "€ 31.000",
    },
    {
      code: "C-187",
      client: "Atelier N.",
      state: "in corso",
      amount: "€ 7.800",
    },
  ];
  const stateTone: Record<string, string> = {
    "in corso": styles.pillProgress,
    consegnata: styles.pillDone,
    preventivo: styles.pillQuote,
  };
  const bars = [
    { h: 52, m: "Gen" },
    { h: 78, m: "Feb" },
    { h: 44, m: "Mar" },
    { h: 96, m: "Apr" },
    { h: 68, m: "Mag" },
    { h: 60, m: "Giu" },
  ];
  return (
    <div className={styles.erp}>
      <div className={styles.table}>
        <div className={`${styles.tRow} ${styles.tHead}`}>
          <span>Commessa</span>
          <span>Cliente</span>
          <span>Stato</span>
          <span className={styles.tRight}>Importo</span>
        </div>
        {rows.map((r) => (
          <div key={r.code} className={styles.tRow}>
            <span className={styles.tCode}>{r.code}</span>
            <span className={styles.tClient}>{r.client}</span>
            <span>
              <em className={`${styles.pill} ${stateTone[r.state]}`}>
                {r.state}
              </em>
            </span>
            <span className={`${styles.tAmount} ${styles.tRight}`}>
              {r.amount}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.erpChart}>
        <div className={styles.chartHead}>
          <span className={styles.chartTitle}>Fatturato per mese</span>
          <span className={styles.chartTrend}>+22%</span>
        </div>
        <div className={styles.chart}>
          {bars.map((b) => (
            <span key={b.m} className={styles.bar}>
              <i style={{ height: `${b.h}%` }} />
              <small>{b.m}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ AI ============ */
function AiMock() {
  return (
    <div className={styles.ai}>
      <div className={`${styles.msg} ${styles.msgIn}`}>
        Prepara il preventivo per Rossi Costruzioni.
      </div>
      <div className={`${styles.msg} ${styles.msgOut}`}>
        Fatto. Bozza pronta su 3 voci, totale € 12.400.
      </div>
      <div className={styles.aiActions}>
        <span className={styles.aiAction}>✓ Preventivo generato</span>
        <span className={styles.aiAction}>✓ Email pronta da inviare</span>
      </div>
      <div className={styles.typing}>
        <span className={styles.typingDots}>
          <i />
          <i />
          <i />
        </span>
        <small>l&apos;assistente sta scrivendo…</small>
      </div>
    </div>
  );
}

/* ============ PORTAL ============ */
function PortalMock() {
  const docs = [
    { name: "Contratto_2026.pdf", meta: "PDF · 240 KB" },
    { name: "Report_avanzamento.pdf", meta: "PDF · 1,2 MB" },
    { name: "Fattura_06.pdf", meta: "PDF · 88 KB" },
  ];
  return (
    <div className={styles.portal}>
      <div className={styles.portalHead}>
        <span className={styles.avatar}>MR</span>
        <span className={styles.portalInfo}>
          <strong>Marco Rossi</strong>
          <span>Rossi Costruzioni</span>
        </span>
        <span className={styles.portalBadge}>
          <i className={styles.portalBadgeDot} />
          Attivo
        </span>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressTop}>
          <span>Stato lavori</span>
          <strong>70%</strong>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: "70%" }} />
        </div>
      </div>
      <div className={styles.docList}>
        {docs.map((doc) => (
          <div key={doc.name} className={styles.doc}>
            <span className={styles.docIcon}>PDF</span>
            <span className={styles.docMeta}>
              <strong>{doc.name}</strong>
              <span>{doc.meta}</span>
            </span>
            <span className={styles.docBtn} />
          </div>
        ))}
      </div>
    </div>
  );
}
