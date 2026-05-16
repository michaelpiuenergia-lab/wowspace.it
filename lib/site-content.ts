export const navLinks = [
  { href: "/servizi", label: "Servizi" },
  { href: "/piattaforma", label: "CRM & Area clienti" },
  { href: "/runtime", label: "AI in azione" },
  { href: "/sistema", label: "Tecnologia" },
  { href: "/vetrina", label: "Lavori" },
  { href: "/metodo", label: "Come lavoriamo" },
];

export const routeIndex: Record<string, { kicker: string; title: string; meta: string }> = {
  "/servizi": {
    kicker: "route 01",
    title: "Servizi",
    meta: "Cosa costruiamo: siti, e-commerce, CRM, AI, portali.",
  },
  "/runtime": {
    kicker: "route 02",
    title: "AI in azione",
    meta: "Come l'AI legge segnali, memoria e priorita' del tuo business.",
  },
  "/sistema": {
    kicker: "route 03",
    title: "Tecnologia",
    meta: "Stack, accessi, ruoli e infrastruttura su cui costruiamo.",
  },
  "/piattaforma": {
    kicker: "route 04",
    title: "CRM & Area clienti",
    meta: "Gestionale e portale clienti su misura, con automazioni utili.",
  },
  "/vetrina": {
    kicker: "route 05",
    title: "Lavori",
    meta: "Esempi: siti, CRM, ecosistemi connessi.",
  },
  "/metodo": {
    kicker: "route 06",
    title: "Come lavoriamo",
    meta: "Dal primo incontro al rilascio: il nostro metodo.",
  },
};

export const heroStats = [
  { value: "Brand Impact", label: "presenza che alza subito il valore percepito" },
  { value: "CRM Logic", label: "lead, passaggi e follow-up pensati bene" },
  { value: "Custom Build", label: "siti, portali e software cuciti sul processo" },
];

export const heroSignals = [
  {
    kicker: "Perception layer",
    title: "Offerta chiara",
    description:
      "Prima impressione, struttura e tono devono far capire subito che non sei uno dei tanti e che dietro c'e' sostanza.",
  },
  {
    kicker: "Commercial flow",
    title: "Lead in ordine",
    description:
      "Form, contatti, richieste e follow-up devono entrare in un percorso leggibile, con priorita' e ownership chiare.",
  },
  {
    kicker: "Operational AI",
    title: "AI utile",
    description:
      "Sintesi, classificazione e suggerimenti entrano dove esistono storico, documenti e contesto, non come teatrino da demo.",
  },
  {
    kicker: "Private area",
    title: "Portali seri",
    description:
      "Area clienti, login, documenti, ticket e dashboard con una presenza premium e una logica di lavoro che non si rompe.",
  },
];

export const heroTape = [
  "Brand impact",
  "Lead routing",
  "CRM memory",
  "Private access",
  "AI workflows",
  "Ops control",
  "Custom systems",
  "Sales clarity",
];

export const heroPromptFeed = [
  {
    channel: "brand.sync",
    flag: "live",
    prompt: "map offer --market --decision drivers --credibility gaps",
    response:
      "Riduciamo il rumore e apriamo la home con un messaggio che fa percepire subito posizionamento e livello.",
  },
  {
    channel: "sales.route",
    flag: "active",
    prompt: "trace lead-flow --entry points --handoff risks --next owner",
    response:
      "Ordiniamo il passaggio da interesse a presa in carico prima che il team perda tempo o occasioni.",
  },
  {
    channel: "ops.runtime",
    flag: "ready",
    prompt: "connect crm --documents --ticket context --next action",
    response:
      "Lo storico diventa memoria utile: il sistema suggerisce, sintetizza e accelera il lavoro vero.",
  },
  {
    channel: "portal.auth",
    flag: "secure",
    prompt: "build client-area --roles --documents --visibility rules",
    response:
      "La parte privata continua il brand ma aggiunge controllo, accessi e ordine operativo.",
  },
];

