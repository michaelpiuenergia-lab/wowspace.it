import { Reveal } from "@/components/effects/reveal";
import { AssistantPanel } from "@/components/ui/assistant-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  operationsAssistantFooter,
  operationsAssistantLog,
  operationsAssistantNext,
  workflow,
} from "@/lib/site-content";
import styles from "./process-section.module.css";

export function ProcessSection() {
  return (
    <section id="processo" className="section-spacing">
      <div className={`section-shell-wide ${styles.layout}`}>
        <div>
          <SectionHeading
            eyebrow="Come lavoriamo, passo per passo"
            title="Prima capiamo come vendi e come lavori. Poi costruiamo."
            description="Dietro il look forte c'è metodo: struttura dei contenuti, passaggi commerciali, ownership, area privata e logiche operative pensate per far lavorare meglio aziende e team."
          />

          <div className={styles.timeline}>
            {workflow.map((step, index) => (
              <Reveal key={step.step} delay={index * 80}>
                <article className={`panel ${styles.card}`}>
                  <span>{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className={styles.consoleWrap} delay={120}>
          <AssistantPanel
            title="Assistente AI · organizzazione"
            status="vendite e consegne"
            exchanges={operationsAssistantLog}
            next={operationsAssistantNext}
            footer={operationsAssistantFooter}
          />
          <div className={styles.note}>
            <strong>Esperienza vera dietro la facciata.</strong>
            <p>
              Quando diciamo CRM su misura, intendiamo pipeline, ruoli,
              priorità, follow-up, handoff e organizzazione commerciale pensati
              per aziende che devono vendere bene e consegnare meglio.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
