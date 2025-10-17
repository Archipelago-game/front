import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Backendless from "../../api/backendless-config.ts";

import { theme } from "../../common/styles/theme/custom-theme.ts";

import { useUserContext } from "../../app/providers/user-provider/use-user-context.hook.ts";

// todo сообщения о действиях
// todo UserContext
export default function User() {
  const navigate = useNavigate();
  const { userInfo, removeUserInfo } = useUserContext();

  const handleLogout = () => {
    Backendless.UserService.logout();
    removeUserInfo();
  };

  return (
    <Box>
      <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
        <Alert onClose={() => {}} severity="success">
          Сообщение отправлено!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          "&:hover .dropdown": {
            zIndex: 10,
            opacity: 1,
            left: 0,
          },
        }}
      >
        <IconButton onClick={() => navigate("/auth-done")}>
          <AccountCircle
            sx={{
              fontSize: "40px",
              color: userInfo
                ? theme.palette.label.background.secondary
                : "grey",
            }}
          />
        </IconButton>

        <Box
          className="dropdown"
          sx={{
            display: "block",
            position: "absolute",
            top: "100%",
            left: -999,
            opacity: 0,
            zIndex: -10,
            p: 1,
            transition: "opacity 1s ease",
          }}
        >
          {userInfo && (
            <Button variant="contained" onClick={handleLogout}>
              Выйти
            </Button>
          )}

          {!userInfo && (
            <Button component="a" href="/auth-done" variant="contained">
              Авторизоваться
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
