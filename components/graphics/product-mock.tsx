import styles from "./product-mock.module.css";

export type MockVariant = "dashboard" | "site" | "crm" | "erp" | "ai" | "portal";

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

function DashboardMock() {
  const kpis = [
    { value: "+24%", label: "Vendite" },
    { value: "312", label: "Clienti" },
    { value: "1.8k", label: "Visite" },
  ];
  return (
    <div className={styles.dash}>
      <div className={styles.dashKpis}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpi}>
            <strong>
              <span className={styles.kpiUp}>▲</span>
              {k.value}
            </strong>
            <small>{k.label}</small>
          </div>
        ))}
      </div>
      <div className={styles.dashChart}>
        <svg
          className={styles.chartSvg}
          viewBox="0 0 320 120"
          preserveAspectRatio="none"
        >
          <path
            className={styles.chartArea}
            d="M0,92 L40,74 L80,82 L120,52 L160,62 L200,36 L240,46 L280,22 L320,30 L320,120 L0,120 Z"
          />
          <path
            className={styles.chartLine}
            d="M0,92 L40,74 L80,82 L120,52 L160,62 L200,36 L240,46 L280,22 L320,30"
          />
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

function SiteMock() {
  return (
    <div className={styles.site}>
      <div className={styles.siteNav}>
        <span className={styles.navLogo} />
        <span className={styles.navLinks}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.navBtn} />
      </div>
      <div className={styles.siteHero}>
        <span className={styles.heroBadge} />
        <span className={styles.lineLg} />
        <span className={`${styles.lineLg} ${styles.short}`} />
        <span className={styles.lineSm} />
        <span className={styles.heroBtns}>
          <b />
          <b />
        </span>
      </div>
      <div className={styles.siteCards}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

function CrmMock() {
  const cols = [
    { label: "Nuovi", n: 5, cards: 3 },
    { label: "In trattativa", n: 3, cards: 2 },
    { label: "Chiusi", n: 8, cards: 2 },
  ];
  return (
    <div className={styles.crm}>
      <div className={styles.crmStats}>
        <div className={styles.stat}>
          <strong>128</strong>
          <span>Lead</span>
        </div>
        <div className={styles.stat}>
          <strong>34</strong>
          <span>Trattative</span>
        </div>
        <div className={styles.stat}>
          <strong>+18%</strong>
          <span>Questo mese</span>
        </div>
      </div>
      <div className={styles.pipeline}>
        {cols.map((col) => (
          <div key={col.label} className={styles.col}>
            <div className={styles.colHead}>
              <span>{col.label}</span>
              <em>{col.n}</em>
            </div>
            {Array.from({ length: col.cards }).map((_, i) => (
              <div key={i} className={styles.lead}>
                <span className={styles.leadDot} />
                <span className={styles.leadLines}>
                  <i />
                  <i className={styles.short} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ErpMock() {
  return (
    <div className={styles.erp}>
      <div className={styles.erpSide}>
        <span className={styles.sideActive} />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.erpMain}>
        <div className={styles.table}>
          <div className={`${styles.tRow} ${styles.tHead}`}>
            <i />
            <i />
            <i />
            <i />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.tRow}>
              <i />
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className={styles.chart}>
          {[55, 80, 45, 95, 70].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiMock() {
  return (
    <div className={styles.ai}>
      <div className={`${styles.msg} ${styles.msgIn}`}>
        <i />
        <i className={styles.short} />
      </div>
      <div className={`${styles.msg} ${styles.msgOut}`}>
        <i />
        <i />
        <i className={styles.short} />
      </div>
      <div className={styles.aiAction}>✓ Lead classificato e assegnato</div>
      <div className={styles.aiAction}>✓ Follow-up pronto da inviare</div>
      <div className={styles.typing}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function PortalMock() {
  return (
    <div className={styles.portal}>
      <div className={styles.portalHead}>
        <span className={styles.avatar} />
        <span className={styles.portalLines}>
          <i />
          <i className={styles.short} />
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
        {["Contratto.pdf", "Report.pdf", "Fattura.pdf"].map((doc) => (
          <div key={doc} className={styles.doc}>
            <span className={styles.docIcon} />
            <span className={styles.docName}>{doc}</span>
            <span className={styles.docBtn} />
          </div>
        ))}
      </div>
    </div>
  );
}
