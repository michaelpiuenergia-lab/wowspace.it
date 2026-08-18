# Strategia SEO locale Marche — analisi competitor e piano

> Basata su una ricognizione sistematica delle SERP (agosto 2026) su 6 cluster di
> query: siti web/web agency Civitanova, e-commerce Civitanova/Macerata,
> gestionali Civitanova/Marche, CRM Marche, Macerata città, Porto
> Sant'Elpidio/Fermo. Dossier su 7 competitor ricorrenti.

## Come è fatta la SERP (il quadro)

Ogni query "servizio + città" nelle Marche è divisa in tre blocchi:

1. **SEO programmatica nazionale** — Clion Spa (software house di Porto Potenza
   Picena, €6M fatturato) domina con sottodomini keyword+città e pagine geo per
   ogni permutazione; Genesi.IT (dominio del 1996), Creativemotions (freelance
   di Ancona con landing per ogni città), Grazioli Design (agenzia di Lodi che
   simula presenza locale), L&L, Webstrategia. Contenuti fotocopia: rankano per
   copertura keyword e anzianità di dominio, **non** per rilevanza locale.
2. **Directory** — ProntoPro, AddLance, PagineBianche, Reteimprese con pagine
   listicle programmatiche ("I 40 migliori…"). Quando una pagina elenco ranka
   alta, la query ha pochi competitor locali veri.
3. **Locali veri** — quasi tutti piccoli: Gianluca Scoponi (il benchmark:
   homepage brand + landing keyword-exact per città, ma pagine legacy sdoppiate
   che si cannibalizzano), Sito Design, RL Webzone (homepage generica), Marco
   Sopranzi.

**La regola che emerge ovunque: nessuna homepage ranka sulle query
città+servizio — vincono le landing dedicate con keyword esatta a inizio
title.** E i vincitori attuali sono quasi tutti battibili sulla rilevanza:
pagine template che di locale hanno solo il nome della città.

## I varchi trovati (query a bassa competizione reale)

- **"ecommerce civitanova marche"**: le prime 8 posizioni sono TUTTE doorway di
  Clion. Nessun competitor ha una pagina vera a intento esatto. → landing creata.
- **"creazione gestionali civitanova marche"**: SERP quasi vuota — nessun
  risultato combina "gestionali"+città nel title (rankano pagine siti web e
  perfino voci Wikipedia). Campo quasi libero.
- **"crm su misura marche"**: nessun title combina "CRM su misura"+"Marche" —
  la nostra pagina software-gestionali-marche è vicina, valutare rafforzamento.
- **Macerata**: 13 risultati su 16 sono landing dedicate; Creativemotions vince
  con UNA pagina a doppio intento (realizzazione+web agency). → landing creata
  sullo stesso modello, ma con contenuto locale vero.
- **Porto Sant'Elpidio / Fermo**: i locali veri sono pochi e deboli (pagine
  .html legacy di Scoponi); metà SERP è programmatica non marchigiana. È casa
  nostra: da difendere e consolidare.

## Cosa è stato applicato (nel codice)

1. **Landing Civitanova riallineata alla query**: title →
   "Realizzazione siti web Civitanova Marche | Web agency" (keyword esatta +
   doppio intento, il pattern di chi ranka), H1 e lead coerenti. Slug invariato
   (un redirect ora costa più di quel che rende).
2. **Nuova landing `/realizzazione-ecommerce-civitanova-marche`** — l'intento
   scoperto da tutti: contenuto solo e-commerce (taglie/varianti calzatura,
   integrazione magazzino-gestionale), distinto dalla landing siti-web per non
   cannibalizzare.