export const chipHighlights = [
  {
    label: "Private surface",
    title: "Area clienti che sembra parte del brand, non un tool incollato",
    description:
      "Login, portali, viste clienti e touchpoint protetti devono continuare la stessa percezione di livello vista sulla home.",
  },
  {
    label: "Sales control",
    title: "Lead, ownership e passaggi interni finalmente leggibili",
    description:
      "Il front-end porta attenzione, ma dietro serve una macchina che distribuisce lavoro, tiene contesto e non crea caos.",
  },
  {
    label: "AI in context",
    title: "Prompt e automazioni nei punti in cui esiste davvero memoria",
    description:
      "Documenti, ticket, storico e CRM diventano materiale operativo per classificare, suggerire priorita' e supportare decisioni vere.",
  },
];

export const pulseMetrics = [
  { value: "Portal UX", label: "aree private con identita' e usabilita'" },
  { value: "CRM Control", label: "pipeline, ruoli e follow-up chiari" },
  { value: "AI Assist", label: "supporto operativo sui dati reali" },
];

export const aiCommandLog = [
  {
    channel: "lead.scan",
    state: "armed",
    command: "scan lead-pipeline --intent --value --timing",
    output:
      "Il sistema legge segnali, urgenza e valore potenziale per aiutare il commerciale a capire dove intervenire prima.",
  },
  {
    channel: "team.sync",
    state: "live",
    command: "sync sales support operations --handoff clean",
    output:
      "Preventivi, richieste, ticket e prossimi step restano allineati tra chi vende, chi gestisce e chi consegna.",
  },
  {
    channel: "crm.read",
    state: "ready",
    command: "summarize crm --open-deals --client-risks --next-actions",
    output:
      "Dashboard e assistenti leggono trattative, storico e attriti per proporre cosa muovere subito.",
  },
  {
    channel: "portal.auth",
    state: "secure",
    command: "mount client-area --roles --views --shared memory",
    output:
      "L'area clienti continua il brand ma aggiunge permessi, visibilita' e memoria condivisa tra team e cliente.",
  },
];

export const operationsCommandLog = [
  {
    channel: "inbound.fit",
    state: "watch",
    command: "qualify inbound --source --margin --urgency",
    output:
      "Non tutte le richieste valgono uguale: leggiamo scenario, marginalita', timing e possibilita' reale.",
  },
  {
    channel: "owner.map",
    state: "locked",
    command: "assign owners --sales --delivery --support",
    output:
      "Ogni passaggio ha un responsabile chiaro, cosi' la promessa commerciale non si perde nell'operativita'.",
  },
  {
    channel: "workflow.ops",
    state: "stable",
    command: "build workflow --approvals --deadlines --followup",
    output:
      "Task, reminder, stati e procedure smettono di stare in testa alle persone e diventano parte del sistema.",
  },
  {
    channel: "service.loop",
    state: "online",
    command: "track promises --timing --handoff --execution",
    output:
      "Controlliamo che cio' che vendi resti leggibile anche quando aumentano richieste, ticket e consegne.",
  },
];

export const operationsFooter = [
  "lead control",
  "handoff clean",
  "crm memory",
  "ops order",
];

export const services = [
  {
    kicker: "Siti & brand experience",
    title: "Siti corporate che fanno percepire subito livello",
    description:
      "Architettura dei contenuti, direzione visiva e interfacce che danno autorevolezza alla proposta prima ancora della call.",
    result: "Piu' fiducia, piu' attenzione, piu' credibilita'.",
  },
  {
    kicker: "E-commerce",
    title: "Store costruiti per vendere e reggere la crescita",
    description:
      "Catalogo, schede prodotto, checkout, funnel e contenuti pensati per convertire senza sacrificare performance e identita'.",
    result: "Meno attrito, piu' conversione, piu' controllo.",
  },
  {
    kicker: "CRM & operations",
    title: "CRM e software web fatti sul tuo processo reale",
    description:
      "Lead, commesse, ticket, documenti, dashboard, utenti e flussi modellati su come lavori davvero, non su un template generico.",
    result: "Un sistema che segue il team, non il contrario.",
  },
  {
    kicker: "AI workflows",
    title: "Automazioni AI che aiutano team commerciali e operativi",
    description:
      "Sintesi, classificazione, ricerca e suggerimenti entrano nei punti in cui oggi si perde tempo, contesto e velocita'.",
    result: "Piu' velocita' senza perdere controllo.",
  },
  {
    kicker: "App & portal",
    title: "Portali clienti e aree riservate con presenza premium",
    description:
      "Accessi, onboarding, documenti, stato avanzamento, report e viste private coerenti con il tuo brand e il tuo processo.",
    result: "Un'esperienza forte anche dopo il primo contatto.",
  },
  {
    kicker: "Cloud & care",
    title: "Performance, manutenzione e crescita continua",
    description:
      "Rilasci, miglioramenti, monitoraggio, sicurezza e supporto per far evolvere il progetto senza ripartire ogni volta da zero.",
    result: "Una base seria su cui continuare a costruire.",
  },
];

