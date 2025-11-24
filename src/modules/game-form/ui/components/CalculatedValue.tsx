import { Box, Typography } from "@mui/material";

interface Props {
  value: string | number;
}
export default function CalculatedValue({ value }: Props) {
  return (
    <Box
      sx={{
        padding: "2px",
      }}
    >
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontWeight: "600", fontSize: "1.3em" }}
      >
        {value}
      </Typography>
    </Box>
  );
}
