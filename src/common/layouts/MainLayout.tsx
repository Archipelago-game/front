import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../modules/header/Header.tsx";
import { useEffect } from "react";
import { LocalStoragePatch } from "../../api/local-storage.ts";

export default function MainLayout() {
  useEffect(() => {
    LocalStoragePatch.convertObjToArray();
  }, []);

  return (
    <Container
      maxWidth={"xl"}
      sx={{ px: 2, paddingBottom: 2, height: "100vh" }}
    >
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
