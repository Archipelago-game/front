import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const fontSize = {
  xs: "2em",
  phablet: "2.1em",
  sm: "2.4em",
  tables: "3em",
};

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
          height: fontSize,
          width: "auto",
        }}
      />
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontSize: fontSize,
        }}
      >
        рхипелаг
      </Typography>
    </Box>
  );
}
