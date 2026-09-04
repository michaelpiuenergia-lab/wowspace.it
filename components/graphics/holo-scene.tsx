import { useId, type CSSProperties, type ReactNode } from "react";
import styles from "./holo-scene.module.css";

// Le scene "ologramma" delle sezioni: niente sfere, niente dispositivi.
// Ogni scena è il DIAGRAMMA del prodotto di cui parla il testo a fianco:
//   site   · un foglio di pagina che si compone, con la scansione SEO
//   crm    · la pipeline a corsie con il lead che avanza fino a "chiuso"
//   erp    · tre lastre isometriche (interfaccia, processi, dati) su un asse
//   ai     · una rete di nodi tra ingressi e uscite, attraversata da impulsi
//   portal · il portale ad arco dell'area riservata, ruoli e permessi
// La geometria è SVG statico nella tinta della pagina; tutto ciò che si
// muove è HTML animato solo con transform/opacity (compositor). I
// frammenti su vetro (kpi, lead, chat, stato, barra) restano come "prove".
// Coordinate: viewBox 500×400; un'unità = 0.2cqw della scena.
export type SceneVariant = "site" | "crm" | "erp" | "ai" | "portal";

const HUE: Record<SceneVariant, number> = {
  site: 188,
  crm: 92,
  erp: 222,
  ai: 268,
  portal: 158,
};

type Pt = [number, number];
const U = 0.2; // cqw per unità del viewBox
// una polilinea ricampionata in cinque tappe equidistanti: così il punto
// di luce va a velocità costante anche su un tratto solo
function five(pts: Pt[]): Pt[] {
  const seg: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(d);
    total += d;
  }
  const out: Pt[] = [];
  for (let k = 0; k < 5; k++) {
    let want = (total * k) / 4;
    let i = 0;
    while (i < seg.length - 1 && want > seg[i]) {
      want -= seg[i];
      i++;
    }
    const t = seg[i] ? want / seg[i] : 0;
    out.push([
      pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t,
      pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t,
    ]);
  }
  return out;
}
// stella a quattro punte (un "nodo" che non è una pallina)
const STAR =
  "M0,-1 C.15,-.15 .15,-.15 1,0 C.15,.15 .15,.15 0,1 C-.15,.15 -.15,.15 -1,0 C-.15,-.15 -.15,-.15 0,-1Z";
function Star({
  x,
  y,
  r,
  halo,
  fill = "#f4f7ff",
}: {
  x: number;
  y: number;
  r: number;
  halo: string;
  fill?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.6} fill={halo} />
      <path
        d={STAR}
        transform={`translate(${x} ${y}) scale(${r})`}
        fill={fill}
      />
    </g>
  );
}
const at = (x: number, y: number): CSSProperties => ({
  left: `${x / 5}%`,
  top: `${y / 4}%`,
});
const tint = (l: number, a: number, h = "var(--hue)") =>
  `hsla(${h} 88% ${l}% / ${a})`;

export function HoloScene({
  variant,
  compact = false,
  className = "",
}: {
  variant: SceneVariant;
  /** card piccole: struttura sì, etichette e dettagli secondari no */
  compact?: boolean;
  className?: string;
}) {
  const Body = BODIES[variant];
  return (
    <div
      className={`${styles.scene} ${compact ? styles.compact : ""} ${className}`.trim()}
      style={{ "--hue": HUE[variant] } as CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.beam} />
      <span className={styles.glow} />
      <Body />
      <span className={styles.floor} />
    </div>
  );
}

// ---------------- mattoni comuni ----------------
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg className={styles.svg} viewBox="0 0 500 400" aria-hidden="true">
      {children}
    </svg>
  );
}

// etichetta mono (secondaria = sparisce nelle card piccole)
function Label({
  x,
  y,
  children,
  sec = true,
  tone,
  dot,
  tiny = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  sec?: boolean;
  tone?: string;
  dot?: string;
  tiny?: boolean;
}) {
  return (
    <span
      className={`${styles.label} ${sec ? styles.sec : ""} ${tiny ? styles.tiny : ""}`}
      style={{ ...at(x, y), color: tone }}
    >
      {dot && <i style={{ background: dot }} />}
      {children}
    </span>
  );
}

