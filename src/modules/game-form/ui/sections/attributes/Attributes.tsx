import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import Dexterity from "./dexterity/Dexterity.tsx";
import Coordination from "./coordination/Coordination.tsx";
import Insight from "./insight/Insight.tsx";
import WillPower from "./willPower/WillPower.tsx";
import Strength from "./strength/Strength.tsx";
import Intelligence from "./intelligence/Intelligence.tsx";
import { Masonry } from "@mui/lab";
import { Box } from "@mui/system";

export default function Attributes() {
  const isBelow730 = useMediaQuery("(max-width:730px)");
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атрибуты и Навыки
      </Typography>
      <Masonry columns={isBelow730 ? 1 : { sm: 2, md: 2, lg: 3 }} spacing={2}>
        <Dexterity />
        <Coordination />
        <Insight />
        <WillPower />
        <Strength />
        <Intelligence />
      </Masonry>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
            xl: "repeat(3, 1fr)",
          },
        }}
      >
        <Dexterity />
        <Coordination />
        <Insight />
        <WillPower />
        <Strength />
        <Intelligence />
      </Box>
    </>
  );
}
