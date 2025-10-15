import { Box, Typography } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";
import { fitContentStyle } from "./side/styles/side-defence.styles.ts";

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
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Защита
      </Typography>
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
