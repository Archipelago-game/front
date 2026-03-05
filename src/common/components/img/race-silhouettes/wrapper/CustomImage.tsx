import { Box, type SxProps } from "@mui/material";

interface Props {
  src: string;
  alt?: string;
  sx?: SxProps;
}

export default function CustomImage({ src, alt = "изображение", sx }: Props) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
        ...sx,
      }}
    />
  );
}
