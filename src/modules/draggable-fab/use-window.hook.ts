import { useCallback, useEffect, useState } from "react";

type WindowSizeStateType = {
  height: number;
  width: number;
};

export function useWindow() {
  const [size, setSize] = useState<WindowSizeStateType>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handelResize = useCallback(() => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handelResize);
    window.addEventListener("orientationchange", handelResize);

    return () => {
      window.removeEventListener("resize", handelResize);
      window.removeEventListener("orientationchange", handelResize);
    };
  }, []);

  return size;
}
