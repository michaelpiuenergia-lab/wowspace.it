import { Reveal } from "@/components/effects/reveal";
import { CmdPanel } from "@/components/ui/cmd-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  aiCapabilities,
  aiCommandLog,
  operationsFooter,
} from "@/lib/site-content";
import styles from "./ai-command-section.module.css";

export function AiCommandSection() {
  return (
    <section id="piattaforma" className="section-spacing">
      <div className={`section-shell-wide ${styles.grid}`}>
        <Reveal>
          <SectionHeading
            eyebrow="AI // command layer"
            title="AI utile, non teatrino: entra nei passaggi dove oggi si perde tempo e contesto."
            description="La usiamo per leggere lead, sintetizzare storico, dare priorita' e alleggerire task ripetitivi dentro CRM, supporto e flussi operativi. Sempre con logica di business, mai come effetto scenico fine a se stesso."
          />

          <CmdPanel
            className={styles.terminal}
            title="wowspace.command"
            status="commercial ops live"
            lines={aiCommandLog}
            footer={operationsFooter}
          />
        </Reveal>

        <div className={styles.cards}>
          {aiCapabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className={`panel ${styles.card}`}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