// un punto di luce che percorre fino a 5 tappe rettilinee (75% del ciclo),
// poi riposa spento
function Runner({
  path,
  T,
  d = 0,
  tone,
}: {
  path: Pt[];
  T: number;
  d?: number;
  tone?: string;
}) {
  const pts = path.length === 5 ? path : five(path);
  const style: Record<string, string> = {
    "--T": `${T}s`,
    "--d": `${d}s`,
  };
  pts.forEach(([x, y], i) => {
    style[`--p${i}x`] = `${(x * U).toFixed(2)}cqw`;
    style[`--p${i}y`] = `${(y * U).toFixed(2)}cqw`;
  });
  if (tone) style["--tone"] = tone;
  return <i className={styles.runner} style={style as CSSProperties} />;
}

// l'alone di un nodo che brilla per un istante a ogni ciclo
function Halo({ x, y, T, d }: { x: number; y: number; T: number; d: number }) {
  return (
    <i
      className={styles.halo}
      style={{ ...at(x, y), "--T": `${T}s`, "--d": `${d}s` } as CSSProperties}
    />
  );
}

// ---------------- frammenti su vetro ----------------
type FragKind = "kpi" | "lead" | "chat" | "status" | "bar";
function Glass({
  kind,
  x,
  y,
  w,
  T = 10,
  sec = false,
  kpi,
  status,
  dot,
  pill,
}: {
  kind: FragKind;
  x: number;
  y: number;
  w: number;
  T?: number;
  sec?: boolean;
  kpi?: [string, string];
  status?: [string, string];
  /** colore del puntino dello stato */
  dot?: string;
  /** pillola di esito sotto la chat */
  pill?: string;
}) {
  const style = {
    ...at(x, y),
    "--w": `${w}%`,
    "--T": `${T}s`,
  } as CSSProperties;
  return (
    <div className={`${styles.glass} ${sec ? styles.sec : ""}`} style={style}>
      {kind === "kpi" && (
        <div className={styles.kpi}>
          <strong>{kpi?.[0] ?? "+18%"}</strong>
          <span>{kpi?.[1] ?? "richieste questo mese"}</span>
          <svg
            viewBox="0 0 100 32"
            className={styles.spark}
            preserveAspectRatio="none"
          >
            <path d="M0,26 L14,22 L28,24 L42,14 L56,17 L70,8 L84,11 L100,3" />
          </svg>
        </div>
      )}
      {kind === "status" && (
        <div className={styles.status}>
          <i
            style={
              dot
                ? { background: dot, boxShadow: `0 0 2cqw ${dot}` }
                : undefined
            }
          />
          <span>{status?.[0] ?? "Sito online"}</span>
          <em>{status?.[1] ?? "0,8 s"}</em>
        </div>
      )}
      {kind === "lead" && (
        <div className={styles.lead}>
          <b>RC</b>
          <span>
            <strong>Rossi Costruzioni</strong>
            <small>Nuovo lead · € 12.400</small>
          </span>
        </div>
      )}
      {kind === "bar" && (
        <div className={styles.bar}>
          <span>
            <strong>42</strong> commesse in corso
          </span>
          <i>
            <b style={{ width: "78%" }} />
          </i>
        </div>
      )}
      {kind === "chat" && (
        <div className={styles.chat}>
          <p>Prepara il preventivo per Rossi.</p>
          <p className={styles.reply}>Fatto: bozza pronta, € 12.400.</p>
          <span className={styles.typing}>
            <i />
            <i />
            <i />
          </span>
          {pill && <em className={styles.pill}>{pill}</em>}
        </div>
      )}
    </div>
  );
}

