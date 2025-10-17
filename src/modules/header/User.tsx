import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Backendless from "../../api/backendless-config.ts";
import {
  hasUserToken,
  removeUserInfo,
  removeUserId,
  removeUserToken,
  getUserId,
} from "../../api/token-utils";
import { theme } from "../../common/styles/theme/custom-theme.ts";
import type { BackendlessUser } from "../../api/backendless-types.ts";

// todo сообщения о действиях
// todo userContext
export default function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasUserToken()) {
      setIsLoggedIn(true);
      getUser();
    }
  }, []);

  const getUser = async () => {
    const userId = getUserId();
    if (!userId) {
      return;
    }

    const user = (await Backendless.Data.of("Users").findById(
      userId,
    )) as BackendlessUser;
    console.log(user);
  };

  const handleLogout = () => {
    Backendless.UserService.logout();
    removeUserToken();
    removeUserInfo();
    removeUserId();
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
              color: isLoggedIn
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
          {isLoggedIn && (
            <Button variant="contained" onClick={handleLogout}>
              Выйти
            </Button>
          )}

          {!isLoggedIn && (
            <Button component="a" href="/auth-done" variant="contained">
              Авторизоваться
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
