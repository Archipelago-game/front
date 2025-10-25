import { Button } from "@mui/material";
import { useState } from "react";
import { FirebaseAuthService } from "../../../api/firebase-auth-service";
import { useSnackbarContext } from "../../../app/providers/snackbar-provider/use-snackbar-context.hook";

export default function AuthorizationButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useSnackbarContext();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await FirebaseAuthService.signInWithGoogle();
      showMessage({
        message: "Авторизация прошла успешно",
        severity: "success",
      });
    } catch (error: any) {
      console.error("Auth error:", error);
      showMessage({
        message: error.message || "Ошибка авторизации",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      {isLoading ? "Авторизация..." : "Войти через Google"}
    </Button>
  );
}
