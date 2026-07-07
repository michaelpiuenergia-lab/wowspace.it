export const navLinks = [
  { href: "/servizi", label: "Servizi" },
  { href: "/piattaforma", label: "CRM su misura" },
  { href: "/runtime", label: "Automazioni & AI" },
  { href: "/sistema", label: "Tecnologia" },
  { href: "/vetrina", label: "Lavori" },
  { href: "/metodo", label: "Come lavoriamo" },
];

export const routeIndex: Record<
  string,
  { kicker: string; title: string; meta: string }
> = {
  "/servizi": {
    kicker: "route 01",
    title: "Servizi",
    meta: "Siti web, e-commerce, CRM, gestionali, AI e portali.",
  },
  "/runtime": {
    kicker: "route 02",
    title: "Automazioni & AI",
    meta: "AI e automazioni applicate ai tuoi processi aziendali.",
  },
  "/sistema": {
    kicker: "route 03",
    title: "Tecnologia",
    meta: "Stack, accessi, ruoli e sicurezza su cui costruiamo.",
  },
  "/piattaforma": {
    kicker: "route 04",
    title: "CRM su misura",
    meta: "CRM e portale clienti costruiti sul tuo processo reale.",
  },
  "/vetrina": {
    kicker: "route 05",
    title: "Lavori",
    meta: "Siti, CRM ed ecosistemi realizzati su misura.",
  },
  "/metodo": {
    kicker: "route 06",
    title: "Come lavoriamo",
    meta: "Dal primo incontro al rilascio: il nostro metodo.",
  },
};

export const heroStats = [
  {
    value: "Meno lavoro manuale",
    label: "gestionali e automazioni al posto di Excel e fogli sparsi",
  },
  {
    value: "Tutto in un posto",
    label: "lead, clienti, documenti e processi in un unico sistema",
  },
  {
    value: "Più vendite",
    label: "presenza premium e follow-up che non si perdono per strada",
  },
];

export const heroSignals = [
  {
    kicker: "Perception layer",
    title: "Offerta chiara",
    description:
      "Prima impressione, struttura e tono devono far capire subito che non sei uno dei tanti e che dietro c'è sostanza.",
  },
  {
    kicker: "Commercial flow",
    title: "Lead in ordine",
    description:
      "Form, contatti, richieste e follow-up devono entrare in un percorso leggibile, con priorità e ownership chiare.",
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
  "Su misura",
  "Accessibile l'inaccessibile",
  "Competitivi",
  "SEO & Google",
  "Made in Italy",
  "Senza grandi costi iniziali",
  "A progetto o ad abbonamento",
  "Siti WOW",
  "Assistenza diretta",
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
      "Documenti, ticket, storico e CRM diventano materiale operativo per classificare, suggerire priorità e supportare decisioni vere.",
  },
];

export const pulseMetrics = [
  { value: "Portal UX", label: "aree private con identità e usabilità" },
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
      "L'area clienti continua il brand ma aggiunge permessi, visibilità e memoria condivisa tra team e cliente.",
  },
];

