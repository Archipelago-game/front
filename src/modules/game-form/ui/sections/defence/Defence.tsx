import { Box } from "@mui/material";
import Brave from "./Brave.tsx";

import SideDefence from "./side/SideDefence.tsx";

import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";
import ArmorSection from "./armor/ArmorSection.tsx";

export default function Defence() {
  return (
    <BaseSectionCard title="Защита">
      <Box mb={1}>
        <Brave />
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "1fr auto",

          ["@media (max-width: 959px)"]: {
            gridTemplateColumns: "1fr",
          },

          ["@media (max-width: 730px)"]: {
            gridTemplateColumns: "1fr auto",
          },

          ["@media (max-width: 550px)"]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <ArmorSection />
        <SideDefence />
      </Box>
    </BaseSectionCard>
  );
}

// todo разобраться нужны ли эти стили для SectionCard
//      sx={{
//         ...fitContentStyle,
//         ["@media (max-width: 730px)"]: {
//           width: "100%",
//         },
//       }}
