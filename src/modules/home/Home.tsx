import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedSvg from "../screen-saver/ScreenSaver.tsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [isShowScreenSaver, setShowScreenSaver] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowScreenSaver(true);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button>Персонажи</Button>
      <Button onClick={() => navigate("/game-form")}>Форма персонажа</Button>
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
