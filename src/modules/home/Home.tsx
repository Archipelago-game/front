import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AnimatedSvg from "../screen-saver/ScreenSaver.tsx";
import { useState } from "react";
import Prelude from "./Prelude";

export default function Home() {
  const [isShowScreenSaver, setShowScreenSaver] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button component={RouterLink} to={"/characters"}>
        Авторизоваться
      </Button>
      <Button component={RouterLink} to={"/characters"}>
        Персонажи
      </Button>

      <Prelude />

      {isShowScreenSaver && (
        <AnimatedSvg
          onFinish={() => {
            setShowScreenSaver(false);
          }}
        />
      )}
    </Box>
  );
}
