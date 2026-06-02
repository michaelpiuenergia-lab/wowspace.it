import { CmdPanel } from "@/components/ui/cmd-panel";
import styles from "./stack-screens.module.css";

const commandLines = [
  {
    channel: "crm.board",
    state: "live",
    command: "crm status --sales --support --delivery",
    output:
      "Una vista unica su trattative, richieste, handoff e priorita' operative.",
  },
  {
    channel: "pipeline.forecast",
    state: "watch",
    command: "forecast pipeline --quality --timing --ownership",
    output:
      "Meno caos commerciale, piu' controllo su chi fa cosa e su cosa sta per chiudersi.",
  },
  {
    channel: "handoff.logic",
    state: "locked",
    command: "track handoff --promises --owners --next step",
    output:
      "Le promesse fatte davanti restano leggibili anche quando partono delivery e supporto.",
  },
];

const metrics = [
  { value: "01", label: "pipeline leggibile" },
  { value: "02", label: "promesse allineate" },
  { value: "03", label: "delivery piu' ordinata" },
];

export function StackScreens() {
  return (
    <div className={styles.stage}>
      <div className={styles.ghostWord}>CRM</div>
      <div className={styles.ghostWordAlt}>OPS</div>

      <div className={styles.signalColumn}>
        <span>signal</span>
        <span>sales</span>
        <span>ops</span>
        <span>delivery</span>
      </div>

      <article className={`${styles.card} ${styles.heroCard}`}>
        <span>Commercial thinking</span>
        <strong>SELL</strong>
        <p>
          Non progettiamo solo una bella faccia: progettiamo percezione,
          posizionamento e conversione.
        </p>
      </article>

      <div className={`${styles.card} ${styles.terminalCard}`}>
        <CmdPanel
          title="sales.board"
          status="tracking live"
          lines={commandLines}
          footer={["pipeline", "follow-up", "ownership"]}
        />
      </div>

      <article className={`${styles.card} ${styles.opsCard}`}>
        <span>Operational structure</span>
        <strong>ORGANIZE</strong>
        <p>
          Quando il sito genera interesse, dietro devono esserci flussi, ruoli e
          un CRM che non si rompe appena aumentano le richieste.
        </p>
      </article>

      <article className={`${styles.card} ${styles.metricCard}`}>
        <span>What changes</span>
        <div className={styles.metricList}>
          {metrics.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
