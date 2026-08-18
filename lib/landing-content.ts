// Tipi e contenuti delle pagine-servizio (/servizi/*) e delle landing locali
// (città/regione). Testi UNICI per pagina, generati ad hoc, senza dati inventati.
// File generato/curato: modificare i testi qui. Renderizzati da <LandingPage>.

export type LandingSection = {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LandingFaq = { q: string; a: string };

export type LandingLink = { href: string; label: string };

export type LandingCrumb = { label: string; href: string };

export type LandingContent = {
  /** percorso completo senza slash iniziale, es. "servizi/siti-web" */
  path: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  introParagraphs: string[];
  sections: LandingSection[];
  faq: LandingFaq[];
  ctaLabel: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  /** città o regione servita (per Service.areaServed delle landing locali) */
  areaServed?: string;
  /** link interni correlati (siloing) */
  related: LandingLink[];
  /** briciole di pane Home > ... > pagina */
  breadcrumb: LandingCrumb[];
};

export const servicePages: Record<string, LandingContent> = {
  "siti-web": {
    path: "servizi/siti-web",
    metaTitle: "Realizzazione siti web su misura per la tua azienda",
    metaDescription:
      "Realizziamo siti web su misura per aziende: design unico, velocità, SEO inclusa e struttura pensata per generare contatti. Richiedi un preventivo.",
    kicker: "Siti web su misura",
    h1: "Realizzazione siti web su misura per aziende",
    lead: "Un sito che fa percepire il tuo livello al primo sguardo e trasforma chi ti visita in richieste concrete.",
    introParagraphs: [
      "Il tuo sito è quasi sempre il primo contatto tra la tua azienda e chi potrebbe diventare cliente. In pochi secondi le persone decidono se ti percepiscono come una realtà seria oppure come una tra tante. Per questo la realizzazione di un sito web non è un lavoro grafico da chiudere in fretta: è una scelta che deve comunicare valore, guidare chi legge e portare richieste reali.",
      "Noi di Wowspace costruiamo siti su misura, cuciti sul tuo settore e sui tuoi obiettivi, mai a partire da un tema preconfezionato. Parli direttamente con Michael Moretti, il fondatore, senza passare da una catena di intermediari: un solo referente, un progetto alla volta e risposte entro 24 ore.",
    ],
    sections: [
      {
        h2: "Siti su misura, mai un template riciclato",
        paragraphs: [
          "Un tema comprato e riadattato si riconosce: struttura rigida, sezioni che non c'entrano con la tua attività, decine di funzioni inutili che appesantiscono tutto. Noi partiamo dall'opposto. Prima capiamo cosa vende davvero la tua azienda, chi sono i tuoi clienti e quale azione vuoi che compiano. Poi progettiamo pagine e percorsi attorno a quell'obiettivo.",
          "Il risultato è un sito che parla la lingua del tuo settore, che si tratti di un'officina, di uno studio professionale, di un'attività ricettiva o di un'azienda che produce e vende ad altre imprese. Ogni elemento ha un motivo preciso per essere lì.",
        ],
        bullets: [
          "Struttura costruita sul tuo processo commerciale, non su un layout preconfezionato",
          "Sezioni e contenuti pensati per il tuo settore specifico",
          "Nessuna funzione inutile che rallenta il sito e confonde chi legge",
        ],
      },
      {
        h2: "Design che comunica solidità e valore",
        paragraphs: [
          "Le persone si fidano di ciò che appare curato. Un sito ordinato, con una gerarchia visiva chiara e una grafica coerente con il tuo marchio, fa percepire la tua azienda come più affidabile ancora prima di leggere una riga. Curiamo tipografia, spazi, colori e immagini perché il messaggio arrivi pulito e la tua attività si mostri al livello dei migliori del settore, o sopra.",
          "Non parliamo di un sito 'bello e basta'. L'estetica serve un obiettivo concreto: accompagnare lo sguardo verso ciò che conta, dal messaggio principale fino al pulsante che porta a contattarti.",
        ],
      },
      {
        h2: "Veloce, sicuro e ottimizzato per Google",
        paragraphs: [
          "Un sito lento perde visitatori prima ancora di mostrare cosa offri, e i motori di ricerca lo penalizzano nel posizionamento. Sviluppiamo con uno stack moderno (Next.js) per pagine che si aprono in fretta anche da smartphone e con connessioni non perfette. La SEO tecnica di base è inclusa fin dall'inizio: struttura corretta dei contenuti, titoli e descrizioni curati, dati strutturati e testi scritti per essere trovati da chi cerca i tuoi servizi.",
          "Se lavori nelle Marche e vuoi farti trovare da clienti del territorio, impostiamo il sito perché sia rilevante per le ricerche locali, senza scorciatoie che col tempo si ritorcono contro.",
        ],
        bullets: [
          "Caricamento rapido su desktop e mobile",
          "Contenuti e struttura ottimizzati per il posizionamento su Google",
          "Certificato di sicurezza, backup e sito sempre online",
        ],
      },
      {
        h2: "Fatto per generare contatti, non solo visite",
        paragraphs: [
          "Un sito che riceve traffico ma non produce richieste è un costo, non un investimento. Per questo progettiamo ogni pagina attorno a un'azione chiara: una telefonata, un modulo, un messaggio, un preventivo. Inviti all'azione ben posizionati, moduli semplici da compilare, contatti sempre a portata di mano e percorsi che sciolgono i dubbi di chi sta valutando se scriverti.",
          "Quando serve, colleghiamo il sito ai tuoi strumenti: un CRM, un'area riservata, automazioni via email. Così ogni richiesta arriva già ordinata e nessun potenziale cliente si perde per strada.",
        ],
      },
      {
        h2: "Come lavoriamo insieme",
        paragraphs: [
          "Partiamo da un confronto per capire obiettivi, concorrenti e cosa ti distingue davvero. Da lì progettiamo struttura e design, li condividiamo con te e li rifiniamo insieme prima di passare allo sviluppo. Alla consegna il sito è pronto per la pubblicazione, e restiamo a disposizione per aggiornamenti ed evoluzioni.",
          "Seguiamo un progetto alla volta, con un unico referente. Puoi scegliere la formula a progetto oppure ad abbonamento, così parti senza un grande investimento iniziale e fai crescere il sito nel tempo.",
        ],
        bullets: [
          "Un solo referente: parli direttamente con chi realizza il sito",
          "Un progetto alla volta, seguito con attenzione dall'inizio alla messa online",
          "Formula a progetto o ad abbonamento, senza grandi costi di partenza",
        ],
      },
    ],
    faq: [
      {
        q: "Quanto costa la realizzazione di un sito web?",
        a: "Dipende da obiettivi, numero di pagine e funzioni: un sito vetrina ben fatto ha un costo diverso da un progetto con area riservata o integrazioni. Proprio per questo lavoriamo su misura e, dopo un primo confronto, ti diamo un preventivo chiaro. Puoi scegliere la formula a progetto o ad abbonamento, così parti senza un grande investimento iniziale.",
      },
      {
        q: "In quanto tempo è pronto il sito?",
        a: "I tempi dipendono dalla complessità e dalla velocità con cui riceviamo testi e materiali. Un sito vetrina richiede meno di un progetto con più funzioni. All'inizio definiamo insieme una tempistica realistica e la rispettiamo, con un solo referente che segue tutto il lavoro.",
      },
      {
        q: "Usate WordPress o un template già pronto?",
        a: "No, non partiamo da temi preconfezionati. Sviluppiamo su misura con uno stack moderno (Next.js): il sito è più veloce, più sicuro e libero da funzioni inutili. Ogni struttura è costruita sul tuo settore e sui tuoi obiettivi.",
      },
      {
        q: "La SEO è inclusa nel sito?",
        a: "Sì. La SEO tecnica di base fa parte della realizzazione del sito: struttura corretta dei contenuti, titoli e descrizioni, velocità, dati strutturati e testi pensati per farti trovare. Se vuoi spingere di più su ricerche e posizionamento, possiamo aggiungere nel tempo un lavoro SEO dedicato.",
      },
      {
        q: "Il sito si vedrà bene da smartphone?",
        a: "Sempre. Progettiamo prima di tutto per il mobile, perché è da lì che arriva la maggior parte delle visite. Il sito si adatta a ogni schermo e resta veloce anche con connessioni non ottimali.",
      },
      {
        q: "Dopo la consegna posso aggiornare il sito da solo?",
        a: "Dipende da come lo costruiamo: possiamo prevedere sezioni che aggiorni in autonomia oppure occuparcene noi con la formula ad abbonamento. Ne parliamo all'inizio e scegliamo la soluzione più comoda per te.",
      },
    ],
    ctaLabel: "Parliamo del tuo sito",
    serviceType: "Realizzazione siti web",
    related: [
      {
        href: "/servizi/e-commerce",
        label: "Sviluppo e-commerce",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/portali-clienti",
        label: "Portali clienti",
      },
      {
        href: "/agenzia-web-porto-sant-elpidio",
        label: "Agenzia web Porto Sant'Elpidio",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "Realizzazione siti web",
        href: "/servizi/siti-web",
      },
    ],
  },
  "e-commerce": {
    path: "servizi/e-commerce",
    metaTitle: "Sviluppo e-commerce su misura per negozi che vendono",
    metaDescription:
      "Sviluppo e-commerce su misura per PMI e aziende: catalogo, checkout e gestionale integrati. Negozi veloci, fatti per vendere. Scrivici, rispondiamo in 24h.",
    kicker: "Negozi online su misura",
    h1: "Sviluppo e-commerce: il tuo negozio online fatto per vendere",
    lead: "Non un catalogo messo online tanto per esserci, ma uno store costruito attorno al tuo prodotto, al tuo margine e al modo in cui vendi.",
    introParagraphs: [
      "Aprire un e-commerce oggi è facile. Farne uno che vende davvero è un'altra cosa. La differenza tra un negozio online che porta ordini e uno che resta fermo non è il tema grafico scelto, ma come sono pensati catalogo, schede prodotto e checkout, e quanto è rapido tutto quando un cliente decide di comprare. Noi partiamo esattamente da lì.",
      "Wowspace sviluppa e-commerce su misura per PMI e aziende delle Marche e non solo: niente template comprato e riadattato, ma una struttura costruita sul tuo prodotto, sui tuoi margini e sul tuo modo di lavorare. Uno store bello da vedere, sì, ma soprattutto fatto per far scorrere l'ordine dal primo clic alla conferma di pagamento, e che regge quando le vendite iniziano a crescere.",
    ],
    sections: [
      {
        h2: "Il sito vetrina racconta, l'e-commerce incassa",
        paragraphs: [
          "Un sito vetrina serve a farti trovare e a farti sembrare credibile: il suo lavoro è generare contatti e telefonate. Un e-commerce ha un compito diverso e più difficile: chiudere la vendita da solo, 24 ore su 24, senza che nessuno risponda al telefono. Per questo si progetta con altri numeri in testa: quante persone comprano, quanto vale in media un ordine, quanti carrelli vengono abbandonati, quanti clienti tornano.",
          "È un tema concreto per il territorio marchigiano: tra calzature, agroalimentare, vino, arredo e artigianato ci sono tantissime realtà che producono eccellenze ma vendono ancora quasi solo all'ingrosso o sul mercato locale. Un e-commerce fatto bene apre la vendita diretta in tutta Italia e all'estero, spesso con margini migliori rispetto all'intermediazione.",
        ],
        bullets: [
          "Obiettivo chiaro: chiudere l'ordine, non solo raccogliere contatti",
          "Metriche che contano davvero: conversione, valore medio dell'ordine, carrelli abbandonati",
          "Ogni schermata pensata per togliere attrito, mai per aggiungerlo",
        ],
      },
      {
        h2: "Catalogo e schede prodotto che convincono a comprare",
        paragraphs: [
          "Il catalogo è il cuore del negozio. Costruiamo categorie, filtri e navigazione sul modo in cui i tuoi clienti cercano davvero (per taglia, colore, uso, prezzo, occasione), non su come è organizzato il tuo magazzino. Le schede prodotto rispondono alle obiezioni prima che nascano: foto reali, varianti, disponibilità in tempo reale, costi e tempi di spedizione visibili subito, prodotti correlati e abbinamenti coerenti per alzare il valore del carrello.",
          "Se hai centinaia o migliaia di referenze, la struttura resta veloce da navigare per il cliente e gestibile per te dal backoffice, senza trasformarsi in un lavoro infinito ogni volta che aggiorni un prezzo o carichi una novità.",
        ],
        bullets: [
          "Filtri e categorie costruiti sul modo in cui la gente cerca",
          "Schede complete: varianti, disponibilità, spedizione trasparente",
          "Correlati e abbinamenti per far crescere lo scontrino medio",
        ],
      },
      {
        h2: "Checkout e funnel: dove si vince o si perde la vendita",
        paragraphs: [
          "La maggior parte dei carrelli si perde proprio all'ultimo passo: troppi passaggi, costi di spedizione che compaiono a sorpresa, registrazione obbligatoria, pochi metodi di pagamento. Costruiamo un checkout corto e onesto, con acquisto anche come ospite, i metodi di pagamento che i tuoi clienti usano davvero (carte, PayPal, wallet come Apple e Google Pay, e opzioni pensate per il B2B dove serve) e costi chiari fin dall'inizio.",
          "Poi teniamo d'occhio il funnel: capire in quale punto le persone si fermano ci permette di correggere il percorso invece di tirare a indovinare. Piccole modifiche nei punti giusti fanno spesso più differenza di un restyling completo.",
        ],
      },
      {
        h2: "Veloce e trovabile: performance e SEO di serie",
        paragraphs: [
          "Un e-commerce lento perde vendite e posizioni su Google, e lo fa in silenzio. Lavoriamo su uno stack moderno (Next.js) per pagine che caricano in fretta anche da smartphone, dove ormai avviene la maggior parte degli acquisti. Le prestazioni non sono un dettaglio tecnico: sono soldi che entrano o che si fermano al primo caricamento troppo lungo.",
          "La SEO la impostiamo dalla struttura, non appiccicata dopo: URL puliti, categorie e schede ottimizzate, dati strutturati per i prodotti, contenuti che portano traffico organico. Così il negozio non dipende solo dalla pubblicità a pagamento e continua a lavorare anche quando smetti di investire in campagne.",
        ],
        bullets: [
          "Caricamento rapido su mobile, dove si compra di più",
          "Struttura SEO: URL, categorie, schede e dati strutturati prodotto",
          "Meno dipendenza dalle ADS, più traffico che arriva da solo",
        ],
      },
      {
        h2: "Su misura, integrato e seguito da chi lo costruisce",
        paragraphs: [
          "Un negozio online scollegato dal resto diventa lavoro doppio: ordini da ricopiare a mano, magazzino che non torna, fatture da rifare. Integriamo l'e-commerce con il tuo gestionale, il magazzino, la fatturazione e i corrieri, e se lo vuoi con un CRM o un'area clienti su misura per il post-vendita. Gli ordini entrano già pronti, le giacenze si aggiornano da sole, tu segui tutto da un punto solo. È il vantaggio di rivolgerti a chi costruisce anche gestionali e automazioni, non soltanto la grafica del negozio.",
          "Lo sviluppo di un e-commerce, per noi, non finisce al lancio. Lavoriamo su misura (mai un tema riadattato), a progetto una tantum oppure ad abbonamento, senza chiederti un grande investimento iniziale. E parli direttamente con Michael Moretti, il fondatore: un solo progetto alla volta, nessuna catena di account manager, risposta entro 24 ore. Dal laboratorio artigiano alla PMI manifatturiera fino ad aziende più strutturate, il negozio si costruisce sul tuo modo di vendere.",
        ],
        bullets: [
          "Ordini e giacenze sincronizzati con il gestionale",
          "Fatturazione, spedizioni e corrieri collegati",
          "Opzionale: CRM e area clienti per gestire il dopo-vendita",
        ],
      },
    ],
    faq: [
      {
        q: "Che differenza c'è tra un sito vetrina e un e-commerce?",
        a: "Il sito vetrina serve a farti trovare e a generare contatti; l'e-commerce vende da solo e incassa online 24 ore su 24, senza bisogno di una telefonata. Cambiano gli obiettivi e la struttura: catalogo, carrello, checkout e pagamenti. Se il tuo scopo è vendere prodotti online, ti serve un e-commerce, non solo una vetrina.",
      },
      {
        q: "Su quale piattaforma sviluppate l'e-commerce?",
        a: "Non partiamo da un tema preconfezionato. Scegliamo la tecnologia più adatta al tuo caso, spesso uno stack moderno come Next.js abbinato a un motore e-commerce headless, e la costruiamo su misura sul tuo catalogo e sui tuoi processi. L'obiettivo è uno store veloce e davvero tuo, che non ti ingabbia in un template.",
      },
      {
        q: "Potete collegare l'e-commerce al mio gestionale e al magazzino?",
        a: "Sì, è uno dei nostri punti forti. Integriamo il negozio con gestionale, magazzino, fatturazione e corrieri, così gli ordini entrano già pronti e le giacenze restano allineate. Su richiesta aggiungiamo anche un CRM o un'area clienti su misura per gestire il post-vendita da un unico punto.",
      },
      {
        q: "Quanto costa sviluppare un e-commerce?",
        a: "Dipende da catalogo, integrazioni e funzioni richieste: per questo non diamo listini standard. Lavoriamo a progetto (una tantum) oppure ad abbonamento, senza chiederti un grande investimento iniziale. Raccontaci cosa vendi e ti proponiamo l'approccio più sensato per il tuo caso.",
      },
      {
        q: "Gestite pagamenti, spedizioni e IVA?",
        a: "Sì. Configuriamo i metodi di pagamento che i tuoi clienti usano davvero (carte, PayPal, wallet e opzioni B2B dove servono), colleghiamo i corrieri per le spedizioni e impostiamo correttamente aliquote IVA e costi di consegna, così al checkout non compaiono sorprese che fanno abbandonare il carrello.",
      },
      {
        q: "Potete migrare un e-commerce già esistente da un'altra piattaforma?",
        a: "Sì. Portiamo catalogo, ordini e clienti dalla piattaforma attuale a una struttura più veloce e su misura, curando i redirect per non perdere il posizionamento già guadagnato su Google. Prima analizziamo cosa funziona del tuo store attuale e cosa conviene correggere.",
      },
    ],
    ctaLabel: "Parliamo del tuo e-commerce",
    serviceType: "Sviluppo e-commerce",
    related: [
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "Sviluppo e-commerce",
        href: "/servizi/e-commerce",
      },
    ],
  },
  "crm-su-misura": {
    path: "servizi/crm-su-misura",
    metaTitle: "CRM su misura per lead, trattative e clienti",
    metaDescription:
      "CRM su misura costruito sul tuo processo di vendita: lead, trattative e follow-up in un unico posto ordinato. Parliamone, rispondiamo entro 24 ore.",
    kicker: "CRM personalizzato",
    h1: "CRM su misura, costruito sul tuo processo di vendita",
    lead: "Lead, trattative, follow-up e clienti in un unico posto ordinato: uno strumento cucito su come vendi davvero, non un template da adattare a forza.",
    introParagraphs: [
      "Se i tuoi contatti vivono sparsi tra mail, WhatsApp, biglietti da visita e fogli Excel, prima o poi qualcosa si perde: un preventivo non richiamato, un cliente che aspetta una risposta, una trattativa dimenticata a metà. Un CRM su misura mette ordine in tutto questo, perché nasce dal tuo modo di lavorare e non da uno schema generico calato dall'alto.",
      "Non partiamo da un software preconfezionato pieno di funzioni che non userai mai. Partiamo dalle tue fasi di vendita reali, dai ruoli del team e dalle informazioni che ti servono davvero per decidere. Il risultato è uno strumento pulito e veloce, che il commerciale apre volentieri invece di evitarlo.",
      "Lo sviluppiamo con tecnologia moderna e lo pensiamo per crescere con te: oggi gestisce i contatti, domani può collegarsi al sito, alla fatturazione o all'assistenza, senza dover rifare tutto da capo.",
    ],
    sections: [
      {
        h2: "Lead, trattative e follow-up sempre sotto controllo",
        paragraphs: [
          "Ogni richiesta che arriva — dal sito, da una telefonata, da una fiera — entra nel sistema e diventa un contatto tracciato, con la sua storia e la sua prossima azione già definita. Niente più occasioni che si spengono perché nessuno le ha richiamate in tempo.",
          "La pipeline mostra a colpo d'occhio a che punto è ogni trattativa e cosa manca per chiuderla. Il team sa sempre chi deve fare cosa, e tu vedi in tempo reale quanto lavoro c'è in ballo e dove si blocca.",
        ],
        bullets: [
          "Contatti, aziende e trattative collegati tra loro, senza doppioni",
          "Promemoria e follow-up che non dipendono dalla memoria di nessuno",
          "Note, preventivi e comunicazioni allegati alla scheda del cliente",
          "Viste diverse per commerciale, back office e direzione",
        ],
      },
      {
        h2: "Un CRM su misura, non un template da riempire",
        paragraphs: [
          "I software pronti all'uso ti obbligano a piegare il lavoro alle loro logiche: campi che non servono, passaggi obbligati, funzioni che confondono il team. Noi facciamo il contrario, partiamo da come vendi davvero e costruiamo solo ciò che ti fa avanzare.",
          "Le fasi della pipeline, i dati da raccogliere, gli automatismi e i permessi vengono modellati sul tuo processo. Se domani cambia il modo di lavorare, il CRM si adatta invece di diventare una gabbia.",
        ],
        bullets: [
          "Fasi di vendita e stati definiti sul tuo flusso reale",
          "Solo i campi e le funzioni che usi, interfaccia pulita",
          "Automazioni sui passaggi ripetitivi, meno lavoro manuale",
          "Grafica coerente con il tuo brand, gradevole da usare ogni giorno",
        ],
      },
      {
        h2: "CRM, gestionale o portale clienti: cosa cambia",
        paragraphs: [
          "Sono tre cose diverse che spesso vengono confuse. Il CRM è il cuore commerciale: si occupa di chi ancora non è cliente e di come lo diventa — lead, trattative, follow-up, relazione. Il gestionale governa l'operatività dopo la vendita: commesse confermate, preventivi in produzione, magazzino, fatturazione. Il portale clienti, invece, è l'area riservata dove il cliente stesso accede ai suoi documenti, richieste e allo stato dei lavori.",
          "Spesso convivono e si parlano: un lead nel CRM diventa una commessa nel gestionale, e il cliente segue tutto dal portale. Ti aiutiamo a capire da dove partire in base a ciò che oggi ti fa perdere più tempo, senza venderti moduli che non ti servono.",
        ],
      },
      {
        h2: "Per quali attività ha senso",
        paragraphs: [
          "Un CRM su misura è utile ovunque ci sia un ciclo di vendita fatto di più contatti e più fasi. Uno studio di consulenti che segue richieste di preventivo, un'azienda manifatturiera con una rete di agenti, un'attività di servizi con molti clienti ricorrenti: tutte realtà in cui perdere un follow-up significa perdere fatturato.",
          "Lavoriamo con le PMI del territorio marchigiano e non solo, dal distretto calzaturiero e manifatturiero del Fermano alle realtà di servizi, portando alla loro misura strumenti che di solito sembrano riservati alle grandi aziende, e senza un grande investimento iniziale.",
        ],
      },
      {
        h2: "Come lavoriamo",
        paragraphs: [
          "Parli direttamente con chi progetta e sviluppa il sistema, non con una catena di intermediari. Seguiamo un progetto alla volta per darti attenzione vera e rispondiamo entro 24 ore.",
          "Puoi scegliere la formula più comoda, a progetto oppure ad abbonamento. In entrambi i casi parti da un impianto solido ed essenziale e lo fai crescere per gradi, aggiungendo funzioni e integrazioni solo quando servono davvero.",
        ],
      },
    ],
    faq: [
      {
        q: "Che differenza c'è tra un CRM su misura e uno pronto all'uso?",
        a: "Un software pronto ti chiede di adattare il tuo modo di lavorare alle sue logiche. Un CRM su misura fa il contrario: fasi, campi e automatismi vengono costruiti sul tuo processo di vendita reale, così usi solo ciò che serve e il team lo adotta volentieri.",
      },
      {
        q: "Il CRM è la stessa cosa di un gestionale?",
        a: "No. Il CRM è la parte commerciale: lead, trattative, follow-up e relazione con il cliente prima e durante la vendita. Il gestionale governa l'operatività dopo, come commesse, preventivi confermati, magazzino e fatturazione. Spesso i due sistemi convivono e si scambiano i dati.",
      },
      {
        q: "Posso collegare il CRM al sito e agli altri strumenti che uso?",
        a: "Sì. Le richieste dal sito possono entrare direttamente nel CRM come nuovi contatti, e possiamo integrare email, calendario, fatturazione o il gestionale. L'obiettivo è che i dati arrivino già ordinati, senza doppie digitazioni.",
      },
      {
        q: "Quanto costa un CRM su misura?",
        a: "Dipende dalla complessità del tuo processo e dalle integrazioni. Puoi scegliere tra pagamento a progetto o ad abbonamento, e in genere si parte da un impianto essenziale che poi cresce nel tempo: così eviti un grande investimento iniziale.",
      },
      {
        q: "In quanto tempo è pronto?",
        a: "Dipende dalle funzioni. Preferiamo rilasciare una prima versione utile e concreta il prima possibile, e poi far evolvere il CRM per gradi, invece di aspettare mesi per un sistema completo. I tempi te li diamo chiari dopo aver capito il tuo flusso.",
      },
      {
        q: "I dati miei e dei clienti sono al sicuro?",
        a: "Sì. Gli accessi sono regolati da ruoli e permessi, così ognuno vede solo ciò che gli compete, e il sistema gira su infrastruttura cloud con tecnologia moderna. La gestione dei dati personali segue le regole del GDPR.",
      },
    ],
    ctaLabel: "Parliamo del tuo CRM",
    serviceType: "CRM su misura",
    related: [
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/servizi/automazioni-ai",
        label: "Automazioni e AI",
      },
      {
        href: "/servizi/portali-clienti",
        label: "Portali clienti",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "CRM su misura",
        href: "/servizi/crm-su-misura",
      },
    ],
  },
  "software-gestionali": {
    path: "servizi/software-gestionali",
    metaTitle: "Software gestionali su misura per PMI e aziende",
    metaDescription:
      "Progettiamo software gestionali su misura: commesse, preventivi, magazzino e fatturazione in un'unica piattaforma agganciata al tuo sito. Richiedi una call.",
    kicker: "Software gestionali",
    h1: "Software gestionali su misura, costruiti su come lavori davvero",
    lead: "Commesse, preventivi, magazzino, fatturazione e team in un'unica piattaforma agganciata al tuo sito, non l'ennesimo foglio Excel.",
    introParagraphs: [
      "Se ogni preventivo nasce da un file copiato, ogni commessa vive in una chat diversa e lo stato del magazzino lo sa solo la persona che c'era quel giorno, non hai un problema di ordine: hai un problema di sistema. Un software gestionale su misura mette commesse, preventivi, magazzino, fatturazione e persone in un'unica piattaforma, costruita su come lavori davvero.",
      "Non partiamo da un prodotto preconfezionato a cui ti devi adattare. Partiamo dal tuo flusso reale, chi fa cosa, in che ordine e con quali documenti, e lo trasformiamo in schermate semplici che il team usa senza corsi infiniti. Poi lo agganciamo al tuo sito: una richiesta che arriva dal web entra già ordinata nel gestionale, senza ricopiature e senza occasioni dimenticate in una casella di posta.",
    ],
    sections: [
      {
        h2: "Il problema non è Excel, è averne dieci",
        paragraphs: [
          "Excel è comodo finché resta uno. Il problema arriva quando i file diventano dieci: uno per i preventivi, uno per il magazzino, uno che apre solo chi l'ha creato. I dati si sdoppiano, qualcuno lavora sulla versione vecchia e ogni fine mese si trasforma in una caccia al numero giusto.",
          "Un gestionale toglie di mezzo questa dispersione. Un solo posto dove i dati sono aggiornati per tutti, con permessi chiari su chi vede e chi modifica. Meno errori di ricopiatura, meno tempo perso a rincorrere informazioni e decisioni prese su numeri reali, non su una stima a memoria.",
        ],
        bullets: [
          "Una sola fonte aggiornata in tempo reale, uguale per tutto il team",
          "Permessi per ruolo: ognuno vede e tocca solo ciò che gli serve",
          "Storico tracciato: sai chi ha fatto cosa e quando",
        ],
      },
      {
        h2: "Commesse, preventivi, magazzino e fatturazione in un posto solo",
        paragraphs: [
          "Costruiamo il gestionale intorno ai moduli che ti servono davvero, non a un elenco di funzioni che non aprirai mai. L'obiettivo è che una commessa nasca, avanzi e si chiuda dentro lo stesso sistema, tirandosi dietro preventivo, materiali, ore e documenti senza che nessuno debba reincollare niente a mano.",
        ],
        bullets: [
          "Commesse e progetti: stato, scadenze, responsabile e avanzamento sempre visibili",
          "Preventivi e offerte: generati in pochi minuti da listini e voci ricorrenti",
          "Magazzino e materiali: carichi, scarichi e scorte sotto controllo",
          "Fatturazione: documenti pronti e collegati alle commesse giuste",
          "Team e attività: chi fa cosa, con reminder e priorità del giorno",
        ],
      },
      {
        h2: "Agganciato al tuo sito: i dati entrano già ordinati",
        paragraphs: [
          "La differenza tra un gestionale isolato e uno costruito da chi ti realizza anche il sito è tutta qui: quello che arriva dal web, una richiesta di preventivo, un ordine, una prenotazione, entra direttamente nel sistema già compilato. Niente doppio inserimento, niente 'poi lo ricopio', niente richieste che restano ferme in una mail.",
          "Lo stesso vale a valle: fatture, documenti e stato lavori possono comparire in un'area riservata per il cliente, con la stessa identità visiva del tuo sito. Un unico ecosistema, non tre strumenti scollegati tenuti insieme dalla buona volontà del team.",
        ],
      },
      {
        h2: "Su misura per il tuo settore",
        paragraphs: [
          "'Su misura' non è uno slogan: un'officina, uno studio di consulenti, un ristorante e un negozio hanno flussi diversi, e il gestionale li deve rispettare invece di forzarli in uno schema unico.",
        ],
        bullets: [
          "Officina: schede lavoro, ricambi a magazzino, preventivi e storico per veicolo o cliente",
          "Studio professionale: pratiche, scadenze, ore fatturabili e documenti per ogni cliente",
          "Ristorante: ordini, menù, turni del personale e controllo dei costi",
          "Negozio: catalogo, giacenze, ordini a fornitore e vendite in un colpo d'occhio",
        ],
      },
      {
        h2: "Gestionale o CRM? Due cose diverse",
        paragraphs: [
          "Un CRM guarda fuori: gestisce lead, trattative e follow-up del reparto vendite. Il software gestionale guarda dentro: è l'operatività quotidiana con cui produci, consegni e fatturi. Spesso convivono e si parlano, la trattativa vinta nel CRM diventa una commessa nel gestionale, ma rispondono a bisogni diversi.",
          "In pratica: se il tuo problema è 'perdo contatti e occasioni', ti serve un CRM; se è 'perdo tempo, materiali e margini nell'esecuzione', ti serve un gestionale. Molto spesso la risposta giusta è farli lavorare insieme, ed è esattamente il tipo di sistema che sappiamo costruire.",
        ],
      },
    ],
    faq: [
      {
        q: "Un gestionale su misura può davvero sostituire i miei fogli Excel?",
        a: "Sì, ed è spesso il primo motivo per cui si parte. Portiamo in un unico sistema quello che oggi è sparso su più file, preventivi, magazzino, commesse, così i dati sono aggiornati per tutti e smetti di lavorare su versioni diverse. Excel resta utile per un'analisi veloce, ma non è più il posto dove vive la tua operatività.",
      },
      {
        q: "Quanto costa un software gestionale su misura?",
        a: "Dipende da quanti processi vuoi digitalizzare e da quanti moduli servono davvero. Lavoriamo a progetto (una tantum) oppure ad abbonamento, così parti senza un grande investimento iniziale. Nella call gratuita definiamo perimetro e priorità e ti diamo un'indicazione concreta, senza sorprese.",
      },
      {
        q: "Il gestionale si collega al sito e alla fatturazione?",
        a: "Sì. Lo progettiamo agganciato al tuo sito, così richieste, ordini e prenotazioni entrano già ordinati senza doppio inserimento. Lato fatturazione prepariamo i documenti collegati alle commesse; eventuali integrazioni con software di fatturazione o contabilità le valutiamo caso per caso in base a cosa usi già.",
      },
      {
        q: "Che differenza c'è tra il vostro gestionale e un CRM?",
        a: "Il CRM gestisce le vendite: lead, trattative e follow-up. Il gestionale gestisce l'operatività interna: come produci, consegni e fatturi. Sono strumenti diversi che spesso conviene far dialogare, una trattativa vinta diventa una commessa, ma rispondono a due bisogni distinti.",
      },
      {
        q: "Il mio team dovrà seguire lunghi corsi per usarlo?",
        a: "No. Disegniamo schermate semplici, pensate su come il team lavora già, con solo le funzioni che servono davvero. L'obiettivo è che sia più comodo del metodo attuale fin dal primo giorno. Restiamo poi disponibili per aggiustamenti e supporto diretto, senza intermediari.",
      },
      {
        q: "Funziona per la mia officina, studio, ristorante o negozio?",
        a: "Sì, proprio perché non è un prodotto standard uguale per tutti. Partiamo dal flusso reale del tuo settore, schede lavoro e ricambi per un'officina, pratiche e scadenze per uno studio, turni e costi per un ristorante, giacenze e ordini per un negozio, e modelliamo il sistema su quello.",
      },
    ],
    ctaLabel: "Parliamo del tuo gestionale",
    serviceType: "Software gestionali su misura",
    related: [
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/automazioni-ai",
        label: "Automazioni e AI",
      },
      {
        href: "/software-gestionali-marche",
        label: "Software gestionali Marche",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "Software gestionali",
        href: "/servizi/software-gestionali",
      },
    ],
  },
  "automazioni-ai": {
    path: "servizi/automazioni-ai",
    metaTitle: "Automazioni e AI per aziende: meno lavoro manuale",
    metaDescription:
      "Automazioni e AI per aziende sui dati che già produci: CRM, ticket, documenti. Sintesi, priorità e risposte automatiche che liberano tempo. Scrivici.",
    kicker: "Automazioni & AI",
    h1: "Automazioni e AI per aziende che vogliono lavorare meglio",
    lead: "L'intelligenza artificiale entra dove esistono già i tuoi dati e il tuo contesto: CRM, ticket, documenti. Non una demo da mostrare, uno strumento di lavoro.",
    introParagraphs: [
      'Automazioni e AI per aziende non significa aggiungere un chatbot che risponde a caso o una funzione "intelligente" messa lì per fare scena. Significa togliere lavoro manuale ripetitivo dalle giornate del tuo team e mettere l\'intelligenza artificiale nei punti in cui esistono già informazioni: la scheda di un cliente, lo storico degli scambi, un ticket aperto, un preventivo, un documento interno.',
      "La differenza sta tutta qui: l'AI diventa davvero utile solo quando ha memoria e contesto su cui ragionare. Per questo non partiamo da una dimostrazione, ma dai dati che la tua azienda produce ogni giorno. Sintesi, classificazione e risposte automatiche costruite su quelle informazioni reali fanno risparmiare tempo, riducono le dimenticanze e lasciano alle persone le decisioni che contano.",
    ],
    sections: [
      {
        h2: "Automazioni aziendali: meno passaggi manuali, meno errori",
        paragraphs: [
          "Prima ancora dell'AI, gran parte del tempo perso in azienda dipende da passaggi ripetitivi: ricopiare dati da un form al gestionale, smistare email, aggiornare fogli, mandare a mano lo stesso follow-up. Automatizzare questi processi vuol dire farli svolgere al sistema, sempre allo stesso modo e senza dimenticanze.",
          "Costruiamo automazioni sul tuo flusso reale, non uno schema preconfezionato scaricato altrove. Il risultato è un lavoro che scorre da solo nei tratti prevedibili e chiama le persone solo dove serve giudizio.",
        ],
        bullets: [
          "Dati inseriti una volta sola e aggiornati ovunque servano",
          "Smistamento e assegnazione automatica di richieste e ticket",
          "Promemoria e follow-up che partono senza che nessuno se li ricordi",
          "Report pronti al posto del copia-incolla di fine mese",
        ],
      },
      {
        h2: "Intelligenza artificiale per aziende, dove esiste già memoria e contesto",
        paragraphs: [
          "L'AI dà il meglio quando lavora su materiale che l'azienda possiede davvero. La colleghiamo al CRM, allo storico dei clienti, ai ticket di supporto, alle offerte e ai documenti interni, così le risposte nascono da informazioni vere e non da testo generico inventato sul momento.",
          "Su questa base fa tre cose molto concrete: sintetizza, cioè riassume una conversazione lunga o un documento in pochi punti; classifica, cioè assegna categoria, priorità o destinatario a una richiesta; e prepara risposte, cioè scrive bozze che una persona controlla e invia. L'automazione muove il lavoro, il controllo resta tuo.",
        ],
      },
      {
        h2: "Esempi concreti, per settore",
        paragraphs: [
          "Non servono scenari fantascientifici per capire il valore. Bastano situazioni che quasi ogni attività riconosce nella propria giornata:",
        ],
        bullets: [
          "Un'officina che riceve richieste di preventivo su più canali: il sistema le raccoglie, le riassume e le mette in coda con i dati già compilati.",
          "Uno studio di consulenti che accumula email e pratiche: sintesi automatica dei fascicoli e ricerca rapida su tutto lo storico.",
          "Un negozio o un e-commerce con molte domande ricorrenti: risposte pronte basate sul catalogo reale e sulle condizioni dell'attività.",
          "Un team commerciale sommerso di contatti: classificazione per priorità e riassunto dello storico prima di ogni chiamata.",
        ],
      },
      {
        h2: "Come partiamo: dai dati che hai già, non da una promessa",
        paragraphs: [
          "Il primo passo non è scegliere un modello di AI, ma guardare come lavori adesso e dove si perde tempo. Da lì individuiamo i punti in cui un'automazione o l'intelligenza artificiale portano un vantaggio concreto e misurabile, e cominciamo da quelli, non da tutto insieme.",
          "Colleghiamo il sistema agli strumenti che usi già, senza costringerti a buttare via tutto e ricominciare. L'AI viene istruita sul tuo contesto e resta sotto controllo: i passaggi delicati passano da una persona, il sistema si occupa di preparare e ordinare il lavoro.",
        ],
      },
      {
        h2: "Su misura, competitivo e senza grande investimento iniziale",
        paragraphs: [
          "Automazioni e AI non sono un lusso riservato alle grandi aziende. Le costruiamo con uno stack moderno (Next.js) e le dimensioniamo sulla tua realtà, così anche una PMI può permettersi strumenti che di solito sembrano fuori portata.",
          "Lavoriamo a progetto oppure ad abbonamento, con un unico interlocutore diretto: parli con chi costruisce davvero, non con una catena di intermediari. Un progetto alla volta e risposta entro 24 ore.",
        ],
      },
    ],
    faq: [
      {
        q: "L'AI può inventare risposte sbagliate?",
        a: "Il rischio esiste solo quando l'AI risponde \"a vuoto\", senza dati su cui appoggiarsi. Noi la ancoriamo ai tuoi contenuti reali (CRM, documenti, storico) e, per i passaggi delicati, prevediamo sempre una revisione umana prima dell'invio.",
      },
      {
        q: "Che dati servono per partire con automazioni e AI?",
        a: "Bastano le informazioni che già produci: schede clienti nel CRM, ticket, email, preventivi, documenti e procedure. Più il contesto è ordinato, più le risposte sono precise; se serve, ti aiutiamo prima a mettere ordine.",
      },
      {
        q: "Funziona con il gestionale o il CRM che uso già?",
        a: "Nella maggior parte dei casi sì: colleghiamo automazioni e AI agli strumenti esistenti. Se il tuo sistema è chiuso o poco integrabile, valutiamo insieme l'alternativa più sensata, senza forzature né riscritture inutili.",
      },
      {
        q: "In quanto tempo si vedono i primi risultati?",
        a: "Partiamo da un ambito circoscritto e ad alto impatto, così i primi benefici sono visibili in fretta. Estendiamo le automazioni agli altri processi solo quando il primo funziona davvero nella pratica.",
      },
      {
        q: "I dati della mia azienda restano al sicuro?",
        a: "Sì. Lavoriamo sui tuoi dati con l'obiettivo di tenerli nel tuo perimetro e usarli solo per gli scopi concordati. Definiamo insieme dove risiedono le informazioni e chi può accedervi.",
      },
      {
        q: "Quanto costa? A progetto o ad abbonamento?",
        a: "Entrambe le formule sono possibili: un progetto una tantum oppure un abbonamento, se preferisci una spesa distribuita e un'evoluzione continua. Dimensioniamo tutto sulla tua realtà, senza un grande investimento iniziale.",
      },
    ],
    ctaLabel: "Parliamo di cosa automatizzare",
    serviceType: "Automazioni e intelligenza artificiale",
    related: [
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/servizi/portali-clienti",
        label: "Portali clienti",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "Automazioni e AI",
        href: "/servizi/automazioni-ai",
      },
    ],
  },
  "portali-clienti": {
    path: "servizi/portali-clienti",
    metaTitle: "Portali clienti e aree riservate su misura per aziende",
    metaDescription:
      "Realizziamo portali clienti e aree riservate su misura: accessi sicuri, documenti, stato lavori e ticket, sempre coerenti col tuo brand. Scrivici ora.",
    kicker: "Portali clienti su misura",
    h1: "Portali clienti e aree riservate costruiti sul tuo modo di lavorare",
    lead: "Un'area web riservata dove clienti e team trovano documenti, stato dei lavori, ticket e comunicazioni: accessi e ruoli sicuri, raggiungibile da qualsiasi dispositivo.",
    introParagraphs: [
      "Dopo il primo contatto il rapporto con un cliente non finisce: iniziano documenti da scambiare, richieste da gestire, lavori da seguire. Un'area riservata trasforma tutto questo in un unico spazio ordinato, dove ognuno accede alle proprie informazioni senza rincorrere email, messaggi e telefonate.",
      "Progettiamo portali clienti e aree riservate su misura, cuciti sul tuo processo reale e sulla tua identità visiva. Niente pannello anonimo preso da un template: un ambiente che continua il tuo brand e che il cliente usa volentieri perché è chiaro, coerente e sempre a portata di mano.",
      "Il risultato è meno lavoro manuale per il tuo team e un'immagine più solida verso l'esterno, con accessi protetti e ruoli definiti fin dal primo giorno.",
    ],
    sections: [
      {
        h2: "Accessi e ruoli sicuri: ognuno vede solo ciò che gli serve",
        paragraphs: [
          "In un'area riservata seria il controllo degli accessi non è un dettaglio, è la base. Ogni persona entra con le proprie credenziali e vede soltanto ciò che le compete: un cliente i suoi documenti e le sue pratiche, un collaboratore le sue commesse, il team interno la vista completa. I permessi sono definiti per ruolo, così informazioni sensibili e sezioni operative restano separate senza confusione e senza accessi lasciati aperti per distrazione.",
        ],
        bullets: [
          "Login personale per ogni cliente, collaboratore o membro del team",
          "Permessi per ruolo: sei tu a decidere chi vede cosa",
          "Sezioni sensibili tenute separate da quelle condivise",
          "Accessi che puoi aggiornare o revocare in qualsiasi momento",
        ],
      },
      {
        h2: "Documenti, stato dei lavori e ticket, tutto in un posto",
        paragraphs: [
          "Il cuore di un portale clienti è dare risposte prima ancora che vengano chieste. Il cliente entra e trova i documenti aggiornati, l'avanzamento di quello che stai facendo per lui e un canale per aprire richieste o segnalazioni. Le comunicazioni restano tracciate e collegate alla pratica giusta, non disperse tra caselle di posta e chat diverse. Meno 'a che punto siamo?', più autonomia per chi ti sceglie.",
        ],
        bullets: [
          "Documenti e file condivisi, sempre nella versione aggiornata",
          "Stato dei lavori e avanzamento visibili in chiaro",
          "Ticket e richieste con storico e stato di lavorazione",
          "Comunicazioni ordinate, legate al cliente e alla pratica",
        ],
      },
      {
        h2: "Un'area riservata coerente col tuo brand, non un tool incollato",
        paragraphs: [
          "La parte privata di un sito viene spesso trattata come un ripostiglio: funziona, ma sembra appartenere a un altro mondo rispetto alla home. Noi la costruiamo come continuazione naturale del tuo brand, con la stessa cura grafica e la stessa chiarezza di lettura. Il cliente non percepisce un salto tra la vetrina che lo ha convinto e lo strumento che poi usa ogni giorno: percepisce un'unica azienda, curata dall'inizio alla fine. È una differenza che pesa sulla fiducia e sul valore percepito.",
        ],
      },
      {
        h2: "Accessibile da qualsiasi dispositivo, senza installare nulla",
        paragraphs: [
          "L'area riservata vive sul web: si apre dal browser di un computer, di un tablet o di uno smartphone, senza scaricare programmi e senza passare da uno store. L'interfaccia si adatta allo schermo, così un cliente può controllare un documento dal telefono mentre è fuori e il tuo team può lavorare comodamente da postazione. Un unico indirizzo, protetto da login, raggiungibile da dove serve, quando serve.",
        ],
      },
      {
        h2: "Per quali attività è utile un portale clienti",
        paragraphs: [
          "Un'area riservata dà valore ovunque ci sia un rapporto che continua nel tempo. Uno studio di consulenti può condividere pratiche, scadenze e documenti in modo ordinato; un'officina o un'impresa di servizi può mostrare al cliente lo stato di un intervento e la relativa documentazione; un fornitore B2B o un'agenzia può dare a ogni cliente la sua area con report, materiali e richieste. In tutti i casi il beneficio è lo stesso: meno lavoro ripetitivo per rispondere alle solite domande, più ordine interno e un'immagine professionale che si nota.",
        ],
        bullets: [
          "Studi e consulenti: pratiche, scadenze e documenti condivisi",
          "Officine e servizi: stato interventi e documentazione a disposizione",
          "B2B e agenzie: un'area dedicata per ogni cliente con report e materiali",
        ],
      },
    ],
    faq: [
      {
        q: "Che differenza c'è tra un'area riservata e un portale clienti?",
        a: "In pratica sono la stessa cosa vista da due lati. 'Area riservata' indica la parte del sito protetta da login; 'portale clienti' indica cosa ci trovi dentro: documenti, stato dei lavori, ticket e comunicazioni pensati per il cliente. Noi progettiamo entrambe le cose insieme, su misura sul tuo processo.",
      },
      {
        q: "I miei clienti devono installare un'app per accedere?",
        a: "No. Il portale è un'area web: si apre dal browser con un indirizzo e un login, da computer, tablet o smartphone. Non serve scaricare nulla né passare da uno store, così l'accesso è immediato per chiunque.",
      },
      {
        q: "Posso decidere chi vede cosa?",
        a: "Sì. Gli accessi sono organizzati per ruolo: definiamo insieme quali sezioni e documenti sono visibili a ciascun tipo di utente, dal singolo cliente al team interno. Un accesso si può aggiornare o revocare quando vuoi.",
      },
      {
        q: "I documenti e i dati dei clienti sono al sicuro?",
        a: "Sì. Ogni accesso è protetto da credenziali personali e i contenuti sono visibili solo a chi ne ha i permessi. Costruiamo l'area riservata con attenzione alla sicurezza e su uno stack moderno, così i dati restano separati e sotto controllo.",
      },
      {
        q: "Si può collegare al sito o al gestionale che ho già?",
        a: "Nella maggior parte dei casi sì. Il portale può nascere insieme al tuo sito o affiancarsi a un CRM o gestionale esistente, così i dati non vanno inseriti due volte a mano. Valutiamo le integrazioni possibili in base agli strumenti che usi già.",
      },
      {
        q: "Quanto costa e come si paga?",
        a: "Dipende dalle funzioni che ti servono davvero. Lavoriamo su misura e con formule flessibili, a progetto oppure ad abbonamento, così puoi partire senza un grande investimento iniziale. Il preventivo lo costruiamo dopo aver capito il tuo caso.",
      },
    ],
    ctaLabel: "Parliamo della tua area riservata",
    serviceType: "Portali clienti e aree riservate",
    related: [
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/servizi/automazioni-ai",
        label: "Automazioni e AI",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Servizi",
        href: "/servizi",
      },
      {
        label: "Portali clienti",
        href: "/servizi/portali-clienti",
      },
    ],
  },
};

