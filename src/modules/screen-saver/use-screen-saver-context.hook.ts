import { createContext, useContext } from "react";

interface ItemMethods {
  isShow: boolean;
  start: () => void;
  stop: () => void;
}

export interface ScreenSaverContextType {
  fullAnimation: ItemMethods;
  spinner: ItemMethods;
}

export const ScreenSaverContext = createContext<ScreenSaverContextType | null>(
  null,
);

export function useScreenSaverContext() {
  const context = useContext(ScreenSaverContext);
  if (!context) {
    throw new Error(
      "useScreenSaverContext must be used within ScreenSaverContextProvider",
    );
  }
  return context;
}