export const operationsCommandLog = [
  {
    channel: "inbound.fit",
    state: "watch",
    command: "qualify inbound --source --margin --urgency",
    output:
      "Non tutte le richieste valgono uguale: leggiamo scenario, marginalità, timing e possibilità reale.",
  },
  {
    channel: "owner.map",
    state: "locked",
    command: "assign owners --sales --delivery --support",
    output:
      "Ogni passaggio ha un responsabile chiaro, così la promessa commerciale non si perde nell'operatività.",
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
      "Controlliamo che ciò che vendi resti leggibile anche quando aumentano richieste, ticket e consegne.",
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
    result: "Più fiducia, più attenzione, più credibilità.",
  },
  {
    kicker: "E-commerce",
    title: "Store costruiti per vendere e reggere la crescita",
    description:
      "Catalogo, schede prodotto, checkout, funnel e contenuti pensati per convertire senza sacrificare performance e identità.",
    result: "Meno attrito, più conversione, più controllo.",
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
      "Sintesi, classificazione, ricerca e suggerimenti entrano nei punti in cui oggi si perde tempo, contesto e velocità.",
    result: "Più velocità senza perdere controllo.",
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

// Le 5 aree principali: chiavi di lettura immediate per la home.
export const homeServices = [
  {
    icon: "🌐",
    accent: "#15d4ff",
    title: "Siti Web",
    tagline:
      "Una presenza professionale che fa percepire subito il tuo livello.",
    points: [
      "Design su misura, non template",
      "Veloci e ottimizzati per Google",
      "Pensati per generare contatti",
    ],
    href: "/servizi",
  },
  {
    icon: "🗂️",
    accent: "#c8ff5a",
    title: "CRM Personalizzati",
    tagline:
      "Clienti, lead e follow-up in un unico posto, finalmente in ordine.",
    points: [
      "Trattative e pipeline sempre chiare",
      "Niente più contatti persi",
      "Costruito sul tuo processo reale",
    ],
    href: "/piattaforma",
  },
  {
    icon: "🧩",
    accent: "#7aa2ff",
    title: "Software Gestionali",
    tagline: "Commesse, preventivi, magazzino e team senza fogli Excel sparsi.",
    points: [
      "Processi centralizzati",
      "Meno errori manuali",
      "Dati sempre aggiornati",
    ],
    href: "/servizi",
  },
  {
    icon: "🤖",
    accent: "#ff4fd8",
    title: "AI e Automazioni",
    tagline: "Il sistema fa il lavoro ripetitivo al posto tuo e del tuo team.",
    points: [
      "Meno attività manuali",
      "Sintesi e risposte automatiche",
      "Più tempo per vendere",
    ],
    href: "/runtime",
  },
  {
    icon: "📱",
    accent: "#59f0cb",
    title: "App e Portali Clienti",
    tagline: "Aree riservate e app dove clienti e team trovano tutto, sempre.",
    points: [
      "Accessi e ruoli sicuri",
      "Documenti, ticket e stato lavori",
      "Accessibile da computer e telefono",
    ],
    href: "/piattaforma",
  },
];

// Esempi concreti di prodotti: aiutano il visitatore a "vedere" cosa realizziamo.
export const buildShowcase = [
  {
    tag: "Vendite",
    title: "CRM commerciali",
    description:
      "Lead, trattative e follow-up del team vendite sotto controllo.",
  },
  {
    tag: "Operatività",
    title: "Gestionali aziendali",
    description:
      "Commesse, preventivi, magazzino e fatturazione in un solo posto.",
  },
  {
    tag: "Ristorazione",
    title: "Gestionale ristorante",
    description: "Sale, ordini, menù e turni gestiti senza confusione.",
  },
  {
    tag: "Controllo",
    title: "Dashboard operative",
    description: "Numeri, scadenze e priorità del giorno sempre sott'occhio.",
  },
  {
    tag: "Clienti",
    title: "Portali clienti",
    description: "Area riservata con documenti, stato lavori e comunicazioni.",
  },
  {
    tag: "Automazione",
    title: "Automazioni AI",
    description:
      "Sintesi, classificazione e risposte automatiche sui tuoi dati.",
  },
];

// Sezioni dedicate "cosa costruiamo": ogni area mostra un mockup di prodotto reale.
export const featureBands = [
  {
    variant: "site" as const,
    tag: "Siti Web",
    title: "Ti costruiamo il sito che ti fa percepire come il migliore.",
    body: "Design su misura, veloce e con SEO inclusa. Un sito che fa 'wow' al primo sguardo e trasforma chi ti visita in contatti reali.",
    points: [
      "Design su misura, non un tema preconfezionato",
      "SEO inclusa: ottimizzato per Google fin da subito",
      "Pensato per generare richieste, non solo per essere bello",
    ],
    cta: { href: "/servizi/siti-web", label: "Realizzazione siti web" },
  },
  {
    variant: "crm" as const,
    tag: "CRM Personalizzati",
    title: "Ti costruiamo il CRM cucito sul tuo modo di vendere.",
    body: "Lead, trattative e follow-up in un unico posto ordinato. Basta contatti persi tra mail, WhatsApp e fogli sparsi: il commerciale sa sempre cosa fare dopo.",
    points: [
      "Pipeline e trattative sempre sotto controllo",
      "Niente più clienti e occasioni perse",
      "Costruito sul tuo processo, non su un template",
    ],
    cta: { href: "/servizi/crm-su-misura", label: "CRM su misura" },
  },
  {
    variant: "erp" as const,
    tag: "Software Gestionali",
    title: "Ti costruiamo il gestionale che manda in pensione l'Excel.",
    body: "Commesse, preventivi, magazzino e team in un'unica piattaforma, agganciata al tuo sito: quello che arriva dal web entra già ordinato nel gestionale.",
    points: [
      "Agganciato al sito: i dati entrano già pronti",
      "Processi centralizzati, meno errori manuali",
      "Su misura: officina, studio, ristorante, negozio…",
    ],
    cta: { href: "/servizi/software-gestionali", label: "Software gestionali" },
  },
  {
    variant: "ai" as const,
    tag: "AI e Automazioni",
    title: "Mettiamo l'AI a fare il lavoro ripetitivo al posto tuo.",
    body: "Sintesi, classificazione e risposte automatiche sui tuoi dati. Il sistema prepara, ordina e suggerisce: il team guadagna tempo per quello che conta davvero.",
    points: [
      "Meno attività manuali ogni giorno",
      "Risposte e riassunti pronti in automatico",
      "Più tempo per seguire i clienti",
    ],
    cta: { href: "/servizi/automazioni-ai", label: "Automazioni e AI" },
  },
  {
    variant: "portal" as const,
    tag: "App e Portali Clienti",
    title: "Diamo ai tuoi clienti un'area dove trovano tutto.",
    body: "Documenti, stato lavori, ticket e comunicazioni in un portale ordinato, accessibile da computer e telefono, con accessi sicuri per ogni ruolo.",
    points: [
      "Accessi e permessi sicuri",
      "Documenti e stato lavori sempre disponibili",
      "Accessibile ovunque, da qualsiasi dispositivo",
    ],
    cta: { href: "/servizi/portali-clienti", label: "Portali clienti" },
  },
];

// Servizi che completano l'offerta a 360°.
export const extraServices = [
  {
    icon: "🎨",
    accent: "#ff4fd8",
    title: "Grafica & brand identity",
    description:
      "Logo, identità visiva e materiali coordinati che ti fanno riconoscere e ricordare.",
  },
  {
    icon: "🔍",
    accent: "#c8ff5a",
    title: "SEO e posizionamento",
    description:
      "Ti facciamo trovare su Google da chi cerca esattamente quello che offri.",
  },
  {
    icon: "🛒",
    accent: "#15d4ff",
    title: "E-commerce",
    description:
      "Negozi online costruiti per vendere davvero, non solo per esserci.",
  },
  {
    icon: "⚡",
    accent: "#59f0cb",
    title: "Hosting & performance",
    description: "Sito veloce, sicuro e sempre online, senza pensieri tecnici.",
  },
  {
    icon: "🛠️",
    accent: "#7aa2ff",
    title: "Manutenzione & assistenza",
    description:
      "Aggiornamenti, modifiche e supporto diretto nel tempo: non ti lasciamo solo.",
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
    title: "Reparto commerciale più veloce e meno dispersivo",
    description:
      "Scoring, follow-up, priorità e prossime mosse suggerite quando entra un lead o cambia la situazione.",
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
      "Widget, insight e pannelli privati per leggere andamento, richieste, colli di bottiglia e opportunità con chiarezza.",
  },
];

export const showcases = [
  {
    kicker: "Use case 01",
    title: "Una home che fa percepire subito posizionamento e serietà.",
    description:
      "La vetrina deve farsi ricordare, ma soprattutto deve chiarire l'offerta, alzare il valore percepito e invitare al contatto giusto.",
    metric: "Brand impact",
    highlights: [
      "Messaggio più chiaro nei primi secondi",
      "CTA distribuite con logica commerciale",
      "Direzione visiva che non sembra template",
    ],
    stack: ["Next.js", "Design system", "SEO-ready", "Fast loading"],
  },
  {
    kicker: "Use case 02",
    title: "Un CRM su misura che non sembra un gestionale di serie B.",
    description:
      "Pipeline, documenti, utenti, attività e permessi entrano in un ambiente coerente con il brand e comodo da usare ogni giorno.",
    metric: "Operational control",
    highlights: [
      "Ruoli e viste per team diversi",
      "Promesse commerciali più facili da seguire",
      "Accesso sicuro per team, clienti e collaboratori",
    ],
    stack: ["Portal UX", "Secure auth", "Custom workflows", "Analytics"],
  },
  {
    kicker: "Use case 03",
    title:
      "Un ecosistema dove front-end, vendite e delivery parlano la stessa lingua.",
    description:
      "Dal sito all'area clienti, ogni touchpoint condivide tono, dati e logica di business, senza salti di percezione o di processo.",
    metric: "Connected system",
    highlights: [
      "Messaggio consistente da primo contatto a post-vendita",
      "Raccolta dati più pulita e tracciabile",
      "Base pronta per evolvere senza rifare tutto",
    ],
    stack: ["Content ops", "CRM sync", "Cloud deploy", "AI agents"],
  },
];

export const workflow = [
  {
    step: "01 · Capiamo",
    title: "Capiamo offerta, mercato e processo prima di disegnare",
    description:
      "Prima di parlare di layout capiamo target, posizionamento, punti deboli, passaggi commerciali e obiettivi del sistema.",
  },
  {
    step: "02 · Progettiamo",
    title: "Traduciamo tutto in pagine, moduli, ruoli e flussi coerenti",
    description:
      "La base viene costruita in componenti, sezioni e logiche riutilizzabili, così il progetto resta ordinato e cresce bene.",
  },
  {
    step: "03 · Costruiamo",
    title: "Sviluppiamo front-end, area privata e logica operativa insieme",
    description:
      "L'accesso non è un'aggiunta finale: è una continuazione naturale del brand, del CRM e dei flussi di lavoro.",
  },
  {
    step: "04 · Cresciamo",
    title: "Rilasciamo, misuriamo e miglioriamo con continuità",
    description:
      "Performance, analytics, supporto e nuove funzioni entrano in una roadmap concreta, non in una promessa vaga.",
  },
];

export const footerGroups = [
  {
    title: "Servizi",
    links: [
      { href: "/servizi/siti-web", label: "Siti web" },
      { href: "/servizi/e-commerce", label: "E-commerce" },
      { href: "/servizi/crm-su-misura", label: "CRM su misura" },
      { href: "/servizi/software-gestionali", label: "Software gestionali" },
      { href: "/servizi/automazioni-ai", label: "Automazioni e AI" },
      { href: "/servizi/portali-clienti", label: "Portali clienti" },
    ],
  },
  {
    title: "Zone servite",
    links: [
      { href: "/agenzia-web-porto-sant-elpidio", label: "Porto Sant'Elpidio" },
      { href: "/web-agency-fermo", label: "Fermo" },
      { href: "/siti-web-civitanova-marche", label: "Civitanova Marche" },
      { href: "/software-gestionali-marche", label: "Gestionali Marche" },
    ],
  },
  {
    title: "Esplora",
    links: [
      { href: "/servizi", label: "Tutti i servizi" },
      { href: "/vetrina", label: "Lavori" },
      { href: "/metodo", label: "Come lavoriamo" },
      { href: "/accesso", label: "Area clienti" },
    ],
  },
  {
    title: "Legale",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookie", label: "Cookie Policy" },
      { href: "/note-legali", label: "Note legali" },
    ],
  },
];

export const fitProfile = {
  eyebrow: "Per chi è Wowspace",
  title: "Lavoriamo con piccole e medie imprese, fino alle grandi aziende.",
  description:
    "Rendiamo accessibile l'inaccessibile: CRM, gestionali e AI che di solito sembrano roba 'da grandi aziende', portati alla tua misura. Competitivi, concreti e senza un grande investimento iniziale.",
  good: [
    {
      title: "Piccole e medie imprese",
      detail:
        "Realtà strutturate che vogliono presentarsi all'altezza e mettere ordine in vendite, clienti e operatività. Dalle PMI fino alle grandi aziende.",
    },
    {
      title: "Hai un team e processi da supportare",
      detail:
        "Commerciali, back office, consulenti, tecnici: il sistema serve a chi lavora ogni giorno, non a fare scena.",
    },
    {
      title: "Vuoi una cosa pensata, non un template",
      detail:
        "Sito, CRM e portale clienti coerenti tra loro, costruiti sul tuo processo reale.",
    },
  ],
  notGood: [
    "Ti va bene un sito qualsiasi, uguale a tanti",
    "Vuoi gestire tutto per sempre con Excel e WhatsApp",
    "Cerchi chi esegue e basta, non un partner che progetta",
  ],
};

export const fastAnswers = [
  {
    label: "Come si parte",
    value: "Una call gratuita",
    detail:
      "30 minuti per capire obiettivi, processo e priorità. Se siamo il partner giusto te lo diciamo subito.",
  },
  {
    label: "Tempi tipici",
    value: "Poche settimane",
    detail:
      "Lavoriamo a piccoli rilasci: vedi risultati presto, senza aspettare mesi di silenzio.",
  },
  {
    label: "Come si paga",
    value: "Progetto o abbonamento",
    detail:
      "Una tantum oppure un canone su misura, così parti senza un grande investimento iniziale.",
  },
];

export const founder = {
  eyebrow: "Chi c'è dietro Wowspace",
  name: "Michael Moretti",
  role: "Founder & Builder",
  pitch:
    "Quando lavori con Wowspace, parli con me. Niente account manager, niente catena di passaggi.",
  bio: [
    "Mi occupo direttamente di progetto, design e sviluppo. Lavoro con imprenditori che vogliono un partner tecnico, non un fornitore.",
    "Dietro l'estetica c'è anni di esperienza su CRM, integrazioni e flussi reali di vendita. Costruiamo cose che reggono il quotidiano, non solo la presentazione.",
  ],
  badges: [
    { label: "Sede", value: "Porto Sant'Elpidio (FM)" },
    { label: "Risposta", value: "Entro 24h" },
    { label: "Approccio", value: "1 progetto alla volta" },
  ],
};

export const personaSignals = [
  { label: "Sede", value: "Porto Sant'Elpidio (FM)" },
  { label: "Clienti", value: "PMI e grandi aziende" },
  { label: "Risposta", value: "Entro 24h" },
];