export const cityPages: Record<string, LandingContent> = {
  "agenzia-web-porto-sant-elpidio": {
    path: "agenzia-web-porto-sant-elpidio",
    metaTitle: "Agenzia web Porto Sant'Elpidio: siti su misura ed e-commerce",
    metaDescription:
      "Agenzia web con sede a Porto Sant'Elpidio (FM): siti su misura, e-commerce, CRM e SEO per PMI del Fermano. Parli col fondatore. Chiedi un preventivo.",
    kicker: "La nostra sede",
    h1: "Agenzia web a Porto Sant'Elpidio",
    lead: "Siamo di casa nel Fermano: sede in Via Garda 24, a due passi dal centro e dalla costa, e lavoriamo con tutta Italia da remoto.",
    introParagraphs: [
      "Wowspace ha la sua sede proprio qui, a Porto Sant'Elpidio, in Via Garda 24. Non siamo un indirizzo di comodo o una casella email: se vuoi, ci vediamo di persona, ci stringiamo la mano e parliamo del tuo progetto davanti a un caffè. È il vantaggio di scegliere un'agenzia web che vive lo stesso territorio, conosce il tessuto produttivo del Fermano e capisce come lavorano le imprese della costa.",
      "Che tu abbia un calzaturificio, un negozio in centro, uno stabilimento sulla riviera o uno studio professionale, costruiamo siti, e-commerce e software su misura, mai su modelli preconfezionati. Parli direttamente con Michael Moretti, il fondatore, seguiamo un progetto alla volta e rispondiamo entro 24 ore.",
    ],
    sections: [
      {
        h2: "Un'agenzia web che conosce il Fermano e il distretto calzaturiero",
        paragraphs: [
          "Porto Sant'Elpidio è un pezzo di Marche che lavora davvero. Siamo nel cuore del distretto calzaturiero e manifatturiero del Fermano, fatto di calzaturifici, tomaifici, aziende di componentistica e tanta subfornitura di qualità che spesso vende in tutta Europa ma online si presenta molto meno di quanto meriti. A questo si aggiunge la costa adriatica, con negozi, ristoranti, stabilimenti balneari, strutture ricettive e attività stagionali che dal web si giocano una fetta importante di clienti.",
          "Conoscere questo tessuto cambia il modo di lavorare. Sappiamo che un'azienda B2B che fa subfornitura ha esigenze diverse da un negozio di calzature al dettaglio o da un lido che deve riempire la stagione. Per questo non partiamo da un template, ma dal tuo mercato, dal tuo cliente e dal tuo processo, per costruire qualcosa che ti faccia percepire come una realtà solida e ti aiuti concretamente a vendere.",
        ],
      },
      {
        h2: "I servizi digitali che realizziamo a Porto Sant'Elpidio",
        paragraphs: [
          "Dalla presenza online al gestionale interno, copriamo tutto quello che serve a un'impresa per stare online in modo serio. Ecco cosa realizziamo per le imprese della zona.",
        ],
        bullets: [
          "Siti web su misura, veloci e curati, pensati per far percepire subito il tuo livello",
          "E-commerce per vendere prodotti, calzature comprese, in Italia e all'estero senza attriti",
          "CRM su misura e software gestionali cuciti sul tuo processo reale, non pacchetti standard",
          "Automazioni e AI per togliere il lavoro ripetitivo a chi vende e a chi gestisce",
          "Portali clienti e aree riservate che restano coerenti con il tuo brand",
          "SEO, grafica e brand identity per farti trovare e riconoscere",
        ],
      },
      {
        h2: "Dalla costa a tutta Italia: di persona qui, da remoto ovunque",
        paragraphs: [
          "Avere la sede in zona significa che, se sei di Porto Sant'Elpidio, Fermo, Sant'Elpidio a Mare, Civitanova o dei comuni vicini, possiamo incontrarci di persona quando serve: all'avvio del progetto, nei momenti decisivi, quando è più comodo vedersi che scriversi. Per molte imprese del territorio poter guardare in faccia chi realizza il loro sito fa la differenza.",
          "Allo stesso tempo lavoriamo con clienti in tutta Italia da remoto, con lo stesso metodo e la stessa cura. La sede in loco è un vantaggio in più, non un limite: la vicinanza quando ti serve, la flessibilità del digitale sempre.",
        ],
      },
      {
        h2: "Perché scegliere Wowspace come agenzia web di zona",
        paragraphs: [
          "Non siamo una catena di reparti e account manager. Siamo un'agenzia che lavora in modo diretto e trasparente, dall'inizio alla consegna.",
        ],
        bullets: [
          "Parli direttamente con Michael Moretti, il fondatore: niente intermediari, niente rimpalli",
          "Seguiamo un progetto alla volta, così il tuo non finisce in coda",
          "Rispondiamo entro 24 ore",
          "Tutto costruito su misura, mai template riciclati",
          "A progetto (una tantum) o ad abbonamento, senza un grande investimento iniziale",
        ],
      },
      {
        h2: "Come iniziamo",
        paragraphs: [
          "Iniziare è semplice. Ci racconti cosa fai e dove vuoi arrivare, noi ti diciamo con onestà cosa ha senso costruire e in che ordine, senza venderti cose inutili. Poi ricevi un preventivo chiaro e decidi con calma.",
          "Ci trovi in Via Garda 24 a Porto Sant'Elpidio (FM), al +39 351 818 1560 o all'indirizzo wowspaceweb@gmail.com. Se sei di passaggio in zona, possiamo anche vederci di persona.",
        ],
      },
    ],
    faq: [
      {
        q: "Dove si trova la vostra agenzia web a Porto Sant'Elpidio?",
        a: "In Via Garda 24, 63821 Porto Sant'Elpidio (FM). È la nostra sede reale: puoi venire a trovarci o fissare un incontro quando preferisci.",
      },
      {
        q: "Lavorate solo con aziende di Porto Sant'Elpidio?",
        a: "No. Abbiamo sede qui e incontriamo volentieri di persona le imprese del Fermano e della costa, ma seguiamo clienti in tutta Italia da remoto con lo stesso metodo.",
      },
      {
        q: "Realizzate siti ed e-commerce per calzaturifici e aziende manifatturiere?",
        a: "Sì. Conosciamo il distretto calzaturiero del Fermano e costruiamo siti B2B, cataloghi ed e-commerce pensati anche per presentarsi e vendere all'estero.",
      },
      {
        q: "Fate siti anche per negozi, ristoranti e attività della costa?",
        a: "Certo. Siti, prenotazioni, e-commerce e presenza locale per commercio, ristorazione, strutture ricettive e attività stagionali dell'Adriatico.",
      },
      {
        q: "Con chi parlo durante il progetto?",
        a: "Con Michael Moretti, il fondatore. Niente catena di account manager: segui il progetto direttamente con chi lo realizza, e la risposta arriva entro 24 ore.",
      },
      {
        q: "Quanto costa un sito e come si paga?",
        a: "Dipende dal progetto. Lavoriamo a progetto (una tantum) o ad abbonamento, senza un grande investimento iniziale. Ti diamo un preventivo chiaro dopo una prima chiacchierata.",
      },
    ],
    ctaLabel: "Parliamo del tuo progetto",
    serviceType: "Agenzia web",
    related: [
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/web-agency-fermo",
        label: "Web agency Fermo",
      },
      {
        href: "/siti-web-civitanova-marche",
        label: "Siti web Civitanova Marche",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Agenzia web Porto Sant'Elpidio",
        href: "/agenzia-web-porto-sant-elpidio",
      },
    ],
    areaServed: "Porto Sant'Elpidio",
  },
  "web-agency-fermo": {
    path: "web-agency-fermo",
    metaTitle: "Web agency a Fermo: siti, CRM e gestionali su misura",
    metaDescription:
      "Web agency a Fermo e provincia: siti web, e-commerce, CRM e gestionali su misura per le PMI del territorio. Sede vicina a Porto Sant'Elpidio. Scrivici.",
    kicker: "Fermo e provincia",
    h1: "Web agency a Fermo: siti e software su misura per il tuo lavoro",
    lead: "Siamo a Porto Sant'Elpidio, nella stessa provincia FM: un partner tecnico vicino per aziende, artigiani e negozi del Fermano.",
    introParagraphs: [
      "Fermo è il capoluogo di una provincia piccola ma densa di imprese: il distretto calzaturiero, la lavorazione della pelle, le aziende del cappello dell'entroterra, l'agroalimentare e il vino dei colli, il commercio e il turismo della costa adriatica. Sono realtà che spesso hanno un prodotto forte, ma una presenza online che non lo racconta all'altezza.",
      "Wowspace è una web agency con sede a pochi minuti da Fermo. Costruiamo siti web su misura, e-commerce, CRM e gestionali cuciti sul tuo processo, più automazioni e aree riservate. Niente template riciclati: progetti pensati per farti percepire livello e, soprattutto, per vendere.",
      "Parli direttamente con Michael Moretti, il fondatore, senza passare da una catena di account manager. Un progetto alla volta, seguito con attenzione, e risposta entro 24 ore.",
    ],
    sections: [
      {
        h2: "Un partner tecnico vicino, nel cuore del distretto fermano",
        paragraphs: [
          "Il tessuto economico del Fermano è fatto di manifattura e artigianato: il distretto calzaturiero che si estende tra Fermo, Sant'Elpidio a Mare e Montegranaro, la componentistica e la pelletteria che gli ruotano intorno, il distretto del cappello tra Montappone e Massa Fermana, le cantine e i produttori dei colli, il commercio e le attività turistiche lungo la costa.",
          "Avere una web agency nella stessa provincia cambia il modo di lavorare: possiamo incontrarci di persona quando serve, capire davvero come funziona la tua attività e restare reperibili. Da Porto Sant'Elpidio raggiungiamo Fermo e i comuni vicini in pochi minuti, senza il distacco di un fornitore a centinaia di chilometri.",
        ],
        bullets: [
          "Calzaturifici, pelletterie e componentistica del distretto",
          "Aziende del cappello e artigianato dell'entroterra",
          "Cantine e produttori agroalimentari dei colli",
          "Negozi, studi professionali e attività turistiche della costa",
        ],
      },
      {
        h2: "Realizzazione di siti web a Fermo, cuciti sui tuoi obiettivi",
        paragraphs: [
          "Ogni sito parte dal tuo obiettivo, non da un tema comprato. Curiamo design, testi e struttura perché chi arriva capisca in pochi secondi cosa fai e perché scegliere te, poi lo accompagniamo verso il contatto, la richiesta di preventivo o l'acquisto. Lavoriamo con stack moderno (Next.js): pagine veloci, perfette da telefono e pronte a posizionarsi.",
          "Che ti serva un sito vetrina che dia autorevolezza a un'azienda manifatturiera, un e-commerce per vendere anche fuori regione o un catalogo B2B da mostrare ai tuoi rivenditori, il risultato è lo stesso: bello da vedere e fatto per vendere.",
        ],
      },
      {
        h2: "Non solo il sito: CRM, gestionali e automazioni",
        paragraphs: [
          "Un sito da solo spesso non basta. Aiutiamo le imprese del territorio a mettere ordine nel lavoro quotidiano, con strumenti costruiti attorno al tuo modo di operare. Così smetti di rincorrere fogli di calcolo e caselle email sparse, e ogni informazione sta al suo posto.",
          "Possiamo partire dal sito e far crescere il sistema nel tempo, un pezzo alla volta, senza rivoluzionare tutto in un colpo solo.",
        ],
        bullets: [
          "CRM su misura per seguire contatti, preventivi e clienti",
          "Gestionali agganciati al sito per ordini, magazzino e listini",
          "Automazioni e AI dove fanno davvero risparmiare tempo",
          "Aree riservate e portali per clienti o rivenditori",
        ],
      },
      {
        h2: "Farsi trovare a Fermo e in provincia",
        paragraphs: [
          "Un bel sito che nessuno trova serve a poco. Curiamo la SEO perché la tua attività compaia quando qualcuno cerca i tuoi prodotti o servizi nella zona, con contenuti chiari e una struttura tecnica solida. Niente promesse magiche o numeri gonfiati: lavoro concreto che dà risultati nel tempo e su cui puoi contare.",
        ],
      },
      {
        h2: "Come lavoriamo con le imprese del Fermano",
        paragraphs: [
          "Parli direttamente con Michael Moretti, il fondatore: niente catena di intermediari, niente rimpalli. Seguiamo un progetto alla volta, così ha tutta l'attenzione che merita, e rispondiamo entro 24 ore.",
          "Puoi partire con un investimento sostenibile, a progetto (una tantum) oppure ad abbonamento, senza dover mettere sul tavolo una cifra enorme all'inizio. Se hai un'idea o anche solo un problema da risolvere, scrivici a wowspaceweb@gmail.com o chiama il +39 351 818 1560: capiamo insieme se possiamo esserti utili.",
        ],
      },
    ],
    faq: [
      {
        q: "Avete una sede vicino a Fermo?",
        a: "La nostra sede è in Via Garda 24 a Porto Sant'Elpidio (FM), a pochi minuti da Fermo e nella stessa provincia. Seguiamo clienti in tutto il Fermano e possiamo incontrarci di persona quando è utile.",
      },
      {
        q: "Quanto costa un sito web per un'azienda di Fermo?",
        a: "Non usiamo listini fissi, perché ogni progetto è su misura. Puoi scegliere tra pagamento a progetto (una tantum) o un abbonamento, senza un grande investimento iniziale. Dopo una prima chiamata ti diamo un preventivo chiaro.",
      },
      {
        q: "Lavorate con i calzaturifici e le aziende manifatturiere del distretto?",
        a: "Sì. Realizziamo siti, cataloghi B2B, e-commerce, CRM e gestionali per le PMI manifatturiere e artigiane del Fermano, dal calzaturiero al cappello fino all'agroalimentare e alle cantine.",
      },
      {
        q: "Fate solo siti oppure anche gestionali e CRM?",
        a: "Entrambi. Oltre ai siti costruiamo CRM su misura, software gestionali agganciati al sito, automazioni e aree riservate. Spesso si parte dal sito e poi si fa crescere il sistema un pezzo alla volta.",
      },
      {
        q: "Con chi parlo durante il progetto?",
        a: "Direttamente con Michael Moretti, il fondatore, senza catena di account manager. Seguiamo un progetto alla volta e rispondiamo entro 24 ore.",
      },
      {
        q: "Aiutate anche a farsi trovare su Google nella zona di Fermo?",
        a: "Sì. Curiamo la SEO e la visibilità locale con contenuti chiari e una struttura tecnica solida, così la tua attività compare quando la cercano a Fermo e in provincia.",
      },
    ],
    ctaLabel: "Parliamo del tuo progetto",
    serviceType: "Web agency",
    related: [
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/agenzia-web-porto-sant-elpidio",
        label: "Agenzia web Porto Sant'Elpidio",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Web agency Fermo",
        href: "/web-agency-fermo",
      },
    ],
    areaServed: "Fermo",
  },
  "siti-web-civitanova-marche": {
    path: "siti-web-civitanova-marche",
    // Keyword-exact sulla query che vincono i competitor ("realizzazione siti
    // web civitanova marche") + secondo intento "web agency" nel title, come la
    // pagina benchmark di Creativemotions. Lo slug resta: title/H1 pesano di
    // più e un redirect ora brucerebbe più di quel che rende.
    metaTitle: "Realizzazione siti web Civitanova Marche | Web agency",
    metaDescription:
      "Web agency a due passi da Civitanova Marche: realizzazione siti web ed e-commerce su misura per negozi, showroom e ristoranti. Parliamone entro 24h.",
    kicker: "Per commercio e retail",
    h1: "Realizzazione siti web a Civitanova Marche, su misura per chi vende",
    lead: "Una web agency a pochi minuti da Civitanova: siti ed e-commerce su misura per negozi, showroom, ristoranti e attività di servizi, con CRM e gestionali per far girare tutto senza attriti.",
    introParagraphs: [
      "Civitanova Marche è uno dei motori commerciali della costa adriatica: negozi lungo il corso, showroom di calzature e abbigliamento legati al distretto, ristoranti e locali sul lungomare, attività di servizi che ruotano intorno al porto e al turismo estivo. In un contesto così competitivo il sito non è un biglietto da visita statico, ma la prima vetrina che le persone vedono prima ancora di entrare.",
      "Wowspace è a pochi minuti da Civitanova e realizza siti web ed e-commerce su misura per chi qui ci lavora davvero. Niente template riciclati: ogni progetto nasce dalla tua attività, dai tuoi prodotti e dal modo in cui vendi, con un risultato bello da vedere e pensato per far percepire subito il livello giusto, senza un grande investimento iniziale.",
    ],
    sections: [
      {
        h2: "Il web pensato per il commercio e il retail di Civitanova",
        paragraphs: [
          "Civitanova è una città che vive di vendita: le vie centrali piene di negozi, gli showroom di calzature e abbigliamento, i ristoranti e i locali del lungomare, le attività che ruotano intorno al porto e alla stagione turistica. Qui la concorrenza si vede a occhio nudo e chi comunica male online resta indietro, anche quando in negozio offre di più.",
          "Per questo progettiamo pagine che mostrano subito il valore della tua attività: immagini curate, testi chiari, caricamento rapido e una struttura pensata per chi ti cerca dal telefono, magari mentre passeggia in centro o sceglie dove cenare. Un sito che sembra all'altezza del tuo punto vendita, non un ripiego messo lì per dovere.",
        ],
        bullets: [
          "Negozi e boutique che vogliono farsi trovare da residenti e turisti",
          "Showroom di calzature, abbigliamento e accessori",
          "Ristoranti, bar e locali del lungomare con prenotazioni e menù",
          "Studi professionali e attività di servizi della zona",
        ],
      },
      {
        h2: "Vetrine online e cataloghi che convincono",
        paragraphs: [
          "Non tutti vendono direttamente online, ma tutti hanno bisogno di una vetrina che convinca: cataloghi consultabili, collezioni, prenotazioni, richieste di preventivo. Curiamo la parte visiva perché il tuo marchio si veda bene su ogni schermo, e la parte pratica perché ogni contatto arrivi dove deve, pronto da lavorare.",
          "Se invece vuoi proprio vendere online, all'e-commerce abbiamo dedicato una pagina a parte — la trovi tra i collegamenti qui sotto — dove raccontiamo come costruiamo negozi online su misura per calzature, moda e retail, integrati con magazzino e gestionale.",
        ],
      },
      {
        h2: "CRM e gestionali su misura per non perdere clienti e ordini",
        paragraphs: [
          "Un sito che porta contatti serve a poco se poi le richieste si perdono tra fogli di calcolo e messaggi sparsi. Realizziamo CRM e gestionali su misura che raccolgono clienti, ordini, appuntamenti e preventivi in un solo posto, con automazioni che tolgono lavoro manuale: promemoria, conferme, follow-up.",
          "Per un negozio, uno showroom o un ristorante significa rispondere più in fretta, ricordarsi ogni cliente e far tornare chi ha già comprato. Colleghiamo il gestionale al sito e all'e-commerce, così i dati parlano tra loro e tu smetti di reinserire le stesse informazioni a mano.",
        ],
      },
      {
        h2: "Una web agency vicina, un solo interlocutore, un progetto alla volta",
        paragraphs: [
          "Con Wowspace parli direttamente con Michael Moretti, il fondatore: niente catena di account manager, niente rimbalzi tra reparti. Seguiamo un progetto alla volta, con la giusta attenzione, e rispondiamo entro 24 ore. Costruiamo tutto su stack moderno (Next.js), così il sito resta veloce, sicuro e facile da far crescere nel tempo.",
          "Lavoriamo a progetto oppure ad abbonamento, in modo che tu possa partire senza un grande investimento iniziale e sapere fin dall'inizio cosa stai pagando. Se hai già un sito datato o lento, lo ricostruiamo tenendo ciò che funziona e correggendo ciò che frena i risultati.",
        ],
      },
      {
        h2: "Farsi trovare su Google a Civitanova e sulla costa",
        paragraphs: [
          "Un bel sito deve anche essere trovato. Curiamo la SEO perché chi cerca la tua attività o i tuoi prodotti sulla costa maceratese arrivi da te e non dal concorrente della via accanto. Struttura pulita, velocità, contenuti giusti per il tuo settore: sono le basi per posizionarsi in modo credibile e duraturo, senza scorciatoie che Google punisce.",
        ],
      },
    ],
    faq: [
      {
        q: "Quanto costa un sito web a Civitanova Marche?",
        a: "Dipende da cosa ti serve: una vetrina professionale, un e-commerce o un gestionale hanno impegni diversi. Lavoriamo a progetto oppure ad abbonamento, così puoi partire senza un grande investimento iniziale. Dopo una prima chiacchierata ti diamo una cifra chiara, senza sorprese.",
      },
      {
        q: "Fate e-commerce per negozi di calzature e abbigliamento?",
        a: "Sì. Civitanova vive di moda e retail, e costruiamo negozi online su misura per calzature, abbigliamento e accessori, con schede prodotto curate, gestione di taglie e varianti e un look che valorizza il marchio. L'idea è vendere online mantenendo lo stesso livello percepito del punto vendita.",
      },
      {
        q: "Lavorate solo con attività di Civitanova?",
        a: "No, seguiamo aziende in tutte le Marche e oltre. Essere a pochi minuti da Civitanova ci permette però, quando serve, di vederci di persona e capire davvero l'attività prima di progettare qualcosa.",
      },
      {
        q: "Con chi parlo durante il progetto?",
        a: "Direttamente con Michael Moretti, il fondatore. Niente catena di account manager: un solo interlocutore che segue il tuo progetto dall'inizio alla fine, con risposta entro 24 ore.",
      },
      {
        q: "Potete rifare il mio sito se è vecchio o lento?",
        a: "Sì. Molte attività hanno un sito datato, lento o poco adatto ai telefoni. Lo ricostruiamo con tecnologia moderna (Next.js), più veloce e ordinato, mantenendo ciò che funziona e migliorando ciò che oggi frena vendite e contatti.",
      },
      {
        q: "Aiutate anche a farsi trovare su Google?",
        a: "Sì. Curiamo la SEO perché chi cerca la tua attività o i tuoi prodotti sulla costa maceratese ti trovi. Un sito veloce e ben strutturato è la base per posizionarsi, insieme ai contenuti giusti per il tuo settore.",
      },
    ],
    ctaLabel: "Parliamo del tuo progetto",
    serviceType: "Realizzazione siti web",
    // Cross-link nel cluster locale (equity tra le landing città) oltre ai
    // servizi: e-commerce locale e la "casa madre" Porto Sant'Elpidio.
    related: [
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/realizzazione-ecommerce-civitanova-marche",
        label: "E-commerce Civitanova Marche",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/agenzia-web-porto-sant-elpidio",
        label: "Agenzia web Porto Sant'Elpidio",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Siti web Civitanova Marche",
        href: "/siti-web-civitanova-marche",
      },
    ],
    areaServed: "Civitanova Marche",
  },
  // Landing a intento esatto "e-commerce + città": la SERP è occupata quasi
  // solo da doorway page programmatiche (nessun competitor ha una pagina vera
  // su questo intento). Contenuto solo e-commerce, distinto dalla landing
  // siti-web-civitanova per non cannibalizzare.
  "realizzazione-ecommerce-civitanova-marche": {
    path: "realizzazione-ecommerce-civitanova-marche",
    metaTitle: "Realizzazione e-commerce Civitanova Marche e Macerata",
    metaDescription:
      "Realizzazione e-commerce su misura a Civitanova Marche: negozi online per calzature, moda e retail, integrati con magazzino e gestionale. Parliamone entro 24h.",
    kicker: "Vendere online, fatto bene",
    h1: "Realizzazione e-commerce a Civitanova Marche",
    lead: "Negozi online su misura per calzature, moda e retail della costa maceratese: schede prodotto curate, taglie e varianti sotto controllo, magazzino e spedizioni integrati col gestionale.",
    introParagraphs: [
      'A Civitanova Marche vendere è un mestiere che si respira: il distretto della calzatura, gli showroom di abbigliamento e accessori, i negozi del corso. Ma la vetrina fisica oggi arriva fino a dove arriva la strada; l\'e-commerce la porta ovunque. Il punto non è "aprire un negozio online": è aprirne uno che venda davvero, senza trasformare le tue giornate in assistenza clienti e fogli di calcolo.',
      "Wowspace realizza e-commerce su misura per le attività di Civitanova e della provincia di Macerata. Non installiamo un template con il tuo logo sopra: progettiamo il negozio online intorno ai tuoi prodotti, ai tuoi margini e a come lavori davvero — dal caricamento del catalogo alla gestione di ordini, resi e spedizioni.",
    ],
    sections: [
      {
        h2: "E-commerce per calzature e moda: taglie, varianti, stagioni",
        paragraphs: [
          "Vendere scarpe e abbigliamento online ha regole sue: taglie e calzate, varianti di colore, collezioni che ruotano a stagione, foto che devono rendere il prodotto come in negozio. Un e-commerce generico su questi punti si inceppa; noi li progettiamo dall'inizio, perché è il pane del distretto in cui lavoriamo.",
          "Gestione di taglie e disponibilità per variante, guide alle taglie per ridurre i resi, schede prodotto pensate per Google e per chi compra dal telefono: l'obiettivo è un negozio online che tenga il livello percepito della vetrina fisica e lo porti fuori città.",
        ],
        bullets: [
          "Calzaturifici e marchi che vogliono vendere direttamente al cliente finale",
          "Negozi e boutique che affiancano l'online al punto vendita",
          "Showroom B2B con listini e cataloghi riservati ai rivenditori",
          "Attività locali con prodotti tipici da spedire in tutta Italia",
        ],
      },
      {
        h2: "Integrato col magazzino e col gestionale, non un mondo a parte",
        paragraphs: [
          "L'errore più comune è trattare l'e-commerce come un'isola: il catalogo caricato due volte, le giacenze aggiornate a mano, gli ordini ricopiati nel gestionale. Dopo un mese diventa un secondo lavoro e la voglia passa. Noi costruiamo anche gestionali su misura, quindi l'integrazione non è un extra: è il modo normale in cui progettiamo.",
          "Giacenze allineate tra negozio fisico e online, ordini che finiscono direttamente dove li lavori, spedizioni con tracking e resi ordinati. Se un gestionale ce l'hai già, ci integriamo; se non ce l'hai, possiamo costruirlo intorno al tuo flusso.",
        ],
      },
      {
        h2: "Su misura o piattaforma? Una scelta onesta",
        paragraphs: [
          "Non tutti hanno bisogno della stessa cosa. Per alcuni progetti una piattaforma pronta è la partenza giusta; per altri — cataloghi complessi, listini B2B, integrazioni con produzione e magazzino — il su misura ripaga da subito. Te lo diciamo in modo onesto dopo aver capito volumi, margini e come lavori: vendere una tecnologia a chi non serve è il modo migliore per farsi odiare.",
          "Quello che non cambia è l'approccio: caricamento veloce, SEO curata per farsi trovare da chi cerca i tuoi prodotti, pagamenti e spedizioni configurati bene, e un pannello che riesci a usare senza chiamarci ogni volta.",
        ],
      },
      {
        h2: "Vicini davvero: Civitanova, Macerata e la costa",
        paragraphs: [
          "Siamo a Porto Sant'Elpidio, a pochi minuti da Civitanova: quando serve ci si vede di persona, si guarda il magazzino, si capisce come lavori. Per un progetto e-commerce questa differenza si sente — le scelte giuste nascono da come funziona davvero la tua attività, non da un questionario compilato online.",
        ],
      },
    ],
    faq: [
      {
        q: "Quanto costa un e-commerce a Civitanova Marche?",
        a: "Dipende da catalogo, integrazioni e da come vendi: un negozio online con poche referenze e un e-commerce integrato col magazzino sono progetti diversi. Lavoriamo a progetto o ad abbonamento, così puoi partire senza un grande investimento iniziale. Dopo una prima chiacchierata ti diamo una cifra chiara, senza sorprese.",
      },
      {
        q: "Fate e-commerce per calzature con taglie e varianti?",
        a: "Sì, è il caso che conosciamo meglio: gestione di taglie, calzate e varianti di colore, disponibilità per singola combinazione, guide alle taglie per ridurre i resi e schede prodotto curate. Il distretto calzaturiero è casa nostra.",
      },
      {
        q: "Potete integrare l'e-commerce col mio gestionale o magazzino?",
        a: "Sì. Costruiamo anche gestionali su misura, quindi l'integrazione è il nostro terreno naturale: giacenze allineate tra negozio e online, ordini che arrivano dove li lavori, spedizioni e resi ordinati. Se hai già un gestionale ci integriamo, altrimenti possiamo costruirlo noi.",
      },
      {
        q: "Meglio un e-commerce su misura o una piattaforma pronta?",
        a: "Dipende dal progetto, e te lo diciamo onestamente dopo aver capito catalogo, volumi e flussi. Per esigenze semplici una piattaforma può bastare; per cataloghi complessi, B2B e integrazioni profonde il su misura ripaga. Non vendiamo la soluzione: risolviamo il problema.",
      },
      {
        q: "Seguite anche la parte SEO e la visibilità del negozio online?",
        a: "Sì: struttura pulita, velocità, schede prodotto ottimizzate per Google e per chi compra dal telefono. Un e-commerce che nessuno trova non vende, quindi la visibilità fa parte del progetto fin dall'inizio.",
      },
      {
        q: "Lavorate solo con attività di Civitanova?",
        a: "No: seguiamo attività in tutta la provincia di Macerata, nel Fermano e in generale nelle Marche. Essere a pochi minuti da Civitanova rende facile vedersi di persona quando serve.",
      },
    ],
    ctaLabel: "Parliamo del tuo e-commerce",
    serviceType: "Sviluppo e-commerce",
    related: [
      {
        href: "/servizi/e-commerce",
        label: "Sviluppo e-commerce",
      },
      {
        href: "/siti-web-civitanova-marche",
        label: "Siti web Civitanova Marche",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "E-commerce Civitanova Marche",
        href: "/realizzazione-ecommerce-civitanova-marche",
      },
    ],
    areaServed: "Civitanova Marche",
  },
  // Macerata capoluogo: una sola pagina a doppio intento (realizzazione siti
  // web + web agency nel title), profonda e con contenuto locale vero — contro
  // le landing fotocopia sdoppiate dei competitor che si cannibalizzano.
  "realizzazione-siti-web-macerata": {
    path: "realizzazione-siti-web-macerata",
    metaTitle: "Realizzazione siti web Macerata | Web agency",
    metaDescription:
      "Web agency per Macerata e provincia: realizzazione siti web, e-commerce e gestionali su misura per studi, aziende e attività del territorio. Risposta entro 24h.",
    kicker: "Per Macerata e provincia",
    h1: "Realizzazione siti web a Macerata, su misura per il tuo lavoro",
    lead: "Siti web, e-commerce e gestionali su misura per studi professionali, aziende e attività di Macerata e provincia: veloci, curati e costruiti intorno a come lavori.",
    introParagraphs: [
      "Macerata è un capoluogo che vive di tante economie insieme: studi professionali e servizi in centro, l'università e il suo indotto, il turismo culturale dello Sferisterio, e tutt'intorno una provincia fatta di manifattura, agroalimentare e artigianato che esporta in mezzo mondo. Realtà diverse, con lo stesso problema: farsi trovare e fare bella figura online, senza perdere tempo dietro alla tecnologia.",
      "Wowspace lavora con aziende e professionisti di Macerata e provincia da Porto Sant'Elpidio, a mezz'ora di strada: abbastanza vicini da vederci di persona quando serve, abbastanza specializzati da non proporti mai un template riciclato. Ogni sito nasce dal tuo lavoro reale, non da un modello precompilato.",
    ],
    sections: [
      {
        h2: "Siti web per studi, aziende e attività del maceratese",
        paragraphs: [
          "Uno studio professionale ha bisogno di autorevolezza e chiarezza; un'azienda manifatturiera di presentare prodotti e capacità produttiva anche in inglese; un agriturismo o una cantina di farsi trovare da chi arriva in zona. Sono siti diversi, e li progettiamo in modo diverso: struttura, testi e funzioni nascono da chi sei e da chi ti deve trovare.",
          "Quello che non cambia mai: caricamento rapido, resa perfetta dal telefono, testi chiari e una base tecnica pulita che Google legge volentieri. Un sito che dopo sei mesi è già da rifare non è un risparmio, è un costo travestito.",
        ],
        bullets: [
          "Studi professionali e servizi: avvocati, commercialisti, tecnici, sanità privata",
          "Aziende manifatturiere e agroalimentari della provincia, anche multilingua",
          "Turismo e cultura: strutture ricettive, cantine, agriturismi",
          "Attività locali che vogliono un sito all'altezza del proprio lavoro",
        ],
      },
      {
        h2: "Non solo vetrine: e-commerce e gestionali su misura",
        paragraphs: [
          "Per molte attività il sito è solo l'inizio. Costruiamo e-commerce su misura per vendere fuori provincia e all'estero, e gestionali che mettono ordine dove oggi ci sono fogli di calcolo e messaggi sparsi: clienti, preventivi, ordini, appuntamenti, ognuno al suo posto e collegato al sito.",
          "È la differenza tra una web agency che consegna e sparisce e un partner tecnico: il sito, il negozio online e il gestionale parlano tra loro, e tu smetti di reinserire le stesse informazioni tre volte.",
        ],
      },
      {
        h2: "Una web agency vicina, un interlocutore solo",
        paragraphs: [
          "Con Wowspace parli direttamente con Michael Moretti, il fondatore: progetto, design e sviluppo passano dalle stesse mani, e le risposte arrivano entro 24 ore. Seguiamo un progetto alla volta, con la giusta attenzione: per te vuol dire sapere sempre chi chiamare e a che punto siamo.",
          "Lavoriamo a progetto oppure ad abbonamento, così puoi partire senza un grande investimento iniziale e con costi chiari fin dal primo giorno. Se hai già un sito datato, lo ricostruiamo tenendo ciò che funziona.",
        ],
      },
      {
        h2: "Farsi trovare su Google a Macerata e in provincia",
        paragraphs: [
          "Un bel sito che nessuno trova è un quadro in cantina. Curiamo struttura, velocità e contenuti perché chi cerca i tuoi servizi a Macerata e dintorni arrivi da te: le basi solide della SEO locale, fatte bene e senza scorciatoie che Google prima o poi punisce.",
        ],
      },
    ],
    faq: [
      {
        q: "Quanto costa realizzare un sito web a Macerata?",
        a: "Dipende da cosa ti serve: una vetrina professionale, un e-commerce o un gestionale sono progetti con impegni diversi. Lavoriamo a progetto o ad abbonamento, così puoi partire senza un grande investimento iniziale. Dopo una prima chiacchierata ti diamo una cifra chiara, senza sorprese.",
      },
      {
        q: "Venite di persona a Macerata?",
        a: "Sì, quando serve: siamo a Porto Sant'Elpidio, a circa mezz'ora da Macerata. All'avvio del progetto e nei momenti importanti vederci di persona aiuta a capire davvero l'attività, e per noi è la normalità, non un'eccezione.",
      },
      {
        q: "Fate anche siti multilingua per aziende che esportano?",
        a: "Sì. La provincia di Macerata è piena di aziende che vendono all'estero: progettiamo siti multilingua con struttura corretta anche per la SEO internazionale, così il sito lavora bene su ogni mercato.",
      },
      {
        q: "Usate WordPress o template pronti?",
        a: "No: sviluppiamo su misura con tecnologia moderna (Next.js). Niente temi appesantiti da plugin, niente manutenzione infinita: un sito veloce, sicuro e costruito esattamente intorno al tuo lavoro.",
      },
      {
        q: "Con chi parlo durante il progetto?",
        a: "Direttamente con Michael Moretti, il fondatore. Un solo interlocutore dall'inizio alla fine, risposta entro 24 ore, niente catena di account manager.",
      },
      {
        q: "Seguite anche e-commerce e gestionali oltre ai siti?",
        a: "Sì: e-commerce su misura per vendere online e gestionali costruiti sul tuo flusso di lavoro, integrati col sito. Così contatti, ordini e clienti finiscono in un unico posto invece che in dieci strumenti scollegati.",
      },
    ],
    ctaLabel: "Parliamo del tuo progetto",
    serviceType: "Realizzazione siti web",
    related: [
      {
        href: "/servizi/siti-web",
        label: "Realizzazione siti web",
      },
      {
        href: "/siti-web-civitanova-marche",
        label: "Siti web Civitanova Marche",
      },
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Siti web Macerata",
        href: "/realizzazione-siti-web-macerata",
      },
    ],
    areaServed: "Macerata",
  },
  "software-gestionali-marche": {
    path: "software-gestionali-marche",
    metaTitle: "Software gestionali Marche su misura per PMI e aziende",
    metaDescription:
      "Sostituisci Excel e fogli sparsi con un gestionale su misura, agganciato al tuo sito. Seguiamo aziende in tutte le Marche, di persona e da remoto. Parliamone.",
    kicker: "Gestionali su misura",
    h1: "Software gestionali nelle Marche, cuciti sulla tua azienda",
    lead: "Un gestionale che segue davvero come lavori, al posto di Excel, email e fogli sparsi tra i reparti.",
    introParagraphs: [
      "Molte aziende marchigiane fanno girare pezzi importanti del proprio lavoro dentro fogli Excel duplicati, email e quaderni: preventivi da una parte, magazzino dall'altra, scadenze tenute a memoria. Finché i volumi sono bassi regge, poi diventa un freno — dati che non tornano, tempo perso a ricopiare, errori che costano.",
      "Un gestionale su misura mette ordine: un unico posto dove ordini, produzione, magazzino, clienti e documenti parlano tra loro. Non un software preconfezionato da piegare al tuo modo di lavorare, ma uno strumento costruito sul tuo processo reale, con i termini e i passaggi che usi ogni giorno.",
      "Seguiamo PMI e aziende in tutta la regione, con software gestionali per le Marche pensati per come si lavora davvero qui: piccole realtà artigiane, imprese di distretto e aziende già strutturate che vogliono smettere di rincorrere i file.",
    ],
    sections: [
      {
        h2: "Dal foglio Excel al gestionale che regge il processo",
        paragraphs: [
          "Excel è comodo per iniziare, ma non è nato per far girare un'azienda che cresce. Quando lo stesso dato vive in cinque file diversi, basta una versione sbagliata per mandare in confusione un ordine o una consegna. Un gestionale su misura elimina la duplicazione: il dato si inserisce una volta sola, lo vedono tutti i reparti e resta aggiornato.",
        ],
        bullets: [
          "Anagrafiche clienti e fornitori in un unico archivio, senza doppioni",
          "Preventivi, ordini e fatture collegati, senza ricopiare a mano",
          "Magazzino e disponibilità sempre allineati a ciò che entra ed esce",
          "Commesse, scadenze e stati di avanzamento visibili a colpo d'occhio",
          "Accessi per ruolo: ognuno vede e modifica solo ciò che gli serve",
        ],
      },
      {
        h2: "Pensato per il tessuto produttivo marchigiano",
        paragraphs: [
          "Le Marche sono una regione di PMI e distretti, dove ogni settore ha le sue logiche. Un calzaturificio ragiona per campionari, taglie e commesse; un'azienda meccanica per distinte base, lotti e ricambi a magazzino; una cantina o un frantoio per lotti, tracciabilità e stagionalità; uno studio o un'impresa di servizi per pratiche, ore e scadenze. Un gestionale generico costringe tutti nello stesso stampo, uno su misura parte da come lavora davvero la tua attività.",
          "Conoscere il territorio aiuta: dal calzaturiero del Fermano al mobile del Pesarese, dall'agroalimentare alla meccanica di precisione, le esigenze cambiano da capannone a capannone. Il software si adatta al tuo modo di produrre, non il contrario.",
        ],
      },
      {
        h2: "Su misura, mai un pacchetto da adattare",
        paragraphs: [
          "Non partiamo da un software preconfezionato con cento funzioni che non userai mai. Costruiamo solo i moduli che ti servono davvero, con lo stesso stack moderno che usiamo per ogni progetto (Next.js), e lasciamo spazio per crescere. Puoi iniziare da un'area — per esempio ordini e magazzino — e aggiungere produzione, CRM o area riservata quando serve, senza rifare tutto da capo.",
        ],
        bullets: [
          "Solo le funzioni che usi, interfaccia pulita e veloce",
          "Modulare: si parte piccolo e si amplia per gradi",
          "Accessibile da ufficio, capannone o smartphone, anche in mobilità",
          "I dati restano tuoi ed esportabili quando vuoi",
        ],
      },
      {
        h2: "Agganciato al sito, all'e-commerce e agli strumenti che già usi",
        paragraphs: [
          "Il gestionale non vive isolato. Può collegarsi al sito o all'e-commerce, così un ordine online entra direttamente in azienda senza ricopiature; può dialogare con la fatturazione elettronica, con un CRM o con un'area riservata dove il cliente controlla i propri ordini e documenti. Se hai già strumenti che funzionano bene, li integriamo invece di buttarli, così il passaggio è graduale e senza scossoni.",
        ],
      },
      {
        h2: "Tutte le province delle Marche, di persona e da remoto",
        paragraphs: [
          "Abbiamo sede a Porto Sant'Elpidio, in provincia di Fermo, e seguiamo aziende in tutta la regione: Fermo, Ascoli Piceno, Macerata, Ancona e Pesaro-Urbino. Dove serve vederci di persona — per capire il processo direttamente in reparto — veniamo noi; il resto del lavoro procede bene anche da remoto, con aggiornamenti rapidi. Parli direttamente con Michael Moretti, il fondatore: niente catena di account manager, un progetto alla volta e risposta entro 24 ore.",
        ],
      },
    ],
    faq: [
      {
        q: "Che differenza c'è tra un gestionale su misura e i fogli Excel che uso adesso?",
        a: "Excel va bene per pochi dati, ma non regge quando lo stesso file passa tra più persone e reparti: nascono doppioni, versioni diverse ed errori. Un gestionale su misura tiene un solo dato aggiornato per tutti, collega preventivi, ordini, magazzino e clienti e riduce il lavoro di ricopiatura manuale.",
      },
      {
        q: "In quali province delle Marche lavorate?",
        a: "Seguiamo aziende in tutte e cinque le province: Fermo, Ascoli Piceno, Macerata, Ancona e Pesaro-Urbino. Abbiamo sede a Porto Sant'Elpidio (FM). Gli incontri importanti li facciamo volentieri di persona, mentre il resto procede da remoto, così la distanza non è un limite.",
      },
      {
        q: "Posso partire da un solo reparto e ampliare in seguito?",
        a: "Sì, è l'approccio che consigliamo quasi sempre. Si può iniziare dall'area più urgente — per esempio magazzino e ordini — e aggiungere produzione, CRM, fatturazione o area clienti quando serve. Essendo su misura e modulare, si cresce per gradi senza rifare tutto da capo.",
      },
      {
        q: "Il gestionale si collega al mio sito o al mio e-commerce?",
        a: "Sì. Può ricevere gli ordini dal sito o dall'e-commerce senza ricopiarli a mano, dialogare con la fatturazione elettronica e con un'area riservata per i clienti. Se usi già altri strumenti che funzionano, si integrano invece di sostituirli.",
      },
      {
        q: "Quanto costa un software gestionale su misura?",
        a: "Dipende dai moduli che servono davvero. Lavoriamo per mantenere contenuto l'investimento iniziale: si può procedere a progetto oppure a canone, così anche una PMI può partire senza una spesa pesante in un colpo solo. Ti diamo un preventivo chiaro dopo aver capito il processo.",
      },
      {
        q: "I dati della mia azienda restano miei?",
        a: "Sì. I dati sono e restano tuoi, esportabili quando vuoi. Il gestionale è costruito su misura per la tua azienda: non è un servizio dove le tue informazioni finiscono mischiate con quelle di altri.",
      },
    ],
    ctaLabel: "Parliamo del tuo gestionale",
    serviceType: "Software gestionali su misura",
    related: [
      {
        href: "/servizi/software-gestionali",
        label: "Software gestionali",
      },
      {
        href: "/servizi/crm-su-misura",
        label: "CRM su misura",
      },
      {
        href: "/servizi/automazioni-ai",
        label: "Automazioni e AI",
      },
    ],
    breadcrumb: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Software gestionali Marche",
        href: "/software-gestionali-marche",
      },
    ],
    areaServed: "Marche",
  },
};
