import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Prelude from "./Prelude";

import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

export default function Home() {
  const { userInfo } = useAuthContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Button
        component={RouterLink}
        to={"/character-rules"}
        size="large"
        variant="outlined"
        color="primary"
      >
        Правила создания персонажа
      </Button>

      {userInfo && (
        <Button
          component={RouterLink}
          to={"/characters"}
          size="large"
          variant="outlined"
          color="primary"
        >
          Персонажи
        </Button>
      )}

      <Prelude />
    </Box>
  );
}
