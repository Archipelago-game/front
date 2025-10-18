import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedSvg from "../screen-saver/ScreenSaver.tsx";
import { useState } from "react";

export default function Home() {
  const [isShowScreenSaver, setShowScreenSaver] = useState(true);
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
      <Button onClick={() => navigate("/world-description")}>
        Описание мира
      </Button>
      {isShowScreenSaver && (
        <AnimatedSvg
          onFinish={() => {
            setTimeout(() => {
              setShowScreenSaver(false);
            }, 500);
          }}
        />
      )}
    </Box>
  );
}
