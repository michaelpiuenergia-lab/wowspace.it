import { BootStrip } from "@/components/effects/boot-strip";
import { BrainChip } from "@/components/ui/brain-chip";
import { ChipCluster } from "@/components/graphics/chip-cluster";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { CmdPanel } from "@/components/ui/cmd-panel";
import { heroPromptFeed, heroSignals, heroStats, heroTape } from "@/lib/site-content";
import styles from "./hero-section.module.css";

export function HeroSection() {
  const runtimeLines = heroPromptFeed.map((item) => ({
    channel: item.channel,
    state: item.flag,
    command: item.prompt,
    output: item.response,
  }));

  return (
    <section className={styles.section}>
      <div className={styles.overlay} />

      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...heroTape, ...heroTape].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className={`section-shell-wide ${styles.viewport}`}>
        <BootStrip />
        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            <span className="eyebrow">Wowspace // websites, crm, ai</span>
            <h1>
              Siti, CRM e software web che alzano la percezione del brand e
              mettono ordine nel business.
            </h1>
            <p>
              Costruiamo presenza, area clienti, CRM su misura e automazioni AI
              per aziende che vogliono distinguersi fuori e lavorare meglio
              dentro, con una base seria che regge vendite, operativita' e
              crescita.
            </p>
            <div className={styles.actions}>
              <CtaLink href="/#contatti">Parliamo del progetto</CtaLink>
              <CtaLink href="/vetrina" variant="ghost">
                Esplora la vetrina
              </CtaLink>
            </div>
            <div className={styles.stats}>
              {heroStats.map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <BrainChip />
          </Reveal>

          <Reveal className={styles.stage} delay={140}>
            <div className={styles.stageCluster}>
              <div className={styles.halo} />
              <ChipCluster />
            </div>
            <CmdPanel
              className={styles.stageFeed}
              title="prompt.runtime"
              status="cyber sync"
              lines={runtimeLines}
              footer={["offer clarity", "crm memory", "private access"]}
            />
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className={`panel ${styles.console}`}>
            <div className={styles.consoleTop}>
              <span>launch.board</span>
              <span>system ready</span>
            </div>
            <div className={styles.signalGrid}>
              {heroSignals.map((item) => (
                <article key={item.title} className={styles.signalCard}>
                  <small>{item.kicker}</small>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className={styles.footerLine}>
              <span>Next.js front-end</span>
              <span>CRM su misura</span>
              <span>Private area + AI</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
