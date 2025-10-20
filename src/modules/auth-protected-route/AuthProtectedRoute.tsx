import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import AuthorizationButton from "../../common/components/auth-button/AuthorizationButton.tsx";

export default function AuthProtectedRoute() {
  const { isAuthorized } = useAuthContext();

  if (!isAuthorized) {
    return (
      <Box
        sx={{
          border: "1px solid gray",
        }}
      >
        <Box>
          <Typography>
            Чтобы зайти в этот раздел необходимо авторизоваться
          </Typography>
          <AuthorizationButton />
        </Box>
      </Box>
    );
  }

  return <Outlet />;
}
