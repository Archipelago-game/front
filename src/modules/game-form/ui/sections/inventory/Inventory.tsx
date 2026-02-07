import Equipment from "./Equipment.tsx";
import { Box, Grid } from "@mui/material";
import Wallet from "./Wallet.tsx";
import SectionTitle from "../../components/section/SectionTitle.tsx";

export default function Inventory() {
  return (
    <Box>
      <SectionTitle title="Инвентарь" />

      <Grid container spacing={2}>
        <Grid size={12}>
          <Wallet />
        </Grid>
        <Grid size={12}>
          <Equipment />
        </Grid>
      </Grid>
    </Box>
  );
}
