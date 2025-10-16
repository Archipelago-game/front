import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
      }}
    >
      <Box
        component="img"
        src="/img/favicon-concept_cutted.svg"
        sx={{
          height: "50px",
          width: "auto",
        }}
      />
      <Typography variant="h3" align="center">
        рхипелаг
      </Typography>
    </Box>
  );
}
