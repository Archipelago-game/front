import { Box } from "@mui/material";
import Brave from "./Brave.tsx";

import SideDefence from "./side/SideDefence.tsx";

import SectionCard from "../../components/section/SectionCard.tsx";
import ArmorSection from "./armor/ArmorSection.tsx";

export default function Defence() {
  return (
    <SectionCard title="Защита">
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
          <ArmorSection />
        </Box>
        <SideDefence />
      </Box>
    </SectionCard>
  );
}

// todo разобраться нужны ли эти стили для SectionCard
//      sx={{
//         ...fitContentStyle,
//         ["@media (max-width: 730px)"]: {
//           width: "100%",
//         },
//       }}
