"use client";

import { useEffect } from "react";

export function ConsoleGreet() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = "__wowspace_greet";
    if ((window as unknown as Record<string, unknown>)[flag]) return;
    (window as unknown as Record<string, unknown>)[flag] = true;

    const banner = [
      "",
      "   ░█░█░█▀█░█░█░█▀▀░█▀█░█▀█░█▀▀░█▀▀",
      "   ░█▄█░█░█░█▄█░▀▀█░█▀▀░█▀█░█░░░█▀▀",
      "   ░▀░▀░▀▀▀░▀░▀░▀▀▀░▀░░░▀░▀░▀▀▀░▀▀▀",
      "",
      "   sites · crm · ai systems",
      "",
    ].join("\n");

    const title =
      "%c " + banner + "%c\n   hey dev. hai aperto la console.\n   se ti piace come e' costruito, scrivici:\n   %cciao@wowspace.it%c\n   ↗ tip: premi  /  o  Cmd+K  per la command palette\n";

    console.log(
      title,
      "color:#15d4ff;font-family:monospace;font-weight:bold;line-height:1.2",
      "color:#cbd6e6;font-family:monospace;font-size:12px;line-height:1.6",
      "color:#c8ff5a;font-family:monospace;font-weight:bold",
      "color:#cbd6e6;font-family:monospace;font-size:12px;line-height:1.6",
    );
  }, []);

  return null;
}
