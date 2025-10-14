import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedSvg from "../screen-saver/ScreenSaver.tsx";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button>Персонажи</Button>
      <Button onClick={() => navigate("/game-form")}>Форма персонажа</Button>
      <AnimatedSvg />
    </Box>
  );
}
