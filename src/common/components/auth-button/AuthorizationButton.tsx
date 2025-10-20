import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function AuthorizationButton() {
  return (
    <Button variant="contained" component={RouterLink} to={"/auth-done"}>
      Авторизоваться
    </Button>
  );
}
