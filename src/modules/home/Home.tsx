import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AnimatedSvg from "../screen-saver/ScreenSaver.tsx";
import { useState } from "react";
import Prelude from "./Prelude";
import AuthorizationButton from "../../common/components/auth-button/AuthorizationButton.tsx";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

export default function Home() {
  const [isShowScreenSaver, setShowScreenSaver] = useState(true);
  const { userInfo } = useAuthContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {!userInfo && (
        <Box textAlign="center">
          <AuthorizationButton />
        </Box>
      )}
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
