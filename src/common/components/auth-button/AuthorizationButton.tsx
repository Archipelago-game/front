import { Box, Button, type ButtonProps } from "@mui/material";
import { useState } from "react";
import { FirebaseAuthService } from "../../../api/firebase-auth-service";
import { useSnackbarContext } from "../../../app/providers/snackbar-provider/use-snackbar-context.hook";

interface Props {
  variant?: ButtonProps["variant"];
}

export default function AuthorizationButton({ variant = "contained" }: Props) {
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
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
    <Button variant={variant} onClick={handleGoogleSignIn} disabled={isLoading}>
      <Box component={"span"} sx={{ whiteSpace: "nowrap" }}>
        {isLoading ? "Авторизация..." : "Войти"}
      </Box>
    </Button>
  );
}
