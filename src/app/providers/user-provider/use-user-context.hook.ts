import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { BackendlessUser } from "../../../api/backendless-types.ts";

interface UserContext {
  userInfo: BackendlessUser | null;
  setUserInfo: Dispatch<SetStateAction<BackendlessUser | null>>;
  removeUserInfo: () => void;
}

const defaultValue = {
  userInfo: null,
  setUserInfo: () => {},
  removeUserInfo: () => {},
};

export const UserContext = createContext<UserContext | null>(defaultValue);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}
