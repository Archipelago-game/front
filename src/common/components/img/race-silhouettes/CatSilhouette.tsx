import { Box } from "@mui/material";

export default function CatSilhouette() {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "3 / 5",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src="/img/hero-card/cat-siluet-man.png"
        alt="Силуэт героя"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
