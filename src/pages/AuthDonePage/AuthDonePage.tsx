import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Backendless, { oauthApi } from "../../api/backendless-config";
import {
  saveUserToken,
  getUserToken,
  hasUserToken,
  saveUserInfo,
  removeUserInfo,
  saveUserId,
  removeUserId,
} from "../../api/token-utils";
import { Button, Box, Typography, Alert } from "@mui/material";
import type { BackendlessUser } from "../../api/backendless-types";

export default function AuthDonePage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<BackendlessUser | null>(null);

  // Redirect URL after OAuth (current page)
  const redirectAfterLoginUrl = `${window.location.origin}/auth-done`;

  // Check if token already exists
  useEffect(() => {
    if (hasUserToken()) {
      // If token exists, get user information
      loadCurrentUser();
    }
  }, []);

  // Handle redirect after authorization
  useEffect(() => {
    const userToken = searchParams.get("userToken");
    const userId = searchParams.get("userId");

    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(`Ошибка авторизации: ${errorParam}`);
      return;
    }

    if (userToken && userId) {
      // If authorization code exists, set user
      console.log(userToken);
      handleAuthCallback(userToken, userId);
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

  const handleAuthCallback = async (userToken: string, userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Установить токен в Backendless
      Backendless.UserService.setCurrentUser(userToken);

      // Сохранить токен (localStorage/cookies/context)
      saveUserToken(userToken);
      saveUserId(userId);
      const user = (await Backendless.Data.of("Users").findById(
        userId,
      )) as BackendlessUser;
      // Check if current user exists

      if (user) {
        saveUserInfo(user);
        setUserInfo(user);
        console.log(user);
        // note очищает адресную строку от query параметров
        // window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (err) {
      console.error("Error getting token:", err);
      setError("Ошибка получения userInfo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Getting OAuth URL for:", redirectAfterLoginUrl);

      // Get OAuth URL from Backendless API
      const oauthUrl = await oauthApi.getGoogleOAuthUrl(redirectAfterLoginUrl);

      console.log("Received OAuth URL:", oauthUrl);

      // Redirect to OAuth URL
      window.location.href = oauthUrl;
    } catch (err) {
      console.error("Error getting OAuth URL:", err);
      setError("Ошибка получения URL авторизации");
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Backendless.UserService.logout();
    localStorage.removeItem("backendless_user_token");
    removeUserInfo();
    removeUserId();
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
