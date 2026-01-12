import { Box, Typography } from "@mui/material";

interface Props {
  value: string | number;
  isReduced?: boolean;
}
export default function CalculatedValue({ value, isReduced = false }: Props) {
  return (
    <Box
      sx={{
        padding: "2px",
      }}
    >
      <Typography
        variant="body1"
        color={isReduced ? "error" : "textSecondary"}
        sx={{ fontWeight: "600", fontSize: "1.3em" }}
      >
        {value}
      </Typography>
    </Box>
  );
}
