import { Box } from "@mui/material";
import { useEffect } from "react";

export default function NotFoundPage() {
  useEffect(() => {
    console.log("🔥 NotFoundPage МОНТИРУЕТСЯ для пути:", location.pathname);
    console.log("🔍 Полный location:", location);

    return () => {
      console.log(
        "💀 NotFoundPage РАЗМОНТИРУЕТСЯ для пути:",
        location.pathname,
      );
    };
  }, [location]);

  console.log("📝 NotFoundPage РЕНДЕРИТСЯ для пути:", location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: "100%",
      }}
    >
      <Box component="h1">404</Box>
    </Box>
  );
}
