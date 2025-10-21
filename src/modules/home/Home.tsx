import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Prelude from "./Prelude";
import AuthorizationButton from "../../common/components/auth-button/AuthorizationButton.tsx";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AuthorizationButton />
      <Button component={RouterLink} to={"/characters"}>
        Персонажи
      </Button>

      <Prelude />
    </Box>
  );
}
