import { useEffect, useState } from "react";

export function usePrintMode() {
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => {
    const before = () => setIsPrint(true);
    const after = () => setIsPrint(false);

    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);

    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return isPrint;
}