export const aiCapabilities = [
  {
    label: "Knowledge layer",
    title: "AI che legge documenti, storico e procedure prima di rispondere",
    description:
      "Manuali, offerte, CRM, ticket, documenti e procedure diventano una base interrogabile con contesto vero, non con risposte inventate.",
  },
  {
    label: "Sales support",
    title: "Reparto commerciale piu' veloce e meno dispersivo",
    description:
      "Scoring, follow-up, priorita' e prossime mosse suggerite quando entra un lead o cambia la situazione.",
  },
  {
    label: "Ops automation",
    title: "Ripetizioni tolte di mezzo, controllo lasciato al team",
    description:
      "Assegnazione task, sintesi operative, verifiche dati e passaggi interni automatizzati solo dove serve davvero.",
  },
  {
    label: "Executive view",
    title: "Dashboard private che trasformano segnali in decisioni",
    description:
      "Widget, insight e pannelli privati per leggere andamento, richieste, colli di bottiglia e opportunita' con chiarezza.",
  },
];

export const showcases = [
  {
    kicker: "Use case 01",
    title: "Una home che fa percepire subito posizionamento e serieta'.",
    description:
      "La vetrina deve farsi ricordare, ma soprattutto deve chiarire l'offerta, alzare il valore percepito e invitare al contatto giusto.",
    metric: "Brand impact",
    highlights: [
      "Messaggio piu' chiaro nei primi secondi",
      "CTA distribuite con logica commerciale",
      "Direzione visiva che non sembra template",
    ],
    stack: ["Next.js", "Design system", "SEO-ready", "Fast loading"],
  },
  {
    kicker: "Use case 02",
    title: "Un CRM su misura che non sembra un gestionale di serie B.",
    description:
      "Pipeline, documenti, utenti, attivita' e permessi entrano in un ambiente coerente con il brand e comodo da usare ogni giorno.",
    metric: "Operational control",
    highlights: [
      "Ruoli e viste per team diversi",
      "Promesse commerciali piu' facili da seguire",
      "Accesso sicuro per team, clienti e collaboratori",
    ],
    stack: ["Portal UX", "Secure auth", "Custom workflows", "Analytics"],
  },
  {
    kicker: "Use case 03",
    title: "Un ecosistema dove front-end, vendite e delivery parlano la stessa lingua.",
    description:
      "Dal sito all'area clienti, ogni touchpoint condivide tono, dati e logica di business, senza salti di percezione o di processo.",
    metric: "Connected system",
    highlights: [
      "Messaggio consistente da primo contatto a post-vendita",
      "Raccolta dati piu' pulita e tracciabile",
      "Base pronta per evolvere senza rifare tutto",
    ],
    stack: ["Content ops", "CRM sync", "Cloud deploy", "AI agents"],
  },
];

