import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { FirebaseUserData } from "../../../api/firebase-types.ts";

interface AuthContextType {
  isAuthorized: boolean;
  userInfo: FirebaseUserData | null;
  setUserInfo: Dispatch<SetStateAction<FirebaseUserData | null>>;
  removeUserInfo: () => void;
  isLoading: boolean;
}

const defaultValue = {
  isAuthorized: false,
  userInfo: null,
  setUserInfo: () => {},
  removeUserInfo: () => {},
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType | null>(defaultValue);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }
  return context;
}