// ---------------- SITE: la pagina "esplosa" in tre lastre ----------------
// hero, griglia di sezioni e chiusura sono tre lastre di vetro sospese sul
// binario dello scroll; il "faro" in alto a destra è l'indicizzazione
// (una costellazione che si accende); dalla CTA partono le richieste
function SiteScene() {
  const id = useId();
  const skew = "translate(260 190) skewY(-6) translate(-260 -190)";
  const X = 145;
  const W = 230;
  const slab = (
    y: number,
    h: number,
    key: string,
    children: ReactNode,
    sec = false,
  ) => (
    <g key={key} className={sec ? styles.sec : ""}>
      <rect
        x={X}
        y={y}
        width={W}
        height={h}
        rx={8}
        fill={`url(#${id}p)`}
        stroke={tint(78, 0.55)}
      />
      <rect
        x={X + 8}
        y={y}
        width={W - 16}
        height={1.5}
        fill="rgba(255,255,255,.5)"
      />
      {children}
    </g>
  );
  const stars: [number, number, number][] = [
    [445, 28, 8],
    [470, 48, 5],
    [425, 16, 5],
    [465, 16, 4],
  ];
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(60, 0.12)} />
            <stop offset="1" stopColor={tint(60, 0.03)} />
          </linearGradient>
          <radialGradient id={`${id}c`}>
            <stop offset="0" stopColor={tint(70, 0.45)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
        </defs>
        {/* il binario dello scroll, con una tacca per lastra */}
        <line x1={132} y1={72} x2={132} y2={304} stroke={tint(78, 0.35)} />
        {[84, 196, 272].map((y) => (
          <line
            key={y}
            x1={126}
            y1={y}
            x2={138}
            y2={y}
            stroke={tint(78, 0.6)}
          />
        ))}
        <g transform={skew}>
          {slab(
            84,
            88,
            "hero",
            <>
              <rect
                x={X + 23}
                y={107}
                width={120}
                height={8}
                rx={4}
                fill="rgba(255,255,255,.85)"
              />
              <rect
                x={X + 23}
                y={121}
                width={83}
                height={4.5}
                rx={2}
                fill="rgba(255,255,255,.45)"
              />
              <circle cx={X + 51} cy={145} r={22} fill={`url(#${id}c)`} />
              <rect
                x={X + 23}
                y={137}
                width={55}
                height={16}
                rx={8}
                fill={tint(60, 1)}
              />
              <rect
                x={X + 150}
                y={102}
                width={60}
                height={52}
                rx={6}
                fill={tint(60, 0.35)}
              />
            </>,
          )}
          {slab(
            196,
            56,
            "grid",
            <>
              {[14, 84, 154].map((dx, i) => (
                <g key={dx} className={i === 2 ? styles.sec : ""}>
                  <rect
                    x={X + dx}
                    y={205}
                    width={62}
                    height={38}
                    rx={4}
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.22)"
                  />
                  <rect
                    x={X + dx + 5}
                    y={209}
                    width={52}
                    height={18}
                    rx={3}
                    fill="rgba(255,255,255,.12)"
                  />
                  <rect
                    x={X + dx + 5}
                    y={232}
                    width={34}
                    height={3}
                    rx={1.5}
                    fill="rgba(255,255,255,.4)"
                  />
                </g>
              ))}
            </>,
          )}
          {slab(
            272,
            22,
            "close",
            <>
              <rect
                x={X + 23}
                y={281}
                width={88}
                height={4}
                rx={2}
                fill="rgba(255,255,255,.35)"
              />
              <rect
                x={X + 160}
                y={278}
                width={37}
                height={10}
                rx={5}
                fill={tint(60, 0.6)}
              />
            </>,
            true,
          )}
        </g>
        {/* il faro dell'indicizzazione: dalla pagina a una costellazione */}
        <line x1={375} y1={76} x2={445} y2={28} stroke={tint(78, 0.35)} />
        <polyline
          points="425,16 445,28 470,48 465,16 425,16"
          fill="none"
          stroke="rgba(255,255,255,.14)"
        />
        {stars.map(([x, y, r], i) => (
          <g key={x} className={i === 3 ? styles.sec : ""}>
            <Star x={x} y={y} r={r} halo={`url(#${id}c)`} />
          </g>
        ))}
      </Svg>
      {/* la scansione SEO percorre le lastre (stessa inclinazione) */}
      <div className={styles.sitePlane}>
        <i className={styles.scan} />
      </div>
      <i className={styles.railPulse} />
      {stars.map(([x, y], i) => (
        <Halo key={x} x={x} y={y} T={12} d={4.4 + i * 0.25} />
      ))}
      <span className={`${styles.label} ${styles.seo}`} style={at(424, 66)}>
        <i />
        Indicizzato
      </span>
      {/* le richieste: dalla CTA al numero */}
      {[0, 2, 4].map((d) => (
        <Runner
          key={d}
          path={[
            [200, 160],
            [128, 250],
            [105, 300],
          ]}
          T={6}
          d={-d}
        />
      ))}
      <Glass
        kind="kpi"
        x={105}
        y={324}
        w={32}
        T={10}
        kpi={["+18%", "richieste dal sito"]}
      />
      <Glass kind="status" x={395} y={336} w={38} T={12} sec />
    </>
  );
}