export const workflow = [
  {
    step: "01 // Discovery",
    title: "Capiamo offerta, mercato e processo prima di disegnare",
    description:
      "Prima di parlare di layout capiamo target, posizionamento, punti deboli, passaggi commerciali e obiettivi del sistema.",
  },
  {
    step: "02 // Architecture",
    title: "Traduciamo tutto in pagine, moduli, ruoli e flussi coerenti",
    description:
      "La base viene costruita in componenti, sezioni e logiche riutilizzabili, cosi' il progetto resta ordinato e cresce bene.",
  },
  {
    step: "03 // Build",
    title: "Sviluppiamo front-end, area privata e logica operativa insieme",
    description:
      "L'accesso non e' un'aggiunta finale: e' una continuazione naturale del brand, del CRM e dei flussi di lavoro.",
  },
  {
    step: "04 // Evolution",
    title: "Rilasciamo, misuriamo e miglioriamo con continuita'",
    description:
      "Performance, analytics, supporto e nuove funzioni entrano in una roadmap concreta, non in una promessa vaga.",
  },
];

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { href: "/servizi", label: "Servizi" },
      { href: "/vetrina", label: "Vetrina" },
      { href: "/metodo", label: "Metodo" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/accesso", label: "Area clienti" },
      { href: "/piattaforma", label: "AI & CRM" },
      { href: "/#contatti", label: "Contatti" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookie", label: "Cookie Policy" },
      { href: "/note-legali", label: "Note legali" },
    ],
  },
];

export const fitProfile = {
  eyebrow: "Per chi e' Wowspace",
  title: "Lavoriamo con aziende italiane che vogliono fare un salto di livello.",
  description:
    "Non siamo per chi cerca il sito a 500 euro. Siamo per chi ha un'attivita' che funziona, vuole alzare percezione e ordine, e ha bisogno di una base tecnica seria su cui crescere.",
  good: [
    {
      title: "PMI da 1 a 30 milioni di fatturato",
      detail: "Aziende strutturate che vogliono presentarsi all'altezza e mettere ordine in vendite, clienti e operativita'.",
    },
    {
      title: "Hai un team e processi da supportare",
      detail: "Commerciali, back office, consulenti, tecnici: il sistema serve a chi lavora ogni giorno, non a fare scena.",
    },
    {
      title: "Vuoi una cosa pensata, non un template",
      detail: "Sito, CRM e portale clienti coerenti tra loro, costruiti sul tuo processo reale.",
    },
  ],
  notGood: [
    "Cerchi solo un sito vetrina a basso costo",
    "Vuoi gestire tutto via foglio Excel e WhatsApp",
    "Cerchi un freelance che esegue, non un partner che progetta",
  ],
};

export const fastAnswers = [
  {
    label: "Da quanto si parte",
    value: "Progetti da 8.000 EUR",
    detail: "Sito + base operativa. I lavori piu' ampi (CRM custom, AI, portali) vanno da 18k a 80k+ a seconda dello scope.",
  },
  {
    label: "Tempi tipici",
    value: "6-14 settimane",
    detail: "Sito corporate: 6-8 settimane. CRM e portali su misura: 10-14. Lavoriamo a rilasci, non a big bang.",
  },
  {
    label: "Come si comincia",
    value: "Una call gratuita",
    detail: "30 minuti per capirci. Se siamo il partner giusto te lo diciamo, altrimenti ti indirizziamo dove ha senso.",
  },
];

export const founder = {
  eyebrow: "Chi c'e' dietro Wowspace",
  name: "Michael Moretti",
  role: "Founder & Builder",
  photo: "/team/founder.png",
  photoAlt: "Michael Moretti, founder di Wowspace",
  pitch:
    "Quando lavori con Wowspace, parli con me. Niente account manager, niente catena di passaggi.",
  bio: [
    "Mi occupo direttamente di progetto, design e sviluppo. Lavoro con imprenditori che vogliono un partner tecnico, non un fornitore.",
    "Dietro l'estetica c'e' anni di esperienza su CRM, integrazioni e flussi reali di vendita. Costruiamo cose che reggono il quotidiano, non solo la presentazione.",
  ],
  badges: [
    { label: "Sede", value: "Italia" },
    { label: "Risposta", value: "Entro 24h" },
    { label: "Approccio", value: "1 progetto alla volta" },
  ],
};

export const personaSignals = [
  { label: "based in", value: "Italia · Europe/Rome" },
  { label: "current build", value: "CRM custom + AI assist" },
  { label: "stack", value: "Next.js · Postgres · agents" },
  { label: "uptime", value: "since 2021" },
];
