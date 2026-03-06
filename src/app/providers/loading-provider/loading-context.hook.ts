import { createContext } from "react";
import { useContext } from "react";

interface LoadingContextValue {
  show: () => void;
  hide: () => void;
}

export const LoadingContext = createContext<LoadingContextValue | null>(null);

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
}
