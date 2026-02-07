import { Box } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";
import { fitContentStyle } from "./side/styles/side-defence.styles.ts";
import SectionTitle from "../../components/section/SectionTitle.tsx";

export default function Defence() {
  return (
    <Box
      sx={{
        ...fitContentStyle,
        ["@media (max-width: 730px)"]: {
          width: "100%",
        },
      }}
    >
      <SectionTitle title="Защита" />

      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "1fr auto ",
          ["@media (max-width: 390px)"]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Brave />
          <Armor />
          <ArmorProperty />
        </Box>
        <SideDefence />
      </Box>
    </Box>
  );
}
