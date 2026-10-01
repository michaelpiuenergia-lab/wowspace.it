@AGENTS.md

# Sito Wowspace (wowspaceweb.com)

Tutto in italiano: testi, commenti, messaggi di commit. Le tecnicalità inglesi restano in inglese.

## Dove gira e come si pubblica (vale anche per le sessioni nel cloud)

Dal 30/09/2026 il sito gira sul **server OVH di Wowspace** (Regno Unito), in Docker dietro Caddy. **Non su Vercel**: il vecchio progetto Vercel `wowspace-it` non serve più il dominio.

- **Si pubblica con un push su `main`.** Il server guarda `main` ogni 2 minuti, compila, accende la versione nuova accanto a quella vecchia, prova `/`, `/servizi` e `/robots.txt` e solo allora passa il traffico. Un commit che non compila o non risponde NON va online: resta la versione di prima.
- **Orari:** nelle fasce 12-15 e 19-24 (ora italiana) il server non pubblica da solo; il commit va online al primo giro dopo.
- **wowspaceweb.it** rimanda a wowspaceweb.com.
- **Controllo:** la pagina online di https://wowspaceweb.com. Michael vede versione e pubblicazioni nel gestionale, in «Server e deployment».
- **Una sessione nel cloud NON entra nel server** (la chiave sta solo sul PC di Michael). Pubblicare subito nelle fasce orarie, tornare alla versione di prima o leggere i registri si fa da una sessione sul PC di Michael: scrivilo nel resoconto invece di provarci.