// ---------------- CRM: la pipeline con il lead che avanza ----------------
const LANES = [185, 265, 345, 425];
function CrmScene() {
  const id = useId();
  const skew = "translate(300 192) skewY(-6) translate(-300 -192)";
  const card = (cx: number, cy: number, dot: string, won = false) => (
    <g key={`${cx}-${cy}`}>
      <rect
        x={cx - 27.5}
        y={cy - 14}
        width={55}
        height={28}
        rx={6}
        fill="rgba(255,255,255,.08)"
        stroke="rgba(255,255,255,.18)"
      />
      {won ? (
        <path
          d={`M${cx - 16} ${cy} l7 7 l16 -14`}
          fill="none"
          stroke="#59f0cb"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx={cx - 18} cy={cy} r={4} fill={dot} />
          <rect
            x={cx - 9}
            y={cy - 6}
            width={30}
            height={4}
            rx={2}
            fill="rgba(255,255,255,.45)"
          />
          <rect
            x={cx - 9}
            y={cy + 2}
            width={20}
            height={4}
            rx={2}
            fill="rgba(255,255,255,.3)"
          />
        </>
      )}
    </g>
  );
  const dots = [
    "hsl(92 85% 65%)",
    "hsl(158 85% 65%)",
    "hsl(222 85% 70%)",
    "hsl(312 85% 70%)",
  ];
  const sources: [string, number, boolean][] = [
    ["Mail", 104, false],
    ["WhatsApp", 160, true],
    ["Sito", 216, false],
  ];
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(60, 0.12)} />
            <stop offset="1" stopColor={tint(60, 0.02)} />
          </linearGradient>
        </defs>
        {/* le sorgenti sparse convergono nell'ingresso */}
        {sources.map(([name, y, sec]) => (
          <g key={name} className={sec ? styles.sec : ""}>
            <rect
              x={18}
              y={y - 12}
              width={74}
              height={24}
              rx={12}
              fill="rgba(255,255,255,.05)"
              stroke="rgba(255,255,255,.3)"
            />
            <line x1={92} y1={y} x2={150} y2={160} stroke={tint(75, 0.3)} />
          </g>
        ))}
        <g transform={skew}>
          {LANES.map((cx, i) => (
            <g key={cx}>
              <rect
                x={cx - 33.75}
                y={80}
                width={67.5}
                height={232}
                rx={7}
                fill={`url(#${id}l)`}
                stroke={tint(75, 0.3)}
              />
              <rect
                x={cx - 33.75}
                y={67}
                width={67.5}
                height={1.5}
                fill={i === 3 ? "#59f0cb" : tint(65, 0.7)}
              />
            </g>
          ))}
          {card(185, 104, dots[0])}
          {card(185, 144, dots[1])}
          {card(185, 184, dots[2])}
          {card(265, 104, dots[3])}
          {card(265, 144, dots[0])}
          {card(345, 104, dots[1])}
          {card(345, 144, dots[2])}
          {card(425, 104, dots[0], true)}
        </g>
      </Svg>
      {sources.map(([name, y, sec]) => (
        <Label key={name} x={55} y={y} sec={sec}>
          {name}
        </Label>
      ))}
      {sources.map(([name, y, sec], i) => (
        <span key={name} className={sec ? styles.sec : ""}>
          <Runner
            path={[
              [92, y],
              [150, 160],
            ]}
            T={3.2}
            d={-i * 1.1}
          />
        </span>
      ))}
      {(["Nuovo", "Contatto", "Preventivo", "Chiuso"] as const).map((h, i) => (
        <Label key={h} x={LANES[i]} y={50 - (LANES[i] - 300) * 0.105} tiny>
          {h}
        </Label>
      ))}
      {/* il lead che avanza di fase in fase (dentro lo stesso skew) */}
      <div className={styles.crmSkew}>
        <i className={styles.leadCard} style={at(185, 224)}>
          <b />
          <span />
          <span />
          <em />
        </i>
        <i
          className={styles.laneFlash}
          style={{ ...at(425, 67), width: `${67.5 * U}cqw` }}
        />
      </div>
      <Glass kind="lead" x={370} y={330} w={42} T={11} />
      <Glass
        kind="kpi"
        x={100}
        y={320}
        w={30}
        T={13}
        sec
        kpi={["+18%", "trattative chiuse"]}
      />
    </>
  );
}

