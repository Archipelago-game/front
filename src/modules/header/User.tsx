import { Box, Button, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import Backendless from "../../api/backendless-config.ts";

import { theme } from "../../common/styles/theme/custom-theme.ts";

import { useUserContext } from "../../app/providers/user-provider/use-user-context.hook.ts";
import { useEffect, useState } from "react";
import { useSnackbarContext } from "../../app/providers/snackbar-provider/use-snackbar-context.hook.ts";

const AUTH_PAGE_PATH = "/auth-done";

// todo сообщения о действиях
// todo UserContext
export default function User() {
  const [isAutPage, setIsAutPage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, removeUserInfo } = useUserContext();
  const { showMessage } = useSnackbarContext();

  const handleLogout = async () => {
    await Backendless.UserService.logout();
    removeUserInfo();
    showMessage({
      message: "Успешно вышли",
    });
  };

  useEffect(() => {
    if (location.pathname === AUTH_PAGE_PATH) {
      setIsAutPage(true);
    } else {
      setIsAutPage(false);
    }
  }, [location.pathname]);

  return (
    <Box>
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

        {!isAutPage && (
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
        )}
      </Box>
    </Box>
  );
}
