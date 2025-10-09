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
        <Grid size={{ xs: 12, md: 9 }} order={{ xs: 2, md: 1 }}>
          <Equipment />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} order={{ xs: 1, md: 2 }}>
          <Wallet />
        </Grid>
      </Grid>
    </>
  );
}
