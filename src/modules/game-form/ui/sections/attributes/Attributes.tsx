import { Box, Typography } from "@mui/material";
import Dexterity from "./dexterity/Dexterity.tsx";
import Coordination from "./coordination/Coordination.tsx";
import Insight from "./insight/Insight.tsx";
import WillPower from "./willPower/WillPower.tsx";
import Strength from "./strength/Strength.tsx";
import Intelligence from "./intelligence/Intelligence.tsx";

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

      <Box display="flex" gap={2}>
        {/*<Dexterity />*/}
        {/*<Coordination />*/}
        {/*<Insight />*/}
        {/*<WillPower />*/}
        {/*<Strength />*/}
        <Intelligence />
      </Box>
    </>
  );
}
