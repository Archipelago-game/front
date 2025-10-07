import Equipment from "./Equipment.tsx";
import { Grid, Typography } from "@mui/material";
import Wallet from "./Wallet.tsx";

export default function Inventory() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Инвентарь
      </Typography>
      <Grid container spacing={2}>
        <Grid size={9}>
          <Equipment />
        </Grid>
        <Grid size={3}>
          <Wallet />
        </Grid>
      </Grid>
    </>
  );
}
