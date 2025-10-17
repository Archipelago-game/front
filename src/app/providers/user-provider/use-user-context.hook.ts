import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { BackendlessUser } from "../../../api/backendless-types.ts";

interface UserContext {
  user: BackendlessUser | null;
  setUser: Dispatch<SetStateAction<BackendlessUser | null>>;
  removeUser: () => void;
}

const defaultValue = {
  user: null,
  setUser: () => {},
  removeUser: () => {},
};

export const UserContext = createContext<UserContext | null>(defaultValue);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}
