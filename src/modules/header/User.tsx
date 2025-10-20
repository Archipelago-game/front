import { Box, Button, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import Backendless from "../../api/backendless-config.ts";

import { theme } from "../../common/styles/theme/custom-theme.ts";

import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";
import { useEffect, useState } from "react";
import { useSnackbarContext } from "../../app/providers/snackbar-provider/use-snackbar-context.hook.ts";
import AuthorizationButton from "../../common/components/auth-button/AuthorizationButton.tsx";

const AUTH_PAGE_PATH = "/auth-done";

export default function User() {
  const [isAutPage, setIsAutPage] = useState(false);
  const location = useLocation();
  const { userInfo, removeUserInfo } = useAuthContext();
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
        <IconButton>
          {userInfo?.avatar ? (
            <Box
              component="img"
              src={userInfo.avatar}
              alt="User Avatar"
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <AccountCircle
              sx={{
                fontSize: "40px",
                color: userInfo
                  ? theme.palette.label.background.secondary
                  : "grey",
              }}
            />
          )}
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

            {!userInfo && <AuthorizationButton />}
          </Box>
        )}
      </Box>
    </Box>
  );
}
