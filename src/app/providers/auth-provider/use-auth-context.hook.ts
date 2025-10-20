import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { BackendlessUser } from "../../../api/backendless-types.ts";

interface AuthContextType {
  isAuthorized: boolean;
  userInfo: BackendlessUser | null;
  setUserInfo: Dispatch<SetStateAction<BackendlessUser | null>>;
  removeUserInfo: () => void;
}

const defaultValue = {
  isAuthorized: false,
  userInfo: null,
  setUserInfo: () => {},
  removeUserInfo: () => {},
};

export const AuthContext = createContext<AuthContextType | null>(defaultValue);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}
