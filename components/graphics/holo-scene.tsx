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
  const pts = [...path];
  while (pts.length < 5) pts.push(pts[pts.length - 1]);
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
}: {
  kind: FragKind;
  x: number;
  y: number;
  w: number;
  T?: number;
  sec?: boolean;
  kpi?: [string, string];
  status?: [string, string];
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
          <i />
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
        </div>
      )}
    </div>
  );
}

// ---------------- SITE: il foglio di pagina che si compone ----------------
function SiteScene() {
  const id = useId();
  // il piano: 280×304 centrato a (250,188), inclinato
  const X = 110;
  const Y = 36;
  const W = 280;
  const H = 304;
  const tilt = "translate(250 188) rotate(-5) skewY(-4) translate(-250 -188)";
  const bars = (cx: number, top: number, cw: number) => (
    <>
      <rect
        x={cx + 8}
        y={top + 8}
        width={14}
        height={14}
        rx={3}
        fill={tint(70, 0.6)}
      />
      <rect
        x={cx + 8}
        y={top + 30}
        width={cw * 0.6}
        height={4}
        rx={2}
        fill="rgba(255,255,255,.4)"
      />
      <rect
        x={cx + 8}
        y={top + 40}
        width={cw * 0.4}
        height={4}
        rx={2}
        fill="rgba(255,255,255,.3)"
      />
    </>
  );
  return (
    <>
      <Svg>
        <defs>
          <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(60, 0.13)} />
            <stop offset="1" stopColor={tint(60, 0.03)} />
          </linearGradient>
          <linearGradient id={`${id}v`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={tint(60, 0.45)} />
            <stop offset="1" stopColor="hsla(205 80% 55% / .35)" />
          </linearGradient>
          <radialGradient id={`${id}c`}>
            <stop offset="0" stopColor={tint(70, 0.45)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
        </defs>
        {/* i piani-eco dietro: struttura e contenuti */}
        <g transform={tilt}>
          <rect
            className={`${styles.sec} ${styles.in}`}
            x={X - 40}
            y={Y + 32}
            width={W}
            height={H}
            rx={15}
            fill="none"
            stroke={tint(78, 0.14)}
            style={{ animationDelay: "0.9s" }}
          />
          <rect
            className={styles.in}
            x={X - 20}
            y={Y + 16}
            width={W}
            height={H}
            rx={15}
            fill="none"
            stroke={tint(78, 0.28)}
            style={{ animationDelay: "0.7s" }}
          />
          {/* il foglio */}
          <rect
            x={X}
            y={Y}
            width={W}
            height={H}
            rx={15}
            fill={`url(#${id}p)`}
            stroke={tint(78, 0.6)}
            strokeWidth={1.5}
          />
          {/* logo e menu */}
          <g className={styles.in} style={{ animationDelay: "0.1s" }}>
            <circle cx={X + 22} cy={Y + 24} r={6} fill={tint(70, 0.9)} />
            {[0.66, 0.76, 0.86].map((f) => (
              <rect
                key={f}
                x={X + W * f}
                y={Y + 23}
                width={17}
                height={2}
                rx={1}
                fill="rgba(255,255,255,.5)"
              />
            ))}
          </g>
          {/* titolo, sottotitolo */}
          <g className={styles.in} style={{ animationDelay: "0.25s" }}>
            <rect
              x={X + 22}
              y={Y + 61}
              width={162}
              height={12}
              rx={6}
              fill={tint(85, 0.9)}
            />
            <rect
              x={X + 22}
              y={Y + 82}
              width={118}
              height={12}
              rx={6}
              fill={tint(85, 0.55)}
            />
            <rect
              x={X + 22}
              y={Y + 106}
              width={134}
              height={7}
              rx={3}
              fill="rgba(255,255,255,.35)"
            />
          </g>
          {/* il visual dell'hero */}
          <rect
            className={styles.in}
            style={{ animationDelay: "0.4s" }}
            x={X + W * 0.62}
            y={Y + 49}
            width={W * 0.3}
            height={97}
            rx={10}
            fill={`url(#${id}v)`}
          />
          {/* la CTA che genera richieste */}
          <g className={styles.in} style={{ animationDelay: "0.55s" }}>
            <circle cx={X + 53} cy={Y + 134} r={26} fill={`url(#${id}c)`} />
            <rect
              x={X + 22}
              y={Y + 125}
              width={62}
              height={18}
              rx={9}
              fill={tint(60, 1)}
            />
          </g>
          {/* tre card */}
          {[0.08, 0.36, 0.64].map((f, i) => (
            <g
              key={f}
              className={`${styles.in} ${i === 2 ? styles.sec : ""}`}
              style={{ animationDelay: `${0.7 + i * 0.12}s` }}
            >
              <rect
                x={X + W * f}
                y={Y + 170}
                width={73}
                height={67}
                rx={8}
                fill="rgba(255,255,255,.05)"
                stroke={tint(78, 0.45)}
              />
              {bars(X + W * f, Y + 170, 73)}
            </g>
          ))}
          <rect
            className={`${styles.in} ${styles.sec}`}
            style={{ animationDelay: "1.1s" }}
            x={X + 22}
            y={Y + 267}
            width={W - 44}
            height={1.5}
            fill="rgba(255,255,255,.3)"
          />
        </g>
      </Svg>
      {/* la scansione SEO percorre il foglio (stessa inclinazione, in HTML) */}
      <div className={styles.sitePlane}>
        <i className={styles.scan} />
      </div>
      <Label x={128} y={22}>
        Design
      </Label>
      <Label x={112} y={388}>
        Struttura · contenuti
      </Label>
      <span className={`${styles.label} ${styles.seo}`} style={at(418, 12)}>
        <i />
        SEO · indicizzato
      </span>
      <Glass kind="kpi" x={108} y={318} w={36} T={10} sec />
      <Glass kind="status" x={400} y={286} w={38} T={12} />
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

// ---------------- AI: la rete tra ingressi e uscite ----------------
const AI_N: Record<string, Pt> = {
  n1: [180, 136],
  n2: [220, 200],
  n3: [190, 256],
  n4: [250, 112],
  n5: [270, 168],
  n6: [260, 240],
  n7: [300, 208],
  n8: [320, 144],
  n9: [310, 272],
};
const AI_EDGES = [
  ["n1", "n2"],
  ["n1", "n4"],
  ["n2", "n3"],
  ["n2", "n5"],
  ["n3", "n6"],
  ["n4", "n5"],
  ["n4", "n8"],
  ["n5", "n7"],
  ["n5", "n8"],
  ["n6", "n7"],
  ["n6", "n9"],
  ["n7", "n8"],
  ["n7", "n9"],
];
const AI_SEC = new Set(["n4", "n6", "n9"]);
function AiScene() {
  const id = useId();
  const inputs: [string, number, boolean][] = [
    ["Mail", 100, false],
    ["Documenti", 168, true],
    ["Ticket", 236, false],
  ];
  const outputs: [string, number, boolean][] = [
    ["Riassunto", 120, false],
    ["Priorità", 184, true],
    ["Risposta", 248, false],
  ];
  const paths: { p: Pt[]; d: number; sec: boolean }[] = [
    { p: [[92, 100], AI_N.n1, AI_N.n4, AI_N.n8, [382, 120]], d: 0, sec: false },
    { p: [[92, 168], AI_N.n2, AI_N.n5, AI_N.n7, [382, 184]], d: 2, sec: true },
    { p: [[92, 236], AI_N.n3, AI_N.n6, AI_N.n9, [382, 248]], d: 4, sec: false },
  ];
  return (
    <>
      <Svg>
        <defs>
          <radialGradient id={`${id}h`}>
            <stop offset="0" stopColor={tint(70, 0.16)} />
            <stop offset="1" stopColor={tint(70, 0)} />
          </radialGradient>
        </defs>
        {inputs.map(([n, y, sec]) => (
          <g key={n} className={sec ? styles.sec : ""}>
            <rect
              x={37}
              y={y - 18}
              width={55}
              height={36}
              rx={5}
              fill="rgba(255,255,255,.06)"
              stroke={tint(82, 0.5)}
            />
            <rect
              x={45}
              y={y - 9}
              width={38}
              height={2}
              fill="rgba(255,255,255,.35)"
            />
            <rect
              x={45}
              y={y - 1}
              width={27}
              height={2}
              fill="rgba(255,255,255,.35)"
            />
            <rect
              x={45}
              y={y + 7}
              width={32}
              height={2}
              fill="rgba(255,255,255,.35)"
            />
          </g>
        ))}
        {AI_EDGES.map(([a, b]) => (
          <line
            key={a + b}
            className={AI_SEC.has(a) || AI_SEC.has(b) ? styles.sec : ""}
            x1={AI_N[a][0]}
            y1={AI_N[a][1]}
            x2={AI_N[b][0]}
            y2={AI_N[b][1]}
            stroke={tint(82, 0.32)}
          />
        ))}
        {paths.map(({ p, sec }, i) => (
          <g key={i} className={sec ? styles.sec : ""}>
            <line
              x1={p[0][0]}
              y1={p[0][1]}
              x2={p[1][0]}
              y2={p[1][1]}
              stroke={tint(82, 0.32)}
            />
            <line
              x1={p[3][0]}
              y1={p[3][1]}
              x2={p[4][0]}
              y2={p[4][1]}
              stroke={tint(82, 0.32)}
            />
          </g>
        ))}
        {Object.entries(AI_N).map(([k, [x, y]]) => (
          <g key={k} className={AI_SEC.has(k) ? styles.sec : ""}>
            <circle cx={x} cy={y} r={17} fill={`url(#${id}h)`} />
            <circle cx={x} cy={y} r={6.5} fill={tint(78, 1)} />
          </g>
        ))}
        {outputs.map(([n, y, sec]) => (
          <g key={n} className={sec ? styles.sec : ""}>
            <rect
              x={382}
              y={y - 14}
              width={86}
              height={28}
              rx={14}
              fill="hsla(312 80% 60% / .1)"
              stroke="hsla(312 90% 70% / .6)"
            />
          </g>
        ))}
      </Svg>
      {inputs.map(([n, y, sec]) => (
        <Label key={n} x={65} y={y + 30} sec={sec}>
          {n}
        </Label>
      ))}
      {outputs.map(([n, y, sec]) => (
        <Label key={n} x={421} y={y} sec={sec} dot="#ff4fd8">
          {n}
        </Label>
      ))}
      {paths.map(({ p, d, sec }, i) => (
        <span key={i} className={sec ? styles.sec : ""}>
          <Runner path={p} T={6} d={-d} tone="hsl(312 90% 78%)" />
          {p.slice(1, 4).map(([x, y], j) => (
            <Halo key={j} x={x} y={y} T={6} d={-d + 0.3 + (j + 1) * 1.2} />
          ))}
        </span>
      ))}
      <Glass kind="chat" x={178} y={346} w={44} T={10} />
      <Glass
        kind="status"
        x={410}
        y={336}
        w={32}
        T={11}
        sec
        status={["Riassunto pronto", "2 s"]}
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
