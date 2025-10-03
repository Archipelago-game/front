import { Box, Typography } from "@mui/material";
import DexterityTitle from "./DexterityTitle.tsx";

export default function Dexterity() {
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
      <Box>
        <div>
          <DexterityTitle />
        </div>
      </Box>
    </>
  );
}
