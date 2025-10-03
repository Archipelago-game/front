import { Box, Typography } from "@mui/material";
import Dexterity from "./dexterity/Dexterity.tsx";

export default function Attributes() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атрибуты и Навыки
      </Typography>

      <Box display="flex" gap={2}>
        <Dexterity />
      </Box>
    </>
  );
}
