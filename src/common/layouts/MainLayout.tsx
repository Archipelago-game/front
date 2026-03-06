import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import ScreenSaver from "../../modules/screen-saver/ScreenSaver.tsx";
import { useTheme } from "@mui/material/styles";
import { overflowYBaseStyles } from "../styles/overflow-y-base.css.ts";
const Header = lazy(() => import("../../modules/header/Header.tsx"));

export default function MainLayout() {
  const { isLoading } = useAuthContext();
  const theme = useTheme();

  return (
    <Container
      className="container"
      maxWidth={"xl"}
      sx={{
        position: "relative",
        px: 2,
        paddingBottom: 2,
        height: "100vh",
        backgroundColor: theme.palette.base.background,
      }}
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
        <Suspense fallback={<div />}>
          <Header />
        </Suspense>
        <Box
          sx={{
            position: "relative",
            ...overflowYBaseStyles,
          }}
        >
          <Suspense fallback={<div />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Container>
  );
}
