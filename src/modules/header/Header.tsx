import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Header() {
  return (
    <Box
      sx={{
        paddingBlock: 2,
      }}
    >
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
    </Box>
  );
}
