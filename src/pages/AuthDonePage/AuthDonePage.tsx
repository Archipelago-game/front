import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Backendless, { oauthApi } from "../../api/backendless-config";
import { saveUserId } from "../../api/token-utils";
import { Button, Box, Typography, Alert } from "@mui/material";
import type { BackendlessUser } from "../../api/backendless-types";
import { useUserContext } from "../../app/providers/user-provider/use-user-context.hook.ts";

export default function AuthDonePage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useUserContext();

  // Redirect URL after OAuth (current page)
  const redirectAfterLoginUrl = `${window.location.origin}/auth-done`;

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

  const handleAuthCallback = async (userToken: string, userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Установить токен в Backendless
      Backendless.UserService.setCurrentUser(userToken);

      // Сохранить токен (localStorage/cookies/context)
      saveUserId(userId);
      const user = (await Backendless.Data.of("Users").findById(
        userId,
      )) as BackendlessUser;
      // Check if current user exists

      if (user) {
        setUserInfo(user);
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

  return (
    <CustomFormContextProvider>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          {userInfo ? `Добро пожаловать, ${userInfo.name}` : "Кто ты, воин?"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!userInfo && (
          <Box textAlign="center">
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
