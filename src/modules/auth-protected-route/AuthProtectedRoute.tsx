import { Outlet } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import AuthorizationButton from "../../common/components/auth-button/AuthorizationButton.tsx";

export default function AuthProtectedRoute() {
  const { isAuthorized } = useAuthContext();

  if (!isAuthorized) {
    return (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            minWidth: "80%",
            minHeight: "5em",
            padding: "1em",
          }}
        >
          <Typography variant="h5" mb={2}>
            Назови себя, Воин!
          </Typography>
          <Box textAlign="center">
            <AuthorizationButton />
          </Box>
        </Card>
      </Box>
    );
  }

  return <Outlet />;
}
