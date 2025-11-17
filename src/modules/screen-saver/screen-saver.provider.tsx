import { type ReactNode, useMemo, useState } from "react";
import {
  ScreenSaverContext,
  type ScreenSaverContextType,
} from "./screen-saver.hook.ts";

interface Props {
  children: ReactNode;
}

export function ScreenSaverProvider({ children }: Props) {
  const [isShow, setIsShow] = useState(false);

  const value: ScreenSaverContextType = useMemo(
    () => ({
      isShow,
      setIsShow,
    }),
    [isShow],
  );

  return (
    <ScreenSaverContext.Provider value={value}>
      {children}
    </ScreenSaverContext.Provider>
  );
}
