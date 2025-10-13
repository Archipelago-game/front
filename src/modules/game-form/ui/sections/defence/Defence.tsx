import { Box, Typography } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";
import { fitContentStyle } from "./side/styles/side-defence.styles.ts";

export default function Defence() {
  return (
    <Box sx={{ ...fitContentStyle }}>
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
          display: "flex",
          gap: 1,
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
