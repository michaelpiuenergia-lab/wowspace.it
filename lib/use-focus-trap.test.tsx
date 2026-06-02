import { beforeAll, describe, expect, it } from "vitest";
import { useRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { useFocusTrap } from "@/lib/use-focus-trap";

// jsdom non calcola il layout: offsetParent è sempre null. Lo simuliamo non-null
// per gli elementi attaccati, così il filtro di visibilità del hook funziona.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "offsetParent", {
    configurable: true,
    get() {
      return this.parentNode;
    },
  });
});

function Harness({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);
  return (
    <div ref={ref}>
      <button>uno</button>
      <button>due</button>
      <button>tre</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("Tab dall'ultimo elemento torna al primo", () => {
    const { getByText } = render(<Harness active />);
    const first = getByText("uno");
    const last = getByText("tre");
    last.focus();
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(first);
  });

  it("Shift+Tab dal primo elemento va all'ultimo", () => {
    const { getByText } = render(<Harness active />);
    const first = getByText("uno");
    const last = getByText("tre");
    first.focus();
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("non intrappola il focus quando è inattivo", () => {
    const { getByText } = render(<Harness active={false} />);
    const last = getByText("tre");
    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(document.activeElement).toBe(last);
  });
});
