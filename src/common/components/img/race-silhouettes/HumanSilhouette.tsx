import { Box, type SxProps } from "@mui/material";

interface Props {
  wrapperSx?: SxProps;
  imgSx?: SxProps;
}

export default function HumanSilhouette({ wrapperSx, imgSx }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "3 / 5",
        position: "relative",
        ...wrapperSx,
      }}
    >
      <Box
        component="img"
        src="/img/hero-card/siluet-hero-man.png"
        alt="Силуэт героя"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          ...imgSx,
        }}
      />
    </Box>
  );
}
