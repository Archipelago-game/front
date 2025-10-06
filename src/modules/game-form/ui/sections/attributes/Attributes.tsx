import { Typography } from "@mui/material";
import Dexterity from "./dexterity/Dexterity.tsx";
import Coordination from "./coordination/Coordination.tsx";
import Insight from "./insight/Insight.tsx";
import WillPower from "./willPower/WillPower.tsx";
import Strength from "./strength/Strength.tsx";
import Intelligence from "./intelligence/Intelligence.tsx";
import { Masonry } from "@mui/lab";

export default function Attributes() {
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
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        <Dexterity />
        <Coordination />
        <Insight />
        <WillPower />
        <Strength />
        <Intelligence />
      </Masonry>
    </>
  );
}
