import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        width: "100%",
        height: "100%",
      }}
    >
      <Box component="h1">404</Box>

      <Box component="div">
        <Link to="/">Вернуться на главную</Link>
      </Box>
    </Box>
  );
}
