import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

export type ScreenSaverContextType = {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

const initialState: ScreenSaverContextType = {
  isShow: false,
  setIsShow: () => {},
};

export const ScreenSaverContext =
  createContext<ScreenSaverContextType>(initialState);

export function useScreenSaver() {
  const context = useContext(ScreenSaverContext);
  if (!context) {
    throw new Error("useScreenSaver must be used within useScreenSaver");
  }
  return context;
}
