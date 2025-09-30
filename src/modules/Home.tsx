import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button>Персонажи</Button>
      <Button>Форма персонажа</Button>
    </Box>
  );
}
