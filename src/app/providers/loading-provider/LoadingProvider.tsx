import { useState, useCallback } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { LoadingContext } from "./loading-context.hook.ts";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const show = useCallback(() => {
    setLoadingCount((c) => c + 1);
  }, []);

  const hide = useCallback(() => {
    setLoadingCount((c) => Math.max(0, c - 1));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}

      <Backdrop open={isLoading} sx={{ zIndex: 2000 }}>
        <CircularProgress />
      </Backdrop>
    </LoadingContext.Provider>
  );
}
