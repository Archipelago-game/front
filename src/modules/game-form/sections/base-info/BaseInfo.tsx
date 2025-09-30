import { Box, Grid, TextField } from "@mui/material";
import CustomLabel from "../../components/CustomLabel.tsx";

export default function BaseInfo() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <CustomLabel
          label={{
            text: "Имя персонажа",
          }}
        >
          <TextField fullWidth variant="outlined" size="small" />
        </CustomLabel>
      </Grid>
      <Grid size={8}>
        <CustomLabel>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "0.2em",
            }}
          >
            <CustomLabel
              label={{
                color: "secondary",
                text: "Возраст",
              }}
              orientation="row"
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="number"
              />
            </CustomLabel>
            <CustomLabel
              label={{
                color: "secondary",
                text: "Родина",
              }}
              orientation="row"
            >
              <TextField fullWidth variant="outlined" size="small" />
            </CustomLabel>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomLabel
                label={{
                  color: "secondary",
                  text: "Языки",
                }}
                orientation="row"
              >
                <TextField fullWidth variant="outlined" size="small" />
              </CustomLabel>
            </Box>
          </Box>
        </CustomLabel>
      </Grid>
    </Grid>
  );
}
