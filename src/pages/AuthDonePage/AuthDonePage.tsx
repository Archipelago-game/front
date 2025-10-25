import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

export default function AuthDonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, isLoading } = useAuthContext();

  // Redirect if already authorized
  useEffect(() => {
    if (userInfo && !isLoading) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [userInfo, isLoading, navigate, location.state]);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Проверка авторизации...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Авторизация
      </Typography>
      <Typography variant="body1" gutterBottom>
        Для продолжения необходимо авторизоваться.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Авторизация теперь происходит через всплывающее окно.
        Если окно не открылось, проверьте настройки блокировщика всплывающих окон.
      </Typography>
    </Box>
  );
}