// ---------------- ERP: tre lastre isometriche su un asse ----------------
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";
function Plate({
  cx,
  cy,
  side = 165,
  children,
  sec,
}: {
  cx: number;
  cy: number;
  side?: number;
  children?: ReactNode;
  sec?: boolean;
}) {
  const h = side / 2;
  return (
    <g className={sec ? styles.sec : ""}>
      {/* spessore */}
      <g transform={`translate(${cx} ${cy + 7}) ${ISO}`}>
        <rect
          x={-h}
          y={-h}
          width={side}
          height={side}
          rx={6}
          fill="hsla(222 60% 26% / .8)"
        />
      </g>
      <g transform={`translate(${cx} ${cy}) ${ISO}`}>
        <rect
          x={-h}
          y={-h}
          width={side}
          height={side}
          rx={6}
          fill={tint(62, 0.1)}
          stroke={tint(82, 0.55)}
          strokeWidth={1.5}
        />
        {children}
      </g>
    </g>
  );
}
const ERP_NODES: Pt[] = [
  [182, 187],
  [234, 192],
  [286, 197],
  [338, 202],
];
function ErpScene() {
  const id = useId();
  const [n1, n2, n3, n4] = ERP_NODES;
  const packet: Pt[] = [[100, 112], [170, 112], n1];
  return (
    <>
      <Svg>
        <defs>
          <radialGradient id={`${id}h`}>
            <stop offset="0" stopColor={tint(70, 0.35)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
        </defs>
        {/* DATI: la griglia */}
        <Plate cx={260} cy={264}>
          {Array.from({ length: 24 }, (_, i) => {
            const c = i % 6;
            const r = Math.floor(i / 6);
            const live = [3, 8, 14, 21].includes(i);
            return (
              <rect
                key={i}
                x={-75 + c * 25}
                y={-50 + r * 25}
                width={20}
                height={20}
                rx={2}
                fill={
                  live
                    ? tint(70, 0.85)
                    : `rgba(255,255,255,${(c + r) % 2 ? 0.1 : 0.06})`
                }
              />
            );
          })}
        </Plate>
        {/* PROCESSI: i quattro passi */}
        <Plate cx={260} cy={192} />
        {ERP_NODES.slice(1).map(([x, y], i) => (
          <line
            key={i}
            x1={ERP_NODES[i][0]}
            y1={ERP_NODES[i][1]}
            x2={x}
            y2={y}
            stroke={tint(80, 0.55)}
            strokeWidth={1.5}
          />
        ))}
        {ERP_NODES.map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r={20} fill={`url(#${id}h)`} />
            <circle cx={x} cy={y} r={7} fill={tint(75, 1)} />
          </g>
        ))}
        {/* INTERFACCIA: tre schede, quella centrale con la barra */}
        <Plate cx={260} cy={120} sec>
          {[-60, -20, 20].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y={-30}
                width={40}
                height={60}
                rx={4}
                fill="rgba(255,255,255,.05)"
                stroke="rgba(255,255,255,.45)"
              />
              <rect
                x={x + 6}
                y={-20}
                width={22}
                height={4}
                rx={2}
                fill="rgba(255,255,255,.4)"
              />
              <rect
                x={x + 6}
                y={-10}
                width={14}
                height={4}
                rx={2}
                fill="rgba(255,255,255,.3)"
              />
              {i === 1 && (
                <>
                  <rect
                    x={x + 6}
                    y={12}
                    width={28}
                    height={5}
                    rx={2.5}
                    fill="rgba(255,255,255,.12)"
                  />
                  <rect
                    x={x + 6}
                    y={12}
                    width={22}
                    height={5}
                    rx={2.5}
                    fill={tint(70, 1)}
                  />
                </>
              )}
            </g>
          ))}
        </Plate>
        {/* l'asse: una sola piattaforma attraversa gli strati */}
        <line
          x1={260}
          y1={48}
          x2={260}
          y2={296}
          stroke="rgba(255,255,255,.5)"
          strokeWidth={1.5}
        />
        {[120, 192, 264].map((y) => (
          <ellipse
            key={y}
            cx={260}
            cy={y}
            rx={25}
            ry={12.5}
            fill="none"
            stroke={tint(80, 0.5)}
          />
        ))}
        {/* dal sito arriva una richiesta (ciano: il colore del sito) */}
        <g transform={`translate(70 96) ${ISO}`}>
          <rect
            x={-25}
            y={-25}
            width={50}
            height={50}
            rx={4}
            fill="hsla(188 80% 60% / .1)"
            stroke="hsla(188 90% 70% / .6)"
          />
          <rect
            x={-16}
            y={-14}
            width={32}
            height={4}
            rx={2}
            fill="rgba(255,255,255,.5)"
          />
          <rect
            x={-16}
            y={-4}
            width={24}
            height={4}
            rx={2}
            fill="rgba(255,255,255,.35)"
          />
          <rect
            x={-16}
            y={6}
            width={28}
            height={4}
            rx={2}
            fill="rgba(255,255,255,.35)"
          />
        </g>
        <polyline
          points={`${packet[0]} ${packet[1]} ${packet[2]}`}
          fill="none"
          stroke="hsla(188 90% 70% / .45)"
        />
      </Svg>
      <Label x={70} y={140} tone="hsl(188 90% 70%)">
        Sito · richiesta
      </Label>
      <Label x={438} y={108}>
        Interfaccia
      </Label>
      <Label x={438} y={180}>
        Processi
      </Label>
      <Label x={438} y={252}>
        Dati
      </Label>
      {(["Preventivo", "Commessa", "Magazzino", "Fattura"] as const).map(
        (n, i) => (
          <Label
            key={n}
            x={ERP_NODES[i][0]}
            y={ERP_NODES[i][1] + (i % 2 ? 24 : -22)}
            tiny
          >
            {n}
          </Label>
        ),
      )}
      <Runner path={packet} T={7} tone="hsl(188 90% 65%)" />
      <Runner path={ERP_NODES} T={7} d={2.1} />
      {ERP_NODES.map(([x, y], i) => (
        <Halo key={x} x={x} y={y} T={7} d={2.1 + i * 1.3} />
      ))}
      <i className={styles.pearl} />
      <Glass kind="bar" x={120} y={328} w={38} T={12} />
      <Glass
        kind="kpi"
        x={405}
        y={324}
        w={30}
        T={9}
        sec
        kpi={["−6 h", "di lavoro manuale a settimana"]}
      />
    </>
  );
}

