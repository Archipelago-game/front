import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../modules/header/Header.tsx";

export default function MainLayout() {
  return (
    <Container maxWidth={"xl"} sx={{ px: 2, paddingBottom: 2 }}>
      <Header />
      <Outlet />
    </Container>
  );
}
