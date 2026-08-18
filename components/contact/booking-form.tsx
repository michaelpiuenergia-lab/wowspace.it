"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import styles from "./booking-form.module.css";

const SERVICES = [
  "Sito web",
  "E-commerce",
  "CRM o gestionale su misura",
  "Automazioni e AI",
  "Non lo so ancora, parliamone",
];

// Form senza backend: compone il messaggio e lo consegna sul canale scelto
// (WhatsApp o email). Zero dati salvati da noi, zero server da mantenere,
// e la conversazione parte già con il contesto giusto.
export function BookingForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const ready = name.trim().length > 1;

  const composed = [
    `Ciao! Sono ${name.trim()}${business.trim() ? ` (${business.trim()})` : ""}.`,
    `Mi interessa: ${service}.`,
    message.trim() ? message.trim() : null,
    "Possiamo sentirci per una call o un preventivo?",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${siteConfig.phoneE164.replace("+", "")}?text=${encodeURIComponent(composed)}`;
  const mailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Richiesta informazioni — ${service}`,
  )}&body=${encodeURIComponent(composed)}`;

  const guard = (event: React.MouseEvent) => {
    if (!ready) {
      event.preventDefault();
      setTouched(true);
    }
  };

  // Invio da tastiera = canale primario (WhatsApp), stesso guard dei bottoni.
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!ready) {
      setTouched(true);
      return;
    }
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Il tuo nome *</span>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es. Laura Rossi"
            autoComplete="name"
            maxLength={80}
            aria-invalid={touched && !ready}
            aria-describedby="booking-name-error"
          />
          {touched && !ready && (
            <span id="booking-name-error" role="alert" className={styles.error}>
              Serve solo il nome, così sappiamo con chi parliamo.
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Attività o azienda</span>
          <input
            className={styles.input}
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="es. Calzaturificio Rossi, Civitanova"
            autoComplete="organization"
            maxLength={120}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Di cosa hai bisogno?</span>
        <select
          className={styles.input}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>
          Due righe sul progetto (facoltative)
        </span>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="es. Ho un negozio e vorrei iniziare a vendere online…"
          rows={4}
          maxLength={600}
        />
      </label>

      <div className={styles.actions}>
        <a
          className={styles.whatsapp}
          href={whatsappHref}
          onClick={guard}
          target="_blank"
          rel="noopener noreferrer"
        >
          Invia su WhatsApp
        </a>
        <a className={styles.mail} href={mailHref} onClick={guard}>
          Invia via email
        </a>
      </div>
      <p className={styles.note}>
        Il messaggio parte dal tuo WhatsApp o dalla tua email: noi non salviamo
        niente. Rispondiamo entro 24 ore, di solito molto prima.
      </p>
    </form>
  );
}