// ---------------- AI: il nucleo esagonale ----------------
// il nucleo (l'esagono del marchio) legge mail, documenti, CRM e ticket
// (stelle a sinistra) e produce sintesi, risposta e priorità (stelle a
// destra, magenta: il colore dell'output). Gli impulsi entrano ed escono.
const HEX: Pt[] = [
  [250, 121],
  [297.5, 148.5],
  [297.5, 203.5],
  [250, 231],
  [202.5, 203.5],
  [202.5, 148.5],
];
function AiScene() {
  const id = useId();
  const inputs: [string, Pt, Pt, boolean][] = [
    ["Mail", [60, 72], [202.5, 148.5], false],
    ["Documenti", [48, 144], [202.5, 176], true],
    ["CRM", [55, 216], [202.5, 203.5], false],
    ["Ticket", [100, 272], [250, 231], true],
  ];
  const outputs: [string, Pt, Pt, boolean][] = [
    ["Sintesi", [430, 96], [297.5, 148.5], false],
    ["Risposta", [450, 176], [297.5, 176], false],
    ["Priorità", [410, 246], [297.5, 203.5], true],
  ];
  const magenta = "hsl(312 90% 72%)";
  const hexPoints = HEX.map((p) => p.join(",")).join(" ");
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id={`${id}h`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={tint(70, 0.26)} />
            <stop offset="1" stopColor="rgba(255,255,255,.04)" />
          </linearGradient>
          <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(268 90% 75%)" />
            <stop offset="1" stopColor="hsl(312 90% 70%)" />
          </linearGradient>
          <radialGradient id={`${id}s`}>
            <stop offset="0" stopColor={tint(70, 0.45)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
          <radialGradient id={`${id}m`}>
            <stop offset="0" stopColor="hsla(312 90% 70% / .45)" />
            <stop offset="1" stopColor="hsla(312 90% 70% / 0)" />
          </radialGradient>
        </defs>
        {/* la costellazione degli ingressi e i fili verso il nucleo */}
        <polyline
          points="60,72 40,144 55,216 100,272"
          fill="none"
          stroke="rgba(255,255,255,.12)"
        />
        {inputs.map(([n, a, b, sec]) => (
          <line
            key={n}
            className={sec ? styles.sec : ""}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            stroke={tint(82, 0.35)}
          />
        ))}
        {outputs.map(([n, a, b, sec]) => (
          <line
            key={n}
            className={sec ? styles.sec : ""}
            x1={b[0]}
            y1={b[1]}
            x2={a[0]}
            y2={a[1]}
            stroke="hsla(312 90% 70% / .45)"
          />
        ))}
        {/* il nucleo, con il bordo di luce viola→magenta */}
        <polygon
          points={hexPoints}
          transform="translate(250 176) scale(1.13) translate(-250 -176)"
          fill="none"
          stroke={`url(#${id}r)`}
          strokeWidth={2}
          opacity={0.4}
        />
        <polygon
          points={hexPoints}
          fill={`url(#${id}h)`}
          stroke={tint(80, 0.7)}
          strokeWidth={1.5}
        />
        <rect
          x={235}
          y={162}
          width={30}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,.4)"
        />
        <rect
          x={230}
          y={174}
          width={40}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,.55)"
        />
        <rect
          x={238}
          y={186}
          width={25}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,.4)"
        />
        {inputs.map(([n, a, , sec]) => (
          <g key={n} className={sec ? styles.sec : ""}>
            <Star x={a[0]} y={a[1]} r={7} halo={`url(#${id}s)`} />
          </g>
        ))}
        {outputs.map(([n, a, , sec]) => (
          <g key={n} className={sec ? styles.sec : ""}>
            <Star
              x={a[0]}
              y={a[1]}
              r={7}
              halo={`url(#${id}m)`}
              fill="#ffd8f4"
            />
          </g>
        ))}
      </Svg>
      <i className={`${styles.hexSpin} ${styles.sec}`} />
      <i className={styles.coreFlash} />
      {inputs.map(([n, a, , sec]) => (
        <Label key={n} x={a[0] + 12} y={a[1] + 22} sec={sec}>
          {n}
        </Label>
      ))}
      {outputs.map(([n, a, , sec]) => (
        <Label key={n} x={a[0]} y={a[1] + 22} sec={sec} tone="hsl(312 90% 80%)">
          {n}
        </Label>
      ))}
      {inputs.map(([n, a, b, sec], i) => (
        <span key={n} className={sec ? styles.sec : ""}>
          <Runner path={[a, b]} T={8} d={-(i % 2) * 4 - (i > 1 ? 0.6 : 0)} />
        </span>
      ))}
      {outputs.map(([n, a, b, sec], i) => (
        <span key={n} className={sec ? styles.sec : ""}>
          <Runner
            path={[b, a]}
            T={8}
            d={-1.9 - (i === 2 ? 4 : 0)}
            tone={magenta}
          />
          <Halo x={a[0]} y={a[1]} T={8} d={4.1 + (i === 2 ? -4 : 0)} />
        </span>
      ))}
      <Glass kind="chat" x={340} y={352} w={40} T={10} pill="Approvata ✓" />
      <Glass
        kind="status"
        x={130}
        y={344}
        w={34}
        T={11}
        sec
        status={["Classificato", "urgente"]}
        dot="#ff4fd8"
      />
    </>
  );
}

