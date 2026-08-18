"use client";

import { useEffect, useState } from "react";
import { type Consent, parseConsent } from "@/lib/consent";

// GA4 agganciato al consenso: lo script viene caricato SOLO se l'utente ha
// accettato "statistiche" nel banner cookie E se NEXT_PUBLIC_GA4_ID è
// impostato. Senza ID (o senza consenso) questo componente non fa nulla:
// zero richieste, zero cookie. Alla revoca del consenso GA viene disattivato
// con il flag ufficiale ga-disable finché la pagina resta aperta.
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const STORAGE_KEY = "wowspace.consent.v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function loadGa(id: string) {
  if (document.getElementById("ga4-script")) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  // IP anonimizzato e niente signals pubblicitari: usiamo GA solo come
  // contatore di visite/percorsi, coerente con la Cookie Policy.
  gtag("config", id, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const s = document.createElement("script");
  s.id = "ga4-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

export function ConsentAnalytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const readStored = () =>
      parseConsent(window.localStorage.getItem(STORAGE_KEY));
    const apply = (consent: Consent | null) => {
      const ok = consent?.analytics === true;
      window[`ga-disable-${GA_ID}`] = !ok;
      if (ok) setGranted(true);
    };
    apply(readStored());
    const handler = (event: Event) => {
      apply((event as CustomEvent<Consent>).detail ?? readStored());
    };
    window.addEventListener("wowspace:consent-change", handler);
    return () => window.removeEventListener("wowspace:consent-change", handler);
  }, []);

  useEffect(() => {
    if (granted && GA_ID) loadGa(GA_ID);
  }, [granted]);

  return null;
}
