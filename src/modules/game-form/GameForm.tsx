import { Box, Grid, TextField } from "@mui/material";
import CustomLabel from "./components/CustomLabel.tsx";

export default function GameForm() {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Box>Атака</Box>
      </Grid>
      <Grid size={9}>
        <CustomLabel
          label={{
            text: "Имя персонажа",
          }}
        >
          <TextField fullWidth variant="outlined" size="small" />
        </CustomLabel>
      </Grid>
    </Grid>
  );
}
