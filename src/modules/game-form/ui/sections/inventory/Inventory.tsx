import Equipment from "./Equipment.tsx";
import { Grid } from "@mui/material";
import Wallet from "./Wallet.tsx";

import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";

export default function Inventory() {
  return (
    <BaseSectionCard title="Инвентарь">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Wallet />
        </Grid>
        <Grid size={12}>
          <Equipment />
        </Grid>
      </Grid>
    </BaseSectionCard>
  );
}