3. **Nuova landing `/realizzazione-siti-web-macerata`** — doppio intento nel
   title, contenuto sul tessuto maceratese (studi, università, manifattura,
   agroalimentare, multilingua per l'export).
4. **Pagina `/chi-siamo`** (E-E-A-T): founder, sede, metodo, contatti, schema
   AboutPage collegato ai nodi business/persona.
5. **Cross-link nel cluster locale**: le landing città ora si linkano tra loro
   (PSE ↔ Fermo ↔ Civitanova ↔ e-commerce), footer "Zone servite" aggiornato.
6. **`sameAs`** nel nodo ProfessionalService (GitHub; GBP e LinkedIn appena
   esistono).

## Cose da fare FUORI dal codice (in ordine di impatto)

1. **Google Business Profile a Porto Sant'Elpidio + recensioni** — la mossa che
   batte TUTTI i programmatici: Clion, Genesi e Grazioli non possono comparire
   nel riquadro mappe locale, che sta SOPRA i loro risultati organici. Guida già
   pronta in `docs/guida-google-business-profile.md`. Poi aggiungere l'URL della
   scheda a `sameAs` e come `hasMap`.
2. **Primo caso studio locale vero** — nome cliente, città, risultato (con
   permesso scritto). Una `/vetrina` con clienti reali è l'arma che nessuna
   doorway può replicare. Mai inventare.
3. **Range di prezzo nelle FAQ "quanto costa"** — le FAQ intercettano l'intent
   ma rispondono "dipende". Servono fasce reali decise dal titolare (i numeri
   non si inventano): con quelle, le FAQ (già in schema FAQPage) possono rubare
   il click alle pagine "costo/prezzo" di Clion.
4. **Email di dominio** (es. info@wowspaceweb.com) al posto di
   wowspaceweb@gmail.com: segnale "azienda strutturata" vs freelance. Va prima
   creata la casella; poi aggiornare `site-config.ts` e le 2 occorrenze nei
   testi delle landing.
5. **Pagina `/contatti` o `/preventivo` con form** — oggi la CTA è un mailto:,
   vicolo cieco su mobile senza client email configurato.

## Cose da valutare (decisioni aperte)

- **`/piattaforma` vs `/servizi/crm-su-misura`** e **`/runtime` vs
  `/servizi/automazioni-ai`**: stesso intento su pagine diverse → rischio
  cannibalizzazione interna. O si differenziano chiaramente (prodotto vs
  servizio) o si consolidano con 301.
- **Nav**: le money page /servizi/\* sono raggiungibili solo via hub e footer.
  Un dropdown "Servizi" nella nav darebbe link diretti da ogni pagina.

## Cosa NON fare (i competitor sono la lezione)

- **Niente matrice città×servizio programmatica** — è la zavorra di Clion,
  Genesi e Grazioli, esposta agli update antispam (doorway/scaled content). Il
  nostro vantaggio è che ogni landing è unica e vera. Limite sano: 6-8 landing
  totali (ora 6), solo città a distanza reale, mai fuori Marche.
- **Mai due pagine per la stessa città** (es. "siti-web-civitanova" +
  "web-agency-civitanova"): doppio intento dentro UN title. La cannibalizzazione
  di Scoponi e Webstrategia è l'anti-modello.
- **Mai recensioni/rating/geo inventati nello schema** — la scelta attuale
  (solo dati reali) è corretta e va difesa.
- **Niente keyword stuffing nei title** — i title puliti vincono il click
  contro quelli robotici di Clion/Webstrategia.
- **Niente domini secondari exact-match**: tutta l'equity su un solo dominio.
- **Niente cambi di slug** sulle landing esistenti per inseguire il
  keyword-perfetto: title e H1 pesano di più.

## Aspettative realistiche

Sulle query generiche ("siti web civitanova") Genesi/Scoponi/Creativemotions
hanno 15-30 anni di dominio: non si scalzano con l'on-page nel breve. La
partita si vince su: **intent esatti scoperti** (e-commerce+città,
gestionali+città — le landing nuove), **casa propria** (PSE/Fermo), e **local
pack via GBP** che sta sopra l'organico. Orizzonte onesto: primi movimenti in
4-8 settimane sulle query a bassa competizione, 3-6 mesi sulle contese.
