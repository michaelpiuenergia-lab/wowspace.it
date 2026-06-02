import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CommandPalette } from "@/components/effects/command-palette";

// useRouter di Next va mockato fuori dal contesto dell'app router.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("CommandPalette", () => {
  it("mostra il trigger quando è chiusa", () => {
    render(<CommandPalette />);
    expect(
      screen.getByRole("button", { name: /apri palette comandi/i }),
    ).toBeTruthy();
  });

  it("si apre cliccando il trigger", () => {
    render(<CommandPalette />);
    fireEvent.click(
      screen.getByRole("button", { name: /apri palette comandi/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /palette comandi/i }),
    ).toBeTruthy();
  });

  it("filtra le azioni in base alla query", () => {
    render(<CommandPalette />);
    fireEvent.click(
      screen.getByRole("button", { name: /apri palette comandi/i }),
    );
    const input = screen.getByPlaceholderText(/cerca rotta o azione/i);

    fireEvent.change(input, { target: { value: "vetrina" } });
    expect(screen.queryByText(/nessuna rotta/i)).toBeNull();

    fireEvent.change(input, { target: { value: "zzzznomatch" } });
    expect(screen.getByText(/nessuna rotta/i)).toBeTruthy();
  });

  it("Escape chiude la palette", () => {
    render(<CommandPalette />);
    fireEvent.click(
      screen.getByRole("button", { name: /apri palette comandi/i }),
    );
    expect(
      screen.getByRole("dialog", { name: /palette comandi/i }),
    ).toBeTruthy();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: /palette comandi/i }),
    ).toBeNull();
  });
});
