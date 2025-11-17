import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../modules/header/Header.tsx";
import { useEffect } from "react";
import { LocalStoragePatch } from "../../api/local-storage.ts";

import AnimatedSvg from "../../modules/screen-saver/ScreenSaver.tsx";
import { useScreenSaver } from "../../modules/screen-saver/screen-saver.hook.ts";

export default function MainLayout() {
  const { setIsShow: setIsScreenSaverShow } = useScreenSaver();
  useEffect(() => {
    LocalStoragePatch.convertObjToArray();
    setIsScreenSaverShow(true);
  }, []);

  return (
    <Container
      maxWidth={"xl"}
      sx={{ px: 2, paddingBottom: 2, height: "100vh", border: "1px solid red" }}
    >
      <AnimatedSvg />
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
