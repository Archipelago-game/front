import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { lazy, useEffect } from "react";

import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";
import { LocalStoragePatch } from "../../api/local-storage.ts";

import ScreenSaver from "../../modules/screen-saver/ScreenSaver.tsx";
const Header = lazy(() => import("../../modules/header/Header.tsx"));

export default function MainLayout() {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    LocalStoragePatch.convertObjToArray();
  }, []);

  return (
    <Container
      maxWidth={"xl"}
      sx={{ px: 2, paddingBottom: 2, height: "100vh" }}
    >
      <ScreenSaver isLoading={isLoading} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
          height: "100vh",
        }}
      >
        <Header />
        <Box
          sx={{
            position: "relative",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