// ---------------- PORTAL: l'area riservata, ruoli e permessi ----------------
function PortalScene() {
  const id = useId();
  const roles: [string, number, boolean][] = [
    ["Cliente", 120, false],
    ["Team", 188, false],
    ["Fornitore", 256, true],
  ];
  const arch = (inset: number) => {
    const l = 250 + inset;
    const r = 420 - inset;
    const rad = (r - l) / 2;
    const top = 141 + inset;
    return `M${l} 320 V${top} A${rad} ${rad} 0 0 1 ${r} ${top} V320 Z`;
  };
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(60, 0.13)} />
            <stop offset="1" stopColor={tint(60, 0.02)} />
          </linearGradient>
          <radialGradient id={`${id}h`}>
            <stop offset="0" stopColor={tint(70, 0.35)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
        </defs>
        {/* il portale: tre profili concentrici */}
        <path
          d={arch(0)}
          fill={`url(#${id}a)`}
          stroke={tint(72, 0.75)}
          strokeWidth={1.5}
        />
        <path d={arch(17.5)} fill="none" stroke={tint(72, 0.38)} />
        <path
          d={arch(35)}
          fill="none"
          stroke={tint(72, 0.18)}
          className={styles.sec}
        />
        {/* dentro: documenti, stato lavori, ticket (accesi dai permessi) */}
        <g className={styles.rowDim}>
          {[6, 0, -6].map((o) => (
            <rect
              key={o}
              x={315 + o}
              y={112 - o}
              width={41}
              height={42}
              rx={4}
              fill="rgba(255,255,255,.06)"
              stroke="rgba(255,255,255,.5)"
            />
          ))}
          <line
            x1={275}
            y1={188}
            x2={395}
            y2={188}
            stroke="rgba(255,255,255,.3)"
          />
          <line
            x1={275}
            y1={188}
            x2={335}
            y2={188}
            stroke="#59f0cb"
            strokeWidth={2}
          />
          <circle cx={275} cy={188} r={4.5} fill="#59f0cb" />
          <circle cx={335} cy={188} r={4.5} fill="#59f0cb" />
          <circle
            cx={395}
            cy={188}
            r={4.5}
            fill="none"
            stroke="rgba(255,255,255,.5)"
          />
          <g className={styles.sec}>
            <rect
              x={289}
              y={228}
              width={92}
              height={26}
              rx={13}
              fill="rgba(255,255,255,.05)"
              stroke="rgba(255,255,255,.3)"
            />
            <circle cx={304} cy={241} r={4} fill="hsl(38 90% 65%)" />
            <rect
              x={315}
              y={236}
              width={40}
              height={3}
              rx={1.5}
              fill="rgba(255,255,255,.4)"
            />
            <rect
              x={315}
              y={243}
              width={28}
              height={3}
              rx={1.5}
              fill="rgba(255,255,255,.3)"
            />
          </g>
        </g>
        {/* i ruoli, la fascia dei lucchetti, i collegamenti */}
        <line
          x1={215}
          y1={96}
          x2={215}
          y2={288}
          stroke="rgba(255,255,255,.3)"
          strokeDasharray="2 4"
        />
        {roles.map(([n, y, sec]) => (
          <g key={n} className={sec ? styles.sec : ""}>
            <rect
              x={32}
              y={y - 17}
              width={105}
              height={34}
              rx={17}
              fill="rgba(255,255,255,.06)"
              stroke="rgba(255,255,255,.18)"
            />
            <circle cx={52} cy={y} r={11} fill={tint(60, 0.28)} />
            <circle cx={52} cy={y - 3} r={3.5} fill={tint(80, 0.9)} />
            <path
              d={`M45 ${y + 7} a7 6 0 0 1 14 0`}
              fill="none"
              stroke={tint(80, 0.9)}
              strokeWidth={2}
            />
            <line x1={137} y1={y} x2={250} y2={y} stroke={tint(78, 0.3)} />
            <rect
              x={208}
              y={y - 4}
              width={14}
              height={11}
              rx={2}
              fill="rgba(255,255,255,.2)"
              stroke={tint(78, 0.6)}
            />
            <path
              d={`M211 ${y - 4} v-4 a4 4 0 0 1 8 0 v4`}
              fill="none"
              stroke={tint(78, 0.7)}
              strokeWidth={1.5}
            />
          </g>
        ))}
      </Svg>
      {roles.map(([n, y, sec], i) => (
        <span key={n} className={sec ? styles.sec : ""}>
          <Label x={98} y={y} sec={false}>
            {n}
          </Label>
          <i
            className={`${styles.roleRing} ${styles[`phase${i}` as "phase0"]}`}
            style={at(84, y)}
          />
          <Runner
            path={[
              [137, y],
              [215, y],
              [250, y],
            ]}
            T={12}
            d={-i * 4}
          />
        </span>
      ))}
      <Label x={335} y={98}>
        Documenti
      </Label>
      <Label x={335} y={170}>
        Stato lavori
      </Label>
      <Label x={335} y={214}>
        Ticket
      </Label>
      {/* le righe si accendono per il ruolo di turno */}
      <i
        className={`${styles.rowLit} ${styles.litAll}`}
        style={{ ...at(335, 133), width: "12cqw", height: "12cqw" }}
      />
      <i
        className={`${styles.rowLit} ${styles.litTwo}`}
        style={{ ...at(335, 188), width: "26cqw", height: "5cqw" }}
      />
      <i
        className={`${styles.rowLit} ${styles.litOne} ${styles.sec}`}
        style={{ ...at(335, 241), width: "20cqw", height: "6cqw" }}
      />
      <Glass
        kind="status"
        x={390}
        y={352}
        w={40}
        T={11}
        status={["Accesso sicuro", "2FA"]}
      />
      <Glass
        kind="kpi"
        x={104}
        y={358}
        w={30}
        T={9}
        sec
        kpi={["24/7", "documenti sempre disponibili"]}
      />
    </>
  );
}

const BODIES: Record<SceneVariant, () => ReactNode> = {
  site: SiteScene,
  crm: CrmScene,
  erp: ErpScene,
  ai: AiScene,
  portal: PortalScene,
};
