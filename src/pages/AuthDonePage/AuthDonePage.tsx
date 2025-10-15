import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Backendless from "../../api/backendless-config";
import {
  saveUserToken,
  getUserToken,
  hasUserToken,
  saveUserInfo,
  removeUserInfo,
} from "../../api/token-utils";
import { Button, Box, Typography, Alert } from "@mui/material";
import type { BackendlessUser } from "../../api/backendless-types";

export default function AuthDonePage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<BackendlessUser | null>(null);

  // URL for redirect to Google OAuth
  const redirectUrl =
    "https://api.backendless.com/921EA541-5840-4551-9113-0FD60D6B3802/E21FF1D5-DAE8-4ACE-B1DB-E86A67A23FDC/users/oauth/googleplus/authorize";

  // Check if token already exists
  useEffect(() => {
    if (hasUserToken()) {
      // If token exists, get user information
      loadCurrentUser();
    }
  }, []);

  // Handle redirect after authorization
  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(`Ошибка авторизации: ${errorParam}`);
      return;
    }

    if (code) {
      // If authorization code exists, get token
      handleAuthCallback();
    }
  }, [searchParams]);

  const loadCurrentUser = async () => {
    try {
      setIsLoading(true);
      const user =
        (await Backendless.UserService.getCurrentUser()) as BackendlessUser;
      if (user) {
        const userToken = user["user-token"] || user.userToken;
        if (userToken) {
          saveUserToken(userToken);
        }
        saveUserInfo(user);
        setUserInfo(user);
      }
    } catch (err) {
      console.error("Error getting user:", err);
      setError("Ошибка получения информации о пользователе");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthCallback = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // After redirect, Backendless automatically sets the user
      // Check if current user exists
      const user = Backendless.UserService.getCurrentUser() as BackendlessUser;

      if (user) {
        // Get user token from user object
        const userToken = user["user-token"] || user.userToken;

        // Save token and user information
        if (userToken) {
          saveUserToken(userToken);
        }
        saveUserInfo(user);
        setUserInfo(user);

        console.log("Token received:", userToken);
        console.log("User:", user);
      } else {
        // If user not found, try to get it asynchronously
        try {
          const currUser =
            (await Backendless.UserService.getCurrentUser()) as BackendlessUser;
          if (currUser) {
            const userToken = currUser["user-token"] || currUser.userToken;
            if (userToken) {
              saveUserToken(userToken);
            }
            saveUserInfo(currUser);
            setUserInfo(currUser);
          }
        } catch (asyncErr) {
          console.error("Error getting user:", asyncErr);
          setError("Пользователь не найден после авторизации");
        }
      }
    } catch (err) {
      console.error("Error getting token:", err);
      setError("Ошибка получения токена авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    window.location.href = redirectUrl;
  };

  const handleLogout = () => {
    Backendless.UserService.logout();
    localStorage.removeItem("backendless_user_token");
    removeUserInfo();
    setUserInfo(null);
    setError(null);
  };

  return (
    <CustomFormContextProvider>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Авторизация
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isLoading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Загрузка...
          </Alert>
        )}

        {userInfo ? (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              Авторизация успешна!
            </Alert>
            <Typography variant="h6" gutterBottom>
              Добро пожаловать,{" "}
              {userInfo.email || userInfo.name || "Пользователь"}!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Токен: {getUserToken()?.substring(0, 20)}...
            </Typography>
            <Button variant="outlined" onClick={handleLogout}>
              Выйти
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Для доступа к приложению необходимо авторизоваться через Google
            </Typography>
            <Button
              variant="contained"
              onClick={handleRedirect}
              disabled={isLoading}
            >
              Войти через Google
            </Button>
          </Box>
        )}
      </Box>
    </CustomFormContextProvider>
  );
}
