import { Box } from "@mui/material";
import SectionTitle from "../../components/SectionTitle.tsx";
import Authority from "./Authority.tsx";
import Pride from "./Pride.tsx";
import Rivalry from "./Rivalry.tsx";
import Idealism from "./Idealism.tsx";
import Individualism from "./Individualism.tsx";

export default function MoralValues() {
  return (
    <Box>
      <SectionTitle title="Моральные ценности" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Authority />
        <Pride />
        <Rivalry />
        <Idealism />
        <Individualism />
      </Box>
    </Box>
  );
}
