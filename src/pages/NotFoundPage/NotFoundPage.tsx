import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        paddingBlock: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "fit-content(100%)",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          justifyContent: "center",

          height: "100%",

          minWidth: 328,
          minHeight: 0,
          maxHeight: "100%",

          gap: "clamp(8px, 2vh, 24px)",
          textAlign: "center",

          overflow: "hidden",
        }}
      >
        <Box
          component="h1"
          sx={{
            m: 0,
            fontSize: "clamp(40px, 8vh, 72px)",
            lineHeight: 1,
          }}
        >
          404
        </Box>

        <Box
          component="img"
          src="img/not-found-page/not-found-v1.png"
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            objectFit: "fill",
            borderRadius: 1,
          }}
        />

        <Button
          component={RouterLink}
          to="/"
          size="large"
          variant="outlined"
          color="primary"
          sx={{
            fontSize: "clamp(14px, 2vh, 18px)",
            px: "clamp(12px, 3vw, 24px)",
            py: "clamp(6px, 1.5vh, 12px)",
          }}
        >
          Вернуться на главную страницу
        </Button>
      </Box>
    </Box>
  );
}
